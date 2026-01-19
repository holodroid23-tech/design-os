import fs from 'node:fs/promises'
import path from 'node:path'

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function ok(message) {
  console.log(message)
}

const args = process.argv.slice(2)
const strictComponents = args.includes('--strict-components')
const target = args.find((a) => !a.startsWith('-'))

if (!target || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: npm run parity-check -- [--strict-components] <path-to-tsx>')
  console.log('')
  console.log('Checks for:')
  console.log('- inline styles (style={{...}})')
  console.log('- direct hex/rgb/hsl colors')
  console.log('- hardcoded Tailwind palette colors (e.g. bg-blue-500)')
  console.log('- forbidden rounded-* utilities and invalid rounded-[Npx]')
  console.log('- (optional) strict component usage for replicated screens')
  process.exit(target ? 0 : 2)
}

const abs = path.resolve(process.cwd(), target)

let content = ''
try {
  content = await fs.readFile(abs, 'utf8')
} catch (e) {
  console.error(`Could not read file: ${target}`)
  process.exit(2)
}

const checks = [
  {
    name: 'No inline styles',
    re: /\bstyle=\{\{/,
    message: 'Found inline style usage: `style={{ ... }}`',
  },
  {
    name: 'No direct hex colors',
    re: /#[0-9a-fA-F]{3,8}\b/,
    message: 'Found direct hex color (e.g. `#ff0000`)',
  },
  {
    name: 'No rgb()/hsl() colors',
    re: /\b(rgb|rgba|hsl|hsla)\(/,
    message: 'Found direct rgb()/hsl() color value',
  },
  {
    name: 'No hardcoded Tailwind palette colors',
    re: /\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/,
    message:
      'Found hardcoded Tailwind color class (e.g. `bg-blue-500`, `text-red-600`)',
  },
  {
    name: 'No named radius utilities (rounded-lg/xl/etc)',
    re: /\brounded-(?:none|sm|md|lg|xl|2xl|3xl|full)\b/,
    message:
      'Found forbidden radius utility (use `rounded-[3px|6px|12px|18px|9999px]` only)',
  },
]

if (strictComponents) {
  checks.push({
    name: 'Use UI components (no raw button/input/select/textarea)',
    re: /<\s*(button|input|select|textarea)\b/,
    message:
      'Found raw element usage. Use design library primitives from `@/components/ui` (e.g. `<Button>`, `<Input>`, `<Select>`) instead.',
  })
}

for (const c of checks) {
  if (c.re.test(content)) {
    fail(`FAIL: ${c.name}\n- ${c.message}\n- File: ${target}`)
  } else {
    ok(`PASS: ${c.name}`)
  }
}

// Allowed arbitrary radii only: 3px, 6px, 12px, 18px, 9999px
const arbitraryRadius = [...content.matchAll(/\brounded-\[(\d+)px\]\b/g)].map(
  (m) => Number(m[1]),
)

for (const px of arbitraryRadius) {
  if (![3, 6, 12, 18, 9999].includes(px)) {
    fail(
      `FAIL: Allowed radius values only\n- Found \`rounded-[${px}px]\`\n- File: ${target}`,
    )
  }
}

if (process.exitCode === 1) {
  console.error('\nParity check failed.')
  process.exit(1)
}

console.log('\nParity check passed.')
