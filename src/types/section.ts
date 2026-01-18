/**
 * Section types for Design OS v2
 */

export interface SectionData {
  sectionId: string
  spec: string | null
  specParsed: ParsedSpec | null
  data: Record<string, unknown> | null
}

export interface ParsedSpec {
  title: string
  overview: string
  userFlows: string[]
  uiRequirements: string[]
}
