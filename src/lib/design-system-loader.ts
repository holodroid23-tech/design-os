/**
 * Design system loading utilities for colors, typography, spacing, radius, and elevations
 */

import type { 
  DesignSystem, 
  ColorTokens, 
  TypographyTokens,
  ComprehensiveColorSystem,
  ComprehensiveTypographySystem,
  SpacingTokens,
  RadiusTokens,
  ElevationTokens
} from '@/types/product'

// Load JSON files from product/design-system at build time
const designSystemFiles = import.meta.glob('/product/design-system/*.json', {
  eager: true,
}) as Record<string, { default: any }>

let cachedColorTokens: ColorTokens | ComprehensiveColorSystem | null | undefined

function getColorTokensOnce(): ColorTokens | ComprehensiveColorSystem | null {
  if (cachedColorTokens !== undefined) return cachedColorTokens
  cachedColorTokens = loadColorTokens()
  return cachedColorTokens
}

/**
 * Check if a color system is comprehensive (has semantic, primitives, gradients)
 */
function isComprehensiveColorSystem(colors: any): colors is ComprehensiveColorSystem {
  return colors && 
    typeof colors === 'object' && 
    'semantic' in colors && 
    'primitives' in colors && 
    'gradients' in colors
}

/**
 * Check if a typography system is comprehensive (has typefaces, styles, sizes)
 */
function isComprehensiveTypographySystem(typography: any): typography is ComprehensiveTypographySystem {
  return typography && 
    typeof typography === 'object' && 
    'typefaces' in typography && 
    'styles' in typography && 
    'sizes' in typography
}

/**
 * Load color tokens from colors.json
 *
 * Supports two formats:
 * 1. Simple: { "primary": "lime", "secondary": "teal", "neutral": "stone" }
 * 2. Comprehensive: { "version": "1.0.0", "system": "compost", "semantic": {...}, "primitives": {...}, "gradients": {...} }
 */
export function loadColorTokens(): ColorTokens | ComprehensiveColorSystem | null {
  const colorsModule = designSystemFiles['/product/design-system/colors.json']
  if (!colorsModule?.default) return null

  const colors = colorsModule.default

  // Check if comprehensive format
  if (isComprehensiveColorSystem(colors)) {
    return colors
  }

  // Simple format
  if (!colors.primary || !colors.secondary || !colors.neutral) {
    return null
  }

  return {
    primary: colors.primary,
    secondary: colors.secondary,
    neutral: colors.neutral,
  }
}

/**
 * Get a semantic color value from the comprehensive color system.
 *
 * Example: getSemanticColor('onLayer', 'secondary') -> "#b5b5b7"
 */
export function getSemanticColor(group: string, token: string): string | null {
  const colors = getColorTokensOnce()
  if (!isComprehensiveColorSystem(colors)) return null

  const value = colors.semantic?.[group]?.[token]
  return typeof value === 'string' ? value : null
}

/**
 * Load typography tokens from typography.json
 *
 * Supports two formats:
 * 1. Simple: { "heading": "DM Sans", "body": "DM Sans", "mono": "IBM Plex Mono" }
 * 2. Comprehensive: { "version": "1.0.0", "typefaces": {...}, "styles": {...}, "sizes": {...} }
 */
export function loadTypographyTokens(): TypographyTokens | ComprehensiveTypographySystem | null {
  const typographyModule = designSystemFiles['/product/design-system/typography.json']
  if (!typographyModule?.default) return null

  const typography = typographyModule.default

  // Check if comprehensive format
  if (isComprehensiveTypographySystem(typography)) {
    return typography
  }

  // Simple format
  if (!typography.heading || !typography.body) {
    return null
  }

  return {
    heading: typography.heading,
    body: typography.body,
    mono: typography.mono || 'IBM Plex Mono',
  }
}

/**
 * Load spacing tokens from spacing.json
 */
export function loadSpacingTokens(): SpacingTokens | null {
  const spacingModule = designSystemFiles['/product/design-system/spacing.json']
  if (!spacingModule?.default) return null
  return spacingModule.default
}

/**
 * Load radius tokens from radius.json
 */
export function loadRadiusTokens(): RadiusTokens | null {
  const radiusModule = designSystemFiles['/product/design-system/radius.json']
  if (!radiusModule?.default) return null
  return radiusModule.default
}

/**
 * Load elevation tokens from elevations.json
 */
export function loadElevationTokens(): ElevationTokens | null {
  const elevationsModule = designSystemFiles['/product/design-system/elevations.json']
  if (!elevationsModule?.default) return null
  return elevationsModule.default
}

/**
 * Load the complete design system
 */
export function loadDesignSystem(): DesignSystem | null {
  const colors = loadColorTokens()
  const typography = loadTypographyTokens()
  const spacing = loadSpacingTokens()
  const radius = loadRadiusTokens()
  const elevations = loadElevationTokens()

  // Return null if neither colors nor typography are defined
  if (!colors && !typography) {
    return null
  }

  // Check if comprehensive system
  const hasComprehensiveSystem = 
    isComprehensiveColorSystem(colors) || 
    isComprehensiveTypographySystem(typography) ||
    !!spacing ||
    !!radius ||
    !!elevations

  return { 
    colors, 
    typography,
    spacing,
    radius,
    elevations,
    hasComprehensiveSystem
  }
}

/**
 * Check if design system has been defined (at least colors or typography)
 */
export function hasDesignSystem(): boolean {
  return (
    '/product/design-system/colors.json' in designSystemFiles ||
    '/product/design-system/typography.json' in designSystemFiles
  )
}

/**
 * Check if colors have been defined
 */
export function hasColors(): boolean {
  return '/product/design-system/colors.json' in designSystemFiles
}

/**
 * Check if typography has been defined
 */
export function hasTypography(): boolean {
  return '/product/design-system/typography.json' in designSystemFiles
}

/**
 * Check if spacing has been defined
 */
export function hasSpacing(): boolean {
  return '/product/design-system/spacing.json' in designSystemFiles
}

/**
 * Check if radius has been defined
 */
export function hasRadius(): boolean {
  return '/product/design-system/radius.json' in designSystemFiles
}

/**
 * Check if elevations have been defined
 */
export function hasElevations(): boolean {
  return '/product/design-system/elevations.json' in designSystemFiles
}
