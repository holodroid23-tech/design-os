/**
 * Product types for Design OS v2
 */

// =============================================================================
// Product Overview
// =============================================================================

export interface Problem {
  title: string
  solution: string
}

export interface ProductOverview {
  name: string
  description: string
  problems: Problem[]
  features: string[]
}

// =============================================================================
// Product Roadmap
// =============================================================================

export interface Section {
  id: string // slug derived from title
  title: string
  description: string
  order: number
}

export interface ProductRoadmap {
  sections: Section[]
}

// =============================================================================
// Data Model
// =============================================================================

export interface Entity {
  name: string
  description: string
}

export interface DataModel {
  entities: Entity[]
  relationships: string[]
}

// =============================================================================
// Design System
// =============================================================================

// Simple color tokens (backward compatible)
export interface ColorTokens {
  primary: string
  secondary: string
  neutral: string
}

// Comprehensive color system
export interface ComprehensiveColorSystem {
  version: string
  system: string
  semantic: Record<string, any>
  primitives: Record<string, any>
  gradients: Record<string, any>
}

// Simple typography tokens (backward compatible)
export interface TypographyTokens {
  heading: string
  body: string
  mono: string
}

// Comprehensive typography system
export interface ComprehensiveTypographySystem {
  version: string
  system: string
  mode: string
  heading: string
  body: string
  mono: string
  typefaces: {
    main: {
      name: string
      description: string
      fallback: string
    }
    code: {
      name: string
      description: string
      fallback: string
    }
  }
  sizes: {
    summary: Record<string, string>
  }
  styles: Record<string, any>
  colors: Record<string, any>
}

// Spacing tokens
export interface SpacingTokens {
  version: string
  system: string
  description?: string
  /**
   * Optional base grid unit (some token files describe this implicitly).
   * Example: "6px"
   */
  grid?: string
  scale: Record<string, { value: string; description: string; usage?: string }>
  recommendations: {
    paddingsAndMargins?: Record<string, { value: string; description: string; examples?: string[] }>
    sizes?: Record<
      string,
      {
        value: string
        description: string
        examples?: string[]
        spacingReference?: string
        mobileNote?: string
      }
    >
  }
  mobileOptimizations?: {
    contentPadding?: {
      portrait: string
      landscape: string
      tablet: string
      description: string
    }
    touchTargets?: {
      minimum: string
      recommended: string
      description: string
      guidelines?: Record<string, any>
    }
    sectionSpacing?: {
      small: string
      medium: string
      large: string
      description: string
    }
  }
  usage?: Record<string, any>
}

// Radius tokens
export interface RadiusTokens {
  version: string
  system: string
  description?: string
  variables: Record<string, { value: string; description: string; usage: string; spacingReference?: string }>
  hierarchy?: { description: string; principle: string }
  correlation?: { description: string; relationships?: Record<string, string> }
  usage?: Record<string, any>
}

// Elevation tokens
export interface ElevationTokens {
  version: string
  system: string
  levels: Record<string, { value: string; description: string; usage: string }>
  rules: string[]
}

export interface DesignSystem {
  // Core tokens (can be simple or comprehensive)
  colors: ColorTokens | ComprehensiveColorSystem | null
  typography: TypographyTokens | ComprehensiveTypographySystem | null
  
  // Extended tokens (comprehensive system only)
  spacing?: SpacingTokens | null
  radius?: RadiusTokens | null
  elevations?: ElevationTokens | null
  
  // Metadata
  hasComprehensiveSystem?: boolean
}

// =============================================================================
// Application Shell
// =============================================================================

export interface ShellSpec {
  raw: string
  overview: string
  navigationItems: string[]
  layoutPattern: string
}

export interface ShellInfo {
  spec: ShellSpec | null
  hasComponents: boolean
}

// =============================================================================
// Combined Product Data
// =============================================================================

export interface ProductData {
  overview: ProductOverview | null
  roadmap: ProductRoadmap | null
  dataModel: DataModel | null
  designSystem: DesignSystem | null
  shell: ShellInfo | null
}
