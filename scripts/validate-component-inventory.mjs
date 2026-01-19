import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()

function readText(relPath) {
  return fs.readFileSync(path.join(repoRoot, relPath), 'utf8')
}

function uniq(arr) {
  return [...new Set(arr)]
}

function parseInventoryPointers(inventorySource) {
  // Matches: component: '...'
  const re = /component:\s*'([^']+)'/g
  return [...inventorySource.matchAll(re)].map((m) => m[1])
}

function parseInventoryItems(inventorySource) {
  // Matches items in the inventory groups:
  // { id: 'x', title: 'y', component: 'z' }
  const re =
    /\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'[^']+'\s*,\s*component:\s*'([^']+)'\s*\}/g
  return [...inventorySource.matchAll(re)].map((m) => ({ id: m[1], component: m[2] }))
}

function parseInventoryGroups(inventorySource) {
  // Matches groups:
  // { id: 'x', title: 'y', items: [
  const re = /\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'[^']+'\s*,\s*items:\s*\[/g
  return [...inventorySource.matchAll(re)].map((m) => m[1])
}

function parseRegistryKeys(registrySource) {
  // Matches object key:  '...':
  const re = /^\s*'([^']+)'\s*:\s*/gm
  return [...registrySource.matchAll(re)].map((m) => m[1])
}

function resolveAliasFile(pointerFilePath) {
  // '@/foo/bar' => 'src/foo/bar'
  const rel = pointerFilePath.replace(/^@\//, 'src/')
  const candidates = [`${rel}.tsx`, `${rel}.ts`, `${rel}.jsx`, `${rel}.js`, rel]
  for (const c of candidates) {
    const abs = path.join(repoRoot, c)
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return c
  }
  return null
}

function checkExportExists(fileSource, exportName) {
  const re = new RegExp(`export\\s+function\\s+${exportName}\\b`)
  const reConst = new RegExp(`export\\s+const\\s+${exportName}\\b`)
  const reDefaultFn = new RegExp(`export\\s+default\\s+function\\s+${exportName}\\b`)
  return re.test(fileSource) || reConst.test(fileSource) || reDefaultFn.test(fileSource)
}

function checkCardIdPresent(fileSource, id) {
  // Best-effort: find Card with id="..."
  const re1 = new RegExp(`\\bid\\s*=\\s*["']${id}["']`)
  return re1.test(fileSource)
}

const inventoryPath = 'src/components/patterns/component-examples/inventory.ts'
const registryPath = 'src/components/patterns/component-examples/registry.tsx'

const inventory = readText(inventoryPath)
const registry = readText(registryPath)

const invPointers = parseInventoryPointers(inventory)
const invItems = parseInventoryItems(inventory)
const invGroupIds = parseInventoryGroups(inventory)
const invItemIds = invItems.map((x) => x.id)
const regKeys = parseRegistryKeys(registry)

const missingFromRegistry = uniq(invPointers.filter((p) => !regKeys.includes(p)))
const extraInRegistry = uniq(regKeys.filter((p) => !invPointers.includes(p)))

const dupItemIds = uniq(invItemIds.filter((id, i) => invItemIds.indexOf(id) !== i))

const componentToId = new Map(invItems.map((it) => [it.component, it.id]))

const missingFiles = []
const missingExports = []
const idMismatches = []

for (const pointer of invPointers) {
  const [filePointer, exportName] = pointer.split('#')
  const resolved = resolveAliasFile(filePointer)
  if (!resolved) {
    missingFiles.push({ pointer, filePointer })
    continue
  }
  const src = readText(resolved)
  if (!exportName || !checkExportExists(src, exportName)) {
    missingExports.push({ pointer, resolved, exportName: exportName ?? null })
  }

  const expectedId = componentToId.get(pointer)
  if (expectedId && !checkCardIdPresent(src, expectedId)) {
    idMismatches.push({ pointer, resolved, expectedId })
  }
}

const result = {
  inventory: {
    path: inventoryPath,
    pointers: invPointers.length,
    groups: invGroupIds.length,
    items: invItems.length,
    duplicateItemIds: dupItemIds,
  },
  registry: {
    path: registryPath,
    keys: regKeys.length,
  },
  sync: {
    missingFromRegistry,
    extraInRegistry,
  },
  componentChecks: {
    missingFiles,
    missingExports,
    idMismatches,
  },
}

console.log(JSON.stringify(result, null, 2))

const hasErrors =
  result.sync.missingFromRegistry.length > 0 ||
  result.componentChecks.missingFiles.length > 0 ||
  result.componentChecks.missingExports.length > 0

process.exitCode = hasErrors ? 1 : 0

