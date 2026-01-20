import fs from 'node:fs/promises'
import path from 'node:path'
import JSZip from 'jszip'

function log(msg) {
  console.log(msg)
}

function warn(msg) {
  console.warn(`⚠️  ${msg}`)
}

function fail(msg) {
  console.error(`❌ ${msg}`)
  process.exit(1)
}

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function rmIfExists(p) {
  if (!(await exists(p))) return
  await fs.rm(p, { recursive: true, force: true })
}

async function readUtf8(p) {
  return await fs.readFile(p, 'utf8')
}

async function writeUtf8(p, content) {
  await ensureDir(path.dirname(p))
  await fs.writeFile(p, content, 'utf8')
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest))
  await fs.copyFile(src, dest)
}

async function copyDir(srcDir, destDir) {
  if (!(await exists(srcDir))) return
  await ensureDir(destDir)
  const entries = await fs.readdir(srcDir, { withFileTypes: true })
  for (const e of entries) {
    const src = path.join(srcDir, e.name)
    const dest = path.join(destDir, e.name)
    if (e.isDirectory()) {
      await copyDir(src, dest)
    } else if (e.isFile()) {
      await copyFile(src, dest)
    }
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+&\s+/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeEol(s) {
  return s.replace(/\r\n/g, '\n')
}

function parseRoadmap(md) {
  const normalized = normalizeEol(md)
  const matches = [...normalized.matchAll(/### (\d+)\.\s*(.+)\n+([\s\S]*?)(?=\n### |\n## |\n#[^#]|$)/g)]
  return matches
    .map((m) => {
      const order = Number.parseInt(m[1], 10)
      const title = m[2].trim()
      const description = m[3].trim()
      return { order, title, description, id: slugify(title) }
    })
    .sort((a, b) => a.order - b.order)
}

function stripFirstH1(md) {
  const normalized = normalizeEol(md)
  const lines = normalized.split('\n')
  if (lines.length > 0 && lines[0].startsWith('# ')) return lines.slice(1).join('\n').trim()
  return normalized.trim()
}

function inferProductName(md) {
  const normalized = normalizeEol(md)
  const m = normalized.match(/^#\s+(.+)$/m)
  return (m?.[1] ?? 'Product').trim()
}

function toPosix(p) {
  return p.replace(/\\/g, '/')
}

function rewriteAtAliasImports({ sourceCode, fromFileAbs, toRootAbs }) {
  // Replace `@/foo/bar` with a relative import to `<toRootAbs>/src/foo/bar`
  // (We keep this intentionally narrow: only the path portion changes.)
  return sourceCode.replace(/from\s+["']@\/([^"']+)["']/g, (_match, atPath) => {
    const targetAbs = path.join(toRootAbs, 'src', atPath)
    const rel = path.relative(path.dirname(fromFileAbs), targetAbs)
    const relPosix = toPosix(rel).replace(/^\.\.\//, '../') // keep normalized
    const relSpecifier = relPosix.startsWith('.') ? relPosix : `./${relPosix}`
    return `from "${relSpecifier}"`
  })
}

function cssThemeFromDesignSystem({ colors, typography }) {
  const semantic = colors?.semantic ?? {}
  const layer = semantic.layer ?? {}
  const onLayer = semantic.onLayer ?? {}
  const border = semantic.border ?? {}
  const overlay = semantic.overlay ?? {}
  const link = semantic.link ?? {}
  const button = semantic.button ?? {}

  const mainFallback = typography?.typefaces?.main?.fallback ?? 'system-ui, sans-serif'
  const codeFallback = typography?.typefaces?.code?.fallback ?? 'ui-monospace, monospace'

  // Tailwind v4 design tokens via @theme (this is what generates classes like bg-layer-level-1)
  return normalizeEol(`@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --font-display: ${JSON.stringify(mainFallback)};
  --font-body: ${JSON.stringify(mainFallback)};
  --font-sans: ${JSON.stringify(mainFallback)};
  --font-mono: ${JSON.stringify(codeFallback)};

  /* Semantic Colors from product/design-system/colors.json */
  --color-layer-level-0: ${layer['level-0'] ?? '#111114'};
  --color-layer-level-1: ${layer['level-1'] ?? '#24242b'};
  --color-layer-level-2: ${layer['level-2'] ?? '#37373e'};
  --color-layer-level-3: ${layer['level-3'] ?? '#505057'};
  --color-layer-hover: ${layer.hover ?? 'rgba(0,0,0,0.05)'};
  --color-layer-active: ${layer.active ?? 'rgba(0,0,0,0.1)'};
  --color-layer-info: ${layer.info ?? '#d5efff'};
  --color-layer-warning: ${layer.warning ?? '#fcf6c5'};
  --color-layer-danger: ${layer.danger ?? '#fee2e2'};
  --color-layer-success: ${layer.success ?? '#dcfce4'};
  --color-layer-recent: ${layer.recent ?? '#f0e7ff'};
  --color-layer-main-navigation: ${layer['main-navigation'] ?? '#111114'};
  --color-layer-highlight: ${layer.highlight ?? '#f6d84e'};
  --color-layer-transparent: ${layer.transparent ?? 'rgba(255,255,255,0.01)'};

  --color-onLayer-primary: ${onLayer.primary ?? '#f9f9fa'};
  --color-onLayer-secondary: ${onLayer.secondary ?? '#b5b5b7'};
  --color-onLayer-tertiary: ${onLayer.tertiary ?? '#6d6d71'};
  --color-onLayer-inverse: ${onLayer.inverse ?? '#f9f9fa'};
  --color-onLayer-interactive: ${onLayer.interactive ?? '#148134'};
  --color-onLayer-warning: ${onLayer.warning ?? '#e1ab11'};
  --color-onLayer-danger: ${onLayer.danger ?? '#da2828'};
  --color-onLayer-success: ${onLayer.success ?? '#15a43e'};
  --color-onLayer-recent: ${onLayer.recent ?? '#691cd4'};

  --color-border-primary: ${border.primary ?? 'rgba(0,0,0,0.2)'};
  --color-border-secondary: ${border.secondary ?? 'rgba(0,0,0,0.1)'};
  --color-border-inverse: ${border.inverse ?? 'rgba(255,255,255,0.2)'};
  --color-border-info: ${border.info ?? '#56a0ff'};
  --color-border-info-emphasis: ${border['info-emphasis'] ?? '#003beb'};
  --color-border-warning: ${border.warning ?? '#f6d84e'};
  --color-border-warning-emphasis: ${border['warning-emphasis'] ?? '#f1c21b'};
  --color-border-danger: ${border.danger ?? '#f67373'};
  --color-border-danger-emphasis: ${border['danger-emphasis'] ?? '#da2828'};
  --color-border-success: ${border.success ?? '#85f0a3'};
  --color-border-success-emphasis: ${border['success-emphasis'] ?? '#20c54f'};
  --color-border-recent: ${border.recent ?? '#b180ff'};
  --color-border-recent-emphasis: ${border['recent-emphasis'] ?? '#7c2df0'};
  --color-border-focus-button: ${border['focus-button'] ?? '#24242b'};
  --color-border-focus-ring: ${border['focus-ring'] ?? '#9d9da0'};
  --color-border-focus-ring-inner: ${border['focus-ring-inner'] ?? 'rgba(255,255,255,0.95)'};
  --color-border-focus-ring-inverse: ${border['focus-ring-inverse'] ?? '#85c7ff'};
  --color-border-focus-ring-inner-inverse: ${border['focus-ring-inner-inverse'] ?? 'rgba(0,0,0,0.7)'};
  --color-border-focus-form: ${border['focus-form'] ?? '#9d9da0'};

  --color-overlay-default: ${overlay.default ?? 'rgba(0,0,0,0.7)'};
  --color-overlay-inverse: ${overlay.inverse ?? 'rgba(255,255,255,0.8)'};

  --color-link-primary: ${link.primary ?? '#15a43e'};
  --color-link-secondary: ${link.secondary ?? '#85c7ff'};
  --color-link-tertiary: ${link.tertiary ?? '#b5b5b7'};
  --color-link-inverse: ${link.inverse ?? '#f9f9fa'};
  --color-link-visited: ${link.visited ?? '#691cd4'};

  --color-button-primary: ${button.primary ?? '#15a43e'};
  --color-button-light: ${button.light ?? 'rgba(255,255,255,0.7)'};
  --color-button-ghost: ${button.ghost ?? 'rgba(255,255,255,0)'};
  --color-button-invisible: ${button.invisible ?? 'rgba(255,255,255,0)'};
  --color-button-inverse: ${button.inverse ?? 'rgba(255,255,255,0)'};
  --color-button-request: ${button.request ?? '#15a43e'};
  --color-button-danger: ${button.danger ?? '#da2828'};
  --color-button-purchase: ${button.purchase ?? '#f6d84e'};
  --color-button-ghost-hover: ${button['ghost-hover'] ?? 'rgba(0,0,0,0.05)'};
  --color-button-invisible-hover: ${button['invisible-hover'] ?? 'rgba(0,0,0,0.05)'};
  --color-button-inverse-hover: ${button['inverse-hover'] ?? 'rgba(255,255,255,0.05)'};
  --color-button-ghost-active: ${button['ghost-active'] ?? 'rgba(0,0,0,0.1)'};
  --color-button-invisible-active: ${button['invisible-active'] ?? 'rgba(0,0,0,0.1)'};
  --color-button-inverse-active: ${button['inverse-active'] ?? 'rgba(255,255,255,0.1)'};
  --color-button-invisible-applied: ${button['invisible-applied'] ?? 'rgba(208,226,255,0.5)'};

  /* Back-compat aliases used in some screens (bg-layer-1, etc.) */
  --color-layer-0: var(--color-layer-level-0);
  --color-layer-1: var(--color-layer-level-1);
  --color-layer-2: var(--color-layer-level-2);
  --color-layer-3: var(--color-layer-level-3);
}

/* Minimal base styles (reference bundle only) */
@layer base {
  body {
    font-family: var(--font-body);
  }
}
`)
}

async function addFolderToZip(zip, folderAbs, folderRel) {
  const entries = await fs.readdir(folderAbs, { withFileTypes: true })
  for (const e of entries) {
    const abs = path.join(folderAbs, e.name)
    const rel = toPosix(path.join(folderRel, e.name))
    if (e.isDirectory()) {
      await addFolderToZip(zip, abs, rel)
    } else if (e.isFile()) {
      const data = await fs.readFile(abs)
      zip.file(rel, data)
    }
  }
}

function usage() {
  log('Usage: npm run export-product-plan')
  log('')
  log('Outputs:')
  log('- ./product-plan/ (export folder)')
  log('- ./product-plan.zip (zip archive for download)')
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    usage()
    process.exit(0)
  }

  const repoRoot = process.cwd()
  const productDir = path.join(repoRoot, 'product')
  const sectionsDir = path.join(productDir, 'sections')
  const outDir = path.join(repoRoot, 'product-plan')
  const zipPath = path.join(repoRoot, 'product-plan.zip')

  const overviewPath = path.join(productDir, 'product-overview.md')
  const roadmapPath = path.join(productDir, 'product-roadmap.md')

  if (!(await exists(overviewPath))) fail('Missing required file: product/product-overview.md')
  if (!(await exists(roadmapPath))) fail('Missing required file: product/product-roadmap.md')
  if (!(await exists(sectionsDir))) fail('Missing required directory: product/sections/')

  const overviewMd = await readUtf8(overviewPath)
  const roadmapMd = await readUtf8(roadmapPath)
  const roadmap = parseRoadmap(roadmapMd)
  const productName = inferProductName(overviewMd)

  const sectionDirents = await fs.readdir(sectionsDir, { withFileTypes: true })
  const sectionIdsOnDisk = sectionDirents.filter((d) => d.isDirectory()).map((d) => d.name)

  const completed = []
  for (const id of sectionIdsOnDisk) {
    const spec = path.join(sectionsDir, id, 'spec.md')
    const data = path.join(sectionsDir, id, 'data.json')
    if ((await exists(spec)) && (await exists(data))) completed.push(id)
  }

  if (completed.length === 0) {
    fail('No exportable sections found. Need at least one section with spec.md + data.json in product/sections/<section-id>/.')
  }

  // Clean outputs
  await rmIfExists(outDir)
  await rmIfExists(zipPath)
  await ensureDir(outDir)

  // Core files
  const prdSrc = path.join(repoRoot, '.claude', 'prd_spec.md')
  if (await exists(prdSrc)) {
    await copyFile(prdSrc, path.join(outDir, 'prd_spec.md'))
  } else {
    warn('Missing recommended file: .claude/prd_spec.md (export will omit prd_spec.md)')
  }

  const implGuideSrc = path.join(productDir, 'implementation-guide.md')
  if (await exists(implGuideSrc)) {
    await copyFile(implGuideSrc, path.join(outDir, 'implementation-guide.md'))
  } else {
    warn('Missing recommended file: product/implementation-guide.md (export will omit implementation-guide.md)')
  }

  const designSystemSrc = path.join(productDir, 'design-system')
  if (await exists(designSystemSrc)) {
    await copyDir(designSystemSrc, path.join(outDir, 'design-system'))
  } else {
    warn('Missing recommended directory: product/design-system/ (export will omit design-system/)')
  }

  const dataModelSrc = path.join(productDir, 'data-model')
  if (await exists(dataModelSrc)) {
    await copyDir(dataModelSrc, path.join(outDir, 'data-model'))
  } else {
    warn('Missing recommended directory: product/data-model/ (export will omit data-model/)')
  }

  // Shell
  const shellOut = path.join(outDir, 'shell')
  await ensureDir(shellOut)

  const shellSpecSrc = path.join(productDir, 'shell', 'spec.md')
  if (await exists(shellSpecSrc)) {
    await copyFile(shellSpecSrc, path.join(shellOut, 'spec.md'))
  } else {
    warn('Missing recommended file: product/shell/spec.md (export will omit shell/spec.md)')
  }

  const shellComponentsSrc = path.join(repoRoot, 'src', 'shell', 'components')
  if (await exists(shellComponentsSrc)) {
    await copyDir(shellComponentsSrc, path.join(shellOut, 'components'))
  } else {
    warn('Missing recommended directory: src/shell/components/ (export will omit shell/components/)')
  }

  // Sections
  const sectionsOut = path.join(outDir, 'sections')
  await ensureDir(sectionsOut)

  const roadmapById = new Map(roadmap.map((s) => [s.id, s]))
  const orderedSectionIds = [
    ...roadmap.map((s) => s.id).filter((id) => sectionIdsOnDisk.includes(id)),
    ...sectionIdsOnDisk.filter((id) => !roadmapById.has(id)).sort(),
  ]

  for (const sectionId of orderedSectionIds) {
    const sectionSrc = path.join(sectionsDir, sectionId)
    const sectionDest = path.join(sectionsOut, sectionId)
    await ensureDir(sectionDest)

    const specSrc = path.join(sectionSrc, 'spec.md')
    const typesSrc = path.join(sectionSrc, 'types.ts')
    const dataSrc = path.join(sectionSrc, 'data.json')
    const interactionsSrc = path.join(sectionSrc, 'interactions.md')

    if (await exists(specSrc)) await copyFile(specSrc, path.join(sectionDest, 'spec.md'))
    if (await exists(typesSrc)) await copyFile(typesSrc, path.join(sectionDest, 'types.ts'))
    if (await exists(dataSrc)) await copyFile(dataSrc, path.join(sectionDest, 'sample-data.json'))
    if (await exists(interactionsSrc)) await copyFile(interactionsSrc, path.join(sectionDest, 'interactions.md'))

    await copyDir(path.join(sectionSrc, 'mocks'), path.join(sectionDest, 'mocks'))
    await copyDir(path.join(sectionSrc, 'replicated'), path.join(sectionDest, 'replicated'))
    await copyDir(path.join(sectionSrc, 'replicated-blueprints'), path.join(sectionDest, 'replicated-blueprints'))
  }

  // Product overview (generated)
  const plannedSectionsMd = roadmap
    .map((s) => `1. **${s.title}** — ${s.description}`)
    .join('\n')
    .trim()

  const productOverviewOut = `# ${productName} — Product Overview

${stripFirstH1(overviewMd)}

## Planned sections

${plannedSectionsMd || '_No roadmap sections found._'}
`
  await writeUtf8(path.join(outDir, 'product-overview.md'), productOverviewOut.trim() + '\n')

  // Prompts + instructions (RN target, plus optional web reference bundle)
  const promptsOut = path.join(outDir, 'prompts')
  const instructionsOut = path.join(outDir, 'instructions')
  const incrementalOut = path.join(instructionsOut, 'incremental')
  await ensureDir(promptsOut)
  await ensureDir(incrementalOut)

  const oneShotPrompt = `# One-shot implementation prompt

I need you to implement a complete **React Native application (Android + iOS)** from the design handoff package in \`product-plan/\`.

## Source of truth (read first)

1. **@product-plan/prd_spec.md** — Platform + non-negotiable tech stack
2. **@product-plan/product-overview.md** — Product context + section list
3. **@product-plan/instructions/one-shot-instructions.md** — All milestones

## Design assets to reference

- **@product-plan/design-system/** — Tokens (colors/typography/spacing/radius/elevations)
- **@product-plan/data-model/** — Data model vocabulary
- **@product-plan/shell/** — Shell spec + (web) shell components as reference
- **@product-plan/sections/** — Specs, types, sample data, interactions, mockups, and replicated-blueprints

## Important note about replicated TSX

Some sections include \`sections/*/replicated/*.tsx\` and \`reference-web/\`. These are **web React reference implementations**, provided only to help you match layout/spacing and interpret mockups. They are **not production React Native code**.

## Before you start

Ask clarifying questions about:
- Authentication / user model
- Local database choice + sync strategy (offline-first)
- Backend stack + hosting
- Permissions / roles
- Printing + payments integrations (Stripe Tap to Pay, etc.)

Then propose an implementation plan (milestones + file structure) before coding.
`
  await writeUtf8(path.join(promptsOut, 'one-shot-prompt.md'), oneShotPrompt.trim() + '\n')

  const sectionPrompt = `# Section implementation prompt

## Define section variables

- **SECTION_ID**: (folder in \`product-plan/sections/\`)
- **NN**: milestone number (starts at 03; 01 is foundation, 02 is shell)

---

I need you to implement the **SECTION_ID** section of my React Native app.

## Read first

1. **@product-plan/prd_spec.md**
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md**
3. **@product-plan/sections/SECTION_ID/spec.md**
4. **@product-plan/sections/SECTION_ID/types.ts**
5. **@product-plan/sections/SECTION_ID/sample-data.json**
6. (If present) **@product-plan/sections/SECTION_ID/interactions.md**

## Visual/reference materials

- (If present) **@product-plan/sections/SECTION_ID/mocks/**
- (If present) **@product-plan/sections/SECTION_ID/replicated-blueprints/**
- Optional runnable web reference bundle: **@product-plan/reference-web/**

## Before you start

Ask clarifying questions about:
- How this section connects to other entities
- Required permissions / roles
- Edge cases and empty states
`
  await writeUtf8(path.join(promptsOut, 'section-prompt.md'), sectionPrompt.trim() + '\n')

  const foundationMd = `# Milestone 01: Foundation

## Goal

Establish the React Native project foundation for an offline-first POS app.

## Required references

- \`product-plan/prd_spec.md\`
- \`product-plan/design-system/\`
- \`product-plan/data-model/data-model.md\` (if present)

## Deliverables

- App skeleton + navigation structure (matching shell spec)
- Local DB + sync scaffolding (offline-first reads/writes)
- Global types + data model vocabulary translated into TS types
- Theme/token plumbing (NativeWind v5 + ComPOSt tokens)
`
  await writeUtf8(path.join(incrementalOut, '01-foundation.md'), foundationMd.trim() + '\n')

  const shellMd = `# Milestone 02: Shell

## Goal

Implement the persistent application shell (navigation + gated areas) in React Native.

## Required references

- \`product-plan/shell/spec.md\` (if present)
- \`product-plan/prd_spec.md\`

## Notes

If \`product-plan/shell/components/\` exists, those TSX files are **web reference components**. Use them to mirror layout and interaction intent, but implement in RN using Gluestack UI + NativeWind.
`
  await writeUtf8(path.join(incrementalOut, '02-shell.md'), shellMd.trim() + '\n')

  // Section milestone instructions
  let milestoneN = 3
  const orderedForInstructions = roadmap
    .map((s) => s.id)
    .filter((id) => orderedSectionIds.includes(id))
    .concat(orderedSectionIds.filter((id) => !roadmapById.has(id)))

  const sectionInstructionFiles = []
  for (const sectionId of orderedForInstructions) {
    const nn = String(milestoneN).padStart(2, '0')
    milestoneN++

    const meta = roadmapById.get(sectionId)
    const title = meta?.title ?? sectionId
    const description = meta?.description ?? ''

    const md = `# Milestone ${nn}: ${title}

${description ? `> ${description}\n` : ''}
## Required references

- \`product-plan/sections/${sectionId}/spec.md\`
- \`product-plan/sections/${sectionId}/types.ts\`
- \`product-plan/sections/${sectionId}/sample-data.json\`
- (If present) \`product-plan/sections/${sectionId}/interactions.md\`

## Visual/reference materials

- (If present) \`product-plan/sections/${sectionId}/mocks/\`
- (If present) \`product-plan/sections/${sectionId}/replicated-blueprints/\`
- Optional runnable web reference bundle: \`product-plan/reference-web/\`

## Deliverables

- React Native screens/components for this section (Gluestack UI + NativeWind)
- Offline-first data flows: local DB reads/writes + sync
- Role/PIN gating where applicable (per spec)
- Empty states, loading/error states, and core user flows from \`spec.md\` + \`interactions.md\`
`
    const fileName = `${nn}-${sectionId}.md`
    sectionInstructionFiles.push(fileName)
    await writeUtf8(path.join(incrementalOut, fileName), md.trim() + '\n')
  }

  // One-shot instructions: lightweight aggregation
  const oneShotInstructions = `# ${productName} — One-shot implementation instructions

## What you’re receiving

This \`product-plan/\` export contains specs, tokens, sample data, and optional web reference screens to implement **a React Native app** (Android + iOS).

## Milestones

- 01: Foundation (\`instructions/incremental/01-foundation.md\`)
- 02: Shell (\`instructions/incremental/02-shell.md\`)
${sectionInstructionFiles.map((f) => `- ${f.split('-')[0]}: ${f.replace(/^\d\d-/, '').replace(/\.md$/, '')} (\`instructions/incremental/${f}\`)`).join('\n')}

## Notes on web reference TSX

Any \`sections/*/replicated/*.tsx\` and \`reference-web/\` content is **web-only reference** to help with visual parity and interpreting mockups. Do not treat it as RN production code.
`
  await writeUtf8(path.join(instructionsOut, 'one-shot-instructions.md'), oneShotInstructions.trim() + '\n')

  // README
  const readme = `# ${productName} — Design handoff (\`product-plan/\`)

## What’s inside

- \`product-overview.md\` — Product context + planned sections
- \`prd_spec.md\` — Target platform + non-negotiable tech stack (if present)
- \`design-system/\` — Tokens (colors/typography/spacing/radius/elevations)
- \`data-model/\` — Data model vocabulary (if present)
- \`shell/\` — Shell spec + (web) reference components (if present)
- \`sections/\` — Per-section specs, types, sample data, interactions, mocks, and replicated-blueprints
- \`instructions/\` — Implementation milestones + prompts
- \`reference-web/\` — Optional runnable web reference bundle (for viewing replicated screens)

## Recommended workflow

1. Use \`prompts/one-shot-prompt.md\` (or \`prompts/section-prompt.md\`) with your implementation agent.
2. Implement in milestones under \`instructions/incremental/\`.
3. Use \`reference-web/\` only as a visual/layout reference.
`
  await writeUtf8(path.join(outDir, 'README.md'), readme.trim() + '\n')

  // reference-web bundle
  const refOut = path.join(outDir, 'reference-web')
  const refSrcOut = path.join(refOut, 'src')
  const refScreensOut = path.join(refSrcOut, 'screens')

  await ensureDir(refScreensOut)

  // Copy the minimum component library needed by replicated screens
  await copyDir(path.join(repoRoot, 'src', 'components', 'ui'), path.join(refSrcOut, 'components', 'ui'))
  await copyDir(path.join(repoRoot, 'src', 'components', 'settings'), path.join(refSrcOut, 'components', 'settings'))
  await copyDir(path.join(repoRoot, 'src', 'components', 'patterns'), path.join(refSrcOut, 'components', 'patterns'))
  await copyDir(path.join(repoRoot, 'src', 'components', 'atoms'), path.join(refSrcOut, 'components', 'atoms'))
  await copyDir(path.join(repoRoot, 'src', 'components', 'previews'), path.join(refSrcOut, 'components', 'previews'))
  await copyFile(path.join(repoRoot, 'src', 'lib', 'utils.ts'), path.join(refSrcOut, 'lib', 'utils.ts'))

  // Generate theme CSS for reference-web from product tokens
  const colorsPath = path.join(productDir, 'design-system', 'colors.json')
  const typographyPath = path.join(productDir, 'design-system', 'typography.json')
  let colors = null
  let typography = null
  if (await exists(colorsPath)) colors = JSON.parse(await readUtf8(colorsPath))
  if (await exists(typographyPath)) typography = JSON.parse(await readUtf8(typographyPath))
  await writeUtf8(path.join(refSrcOut, 'index.css'), cssThemeFromDesignSystem({ colors, typography }))

  // Copy replicated screens into reference-web, rewriting @/ imports to relative
  const screenRegistry = []
  for (const sectionId of orderedSectionIds) {
    const replicatedInExport = path.join(sectionsOut, sectionId, 'replicated')
    if (!(await exists(replicatedInExport))) continue

    const files = (await fs.readdir(replicatedInExport, { withFileTypes: true }))
      .filter((d) => d.isFile() && d.name.endsWith('.tsx'))
      .map((d) => d.name)
      .sort()

    if (files.length === 0) continue

    const sectionScreensOut = path.join(refScreensOut, sectionId)
    await ensureDir(sectionScreensOut)

    for (const fileName of files) {
      const srcFile = path.join(replicatedInExport, fileName)
      const destFile = path.join(sectionScreensOut, fileName)
      const raw = await readUtf8(srcFile)
      const rewritten = rewriteAtAliasImports({ sourceCode: raw, fromFileAbs: destFile, toRootAbs: refOut })
      await writeUtf8(destFile, rewritten)

      const importPath = `./screens/${sectionId}/${fileName}`
      screenRegistry.push({
        id: `${sectionId}/${fileName.replace(/\.tsx$/, '')}`,
        sectionId,
        fileName,
        importPath,
      })
    }
  }

  const registryTs = `import * as React from "react";

export type ScreenEntry = {
  id: string;
  sectionId: string;
  fileName: string;
  Component: React.ComponentType<any>;
};

${screenRegistry
  .map((s, i) => `import Screen${i} from ${JSON.stringify(s.importPath)};`)
  .join('\n')}

export const screens: ScreenEntry[] = [
${screenRegistry
  .map((s, i) => `  { id: ${JSON.stringify(s.id)}, sectionId: ${JSON.stringify(s.sectionId)}, fileName: ${JSON.stringify(s.fileName)}, Component: Screen${i} },`)
  .join('\n')}
];
`
  await writeUtf8(path.join(refSrcOut, 'screens.ts'), registryTs)

  const appTsx = `import * as React from "react";
import { screens } from "./screens";

export function App() {
  const [selectedId, setSelectedId] = React.useState(screens[0]?.id ?? "");
  const selected = screens.find((s) => s.id === selectedId);
  const Component = selected?.Component;

  return (
    <div className="min-h-screen bg-layer-level-0 text-onLayer-primary">
      <div className="mx-auto max-w-5xl p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-semibold">Reference web</div>
            <div className="text-sm text-onLayer-secondary">
              Replicated screens are web-only reference for your RN implementation.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-onLayer-secondary">Screen</label>
            <select
              className="h-9 rounded-[12px] border border-border bg-layer-level-1 px-3 text-sm text-onLayer-primary"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {screens.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-border bg-layer-level-1 p-4">
          {Component ? <Component /> : <div className="text-sm text-onLayer-secondary">No screen selected.</div>}
        </div>
      </div>
    </div>
  );
}
`
  await writeUtf8(path.join(refSrcOut, 'App.tsx'), appTsx)

  const mainTsx = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`
  await writeUtf8(path.join(refSrcOut, 'main.tsx'), mainTsx)

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product plan reference web</title>
  </head>
  <body class="dark">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  await writeUtf8(path.join(refOut, 'index.html'), indexHtml)

  const refViteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`
  await writeUtf8(path.join(refOut, 'vite.config.ts'), refViteConfig)

  const refTsconfig = `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src"]
}
`
  await writeUtf8(path.join(refOut, 'tsconfig.json'), refTsconfig)

  const refPkg = {
    name: 'product-plan-reference-web',
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      '@radix-ui/react-accordion': '^1.2.12',
      '@radix-ui/react-avatar': '^1.1.11',
      '@radix-ui/react-checkbox': '^1.3.3',
      '@radix-ui/react-collapsible': '^1.1.12',
      '@radix-ui/react-dialog': '^1.1.15',
      '@radix-ui/react-dropdown-menu': '^2.1.16',
      '@radix-ui/react-label': '^2.1.8',
      '@radix-ui/react-popover': '^1.1.15',
      '@radix-ui/react-radio-group': '^1.3.8',
      '@radix-ui/react-select': '^2.2.6',
      '@radix-ui/react-separator': '^1.1.8',
      '@radix-ui/react-slider': '^1.3.6',
      '@radix-ui/react-slot': '^1.2.4',
      '@radix-ui/react-switch': '^1.2.6',
      '@radix-ui/react-tabs': '^1.1.13',
      'class-variance-authority': '^0.7.1',
      clsx: '^2.1.1',
      'date-fns': '^4.1.0',
      'lucide-react': '^0.554.0',
      react: '^19.2.0',
      'react-day-picker': '^9.13.0',
      'react-dom': '^19.2.0',
      recharts: '^3.6.0',
      sonner: '^2.0.7',
      'tailwind-merge': '^3.4.0',
      tailwindcss: '^4.1.17',
    },
    devDependencies: {
      '@tailwindcss/vite': '^4.1.17',
      '@types/react': '^19.2.5',
      '@types/react-dom': '^19.2.3',
      '@vitejs/plugin-react': '^5.1.1',
      typescript: '~5.9.3',
      vite: '^7.2.4',
      'tw-animate-css': '^1.4.0',
    },
  }
  await writeUtf8(path.join(refOut, 'package.json'), JSON.stringify(refPkg, null, 2) + '\n')

  // Zip it
  log('📦 Creating product-plan.zip...')
  const zip = new JSZip()
  await addFolderToZip(zip, outDir, 'product-plan')
  const zipData = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
  await fs.writeFile(zipPath, zipData)

  log('✅ Export complete:')
  log(`- ${path.relative(repoRoot, outDir)}${path.sep}`)
  log(`- ${path.relative(repoRoot, zipPath)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

