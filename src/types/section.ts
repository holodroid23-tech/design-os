/**
 * Section types for Design OS v2
 */

export interface MockupInfo {
  fileName: string          // analytics-cashier-view.png
  displayName: string       // Analytics Cashier View
  componentName: string     // AnalyticsCashierView
  imagePath: string         // /product/sections/[id]/mocks/analytics-cashier-view.png
  isReplicated: boolean     // true if component exists
  componentPath?: string    // /product/sections/[id]/replicated/AnalyticsCashierView.tsx
}

export interface SectionData {
  sectionId: string
  spec: string | null
  specParsed: ParsedSpec | null
  data: Record<string, unknown> | null
  mocks: MockupInfo[]
}

export interface ParsedSpec {
  title: string
  overview: string
  userFlows: string[]
  uiRequirements: string[]
}
