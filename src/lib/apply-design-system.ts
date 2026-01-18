import type { DesignSystem, ComprehensiveColorSystem, ComprehensiveTypographySystem } from '@/types/product'

function isComprehensiveColorSystem(colors: any): colors is ComprehensiveColorSystem {
  return (
    !!colors &&
    typeof colors === 'object' &&
    'semantic' in colors &&
    'primitives' in colors &&
    'gradients' in colors
  )
}

function isComprehensiveTypographySystem(typography: any): typography is ComprehensiveTypographySystem {
  return (
    !!typography &&
    typeof typography === 'object' &&
    'typefaces' in typography &&
    'styles' in typography &&
    'sizes' in typography
  )
}

function getSemantic(colors: ComprehensiveColorSystem, group: string, token: string): string | undefined {
  const v = (colors.semantic as any)?.[group]?.[token]
  return typeof v === 'string' ? v : undefined
}

function getPrimitive(colors: ComprehensiveColorSystem, group: string, name: string, shade: string): string | undefined {
  const v = (colors.primitives as any)?.[group]?.[name]?.[shade]
  return typeof v === 'string' ? v : undefined
}

/**
 * Applies product design tokens to the app theme (CSS variables).
 *
 * This is what makes “change tokens → screens update” possible.
 * It is intentionally best-effort and only runs in the browser.
 */
export function applyDesignSystemToTheme(designSystem: DesignSystem | null) {
  if (typeof document === 'undefined') return
  if (!designSystem) return
  applyDesignSystemToElement(document.documentElement, designSystem)
}

export function applyDesignSystemToElement(target: HTMLElement | null, designSystem: DesignSystem | null) {
  if (typeof document === 'undefined') return
  if (!target) return
  if (!designSystem) return

  const setVar = (name: string, value: string | null | undefined) => {
    if (!value) return
    target.style.setProperty(name, value)
  }

  const colors = designSystem.colors
  if (isComprehensiveColorSystem(colors)) {
    // Expose ComPOSt semantic tokens as Tailwind v4 @theme colors
    setVar('--color-layer-level-0', getSemantic(colors, 'layer', 'level-0'))
    setVar('--color-layer-level-1', getSemantic(colors, 'layer', 'level-1'))
    setVar('--color-layer-level-2', getSemantic(colors, 'layer', 'level-2'))
    setVar('--color-layer-level-3', getSemantic(colors, 'layer', 'level-3'))
    // Back-compat aliases used in some screens (bg-layer-1, etc.)
    setVar('--color-layer-0', getSemantic(colors, 'layer', 'level-0'))
    setVar('--color-layer-1', getSemantic(colors, 'layer', 'level-1'))
    setVar('--color-layer-2', getSemantic(colors, 'layer', 'level-2'))
    setVar('--color-layer-3', getSemantic(colors, 'layer', 'level-3'))

    setVar('--color-onLayer-primary', getSemantic(colors, 'onLayer', 'primary'))
    setVar('--color-onLayer-secondary', getSemantic(colors, 'onLayer', 'secondary'))
    setVar('--color-onLayer-tertiary', getSemantic(colors, 'onLayer', 'tertiary'))
    setVar('--color-onLayer-inverse', getSemantic(colors, 'onLayer', 'inverse'))

    setVar('--color-border-primary', getSemantic(colors, 'border', 'primary'))
    setVar('--color-border-secondary', getSemantic(colors, 'border', 'secondary'))
    setVar('--color-border-inverse', getSemantic(colors, 'border', 'inverse'))
    setVar('--color-border-focus-ring', getSemantic(colors, 'border', 'focus-ring'))
    setVar('--color-border-focus-ring-inverse', getSemantic(colors, 'border', 'focus-ring-inverse'))

    setVar('--color-button-primary', getSemantic(colors, 'button', 'primary'))
    setVar('--color-button-danger', getSemantic(colors, 'button', 'danger'))

    // Map ComPOSt → shadcn theme variables (bg-background, text-foreground, etc.)
    const layer0 = getSemantic(colors, 'layer', 'level-0')
    const layer1 = getSemantic(colors, 'layer', 'level-1')
    const layer2 = getSemantic(colors, 'layer', 'level-2')
    const onPrimary = getSemantic(colors, 'onLayer', 'primary')
    const onSecondary = getSemantic(colors, 'onLayer', 'secondary')
    const primary = getSemantic(colors, 'button', 'primary') ?? getSemantic(colors, 'onLayer', 'interactive')
    const destructive = getSemantic(colors, 'button', 'danger') ?? getSemantic(colors, 'onLayer', 'danger')

    const white = getPrimitive(colors, 'neutrals', 'white', '100') ?? '#ffffff'

    setVar('--background', layer0)
    setVar('--foreground', onPrimary)
    setVar('--card', layer1)
    setVar('--card-foreground', onPrimary)
    setVar('--popover', layer1)
    setVar('--popover-foreground', onPrimary)

    setVar('--primary', primary)
    setVar('--primary-foreground', white)

    setVar('--secondary', layer2 ?? layer1)
    setVar('--secondary-foreground', onPrimary)

    setVar('--muted', layer1)
    setVar('--muted-foreground', onSecondary)

    setVar('--accent', layer1)
    setVar('--accent-foreground', onPrimary)

    setVar('--destructive', destructive)

    // Borders/ring: prefer “inverse” for dark‑mode oriented systems
    setVar('--border', getSemantic(colors, 'border', 'inverse') ?? getSemantic(colors, 'border', 'secondary'))
    setVar('--input', getSemantic(colors, 'border', 'inverse') ?? getSemantic(colors, 'border', 'secondary'))
    setVar('--ring', getSemantic(colors, 'border', 'focus-ring-inverse') ?? getSemantic(colors, 'border', 'focus-ring'))
  }

  const typography = designSystem.typography
  if (isComprehensiveTypographySystem(typography)) {
    const mainFallback = (typography.typefaces as any)?.main?.fallback
    const codeFallback = (typography.typefaces as any)?.code?.fallback
    setVar('--font-display', typeof mainFallback === 'string' ? mainFallback : undefined)
    setVar('--font-body', typeof mainFallback === 'string' ? mainFallback : undefined)
    setVar('--font-sans', typeof mainFallback === 'string' ? mainFallback : undefined)
    setVar('--font-mono', typeof codeFallback === 'string' ? codeFallback : undefined)
  } else if (typography && typeof typography === 'object') {
    // Simple format (backward compatible)
    const heading = (typography as any).heading
    const body = (typography as any).body
    const mono = (typography as any).mono
    setVar('--font-display', typeof heading === 'string' ? heading : undefined)
    setVar('--font-body', typeof body === 'string' ? body : undefined)
    setVar('--font-sans', typeof body === 'string' ? body : undefined)
    setVar('--font-mono', typeof mono === 'string' ? mono : undefined)
  }
}

