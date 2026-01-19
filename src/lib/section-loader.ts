/**
 * Section data loading utilities for spec.md and data.json
 *
 * File structure:
 * - product/sections/[section-id]/spec.md     - Section specification
 * - product/sections/[section-id]/data.json   - Sample data
 * - product/sections/[section-id]/mocks/      - Mockup images
 * - product/sections/[section-id]/replicated/ - Replicated components
 */

import type { SectionData, ParsedSpec, MockupInfo } from '@/types/section'

// Load spec.md files from product/sections at build time
const specFiles = import.meta.glob('/product/sections/*/spec.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Load data.json files from product/sections at build time
const dataFiles = import.meta.glob('/product/sections/*/data.json', {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>

// Load mockup images from product/sections at build time
const mockFiles = import.meta.glob('/product/sections/*/mocks/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

// Load replicated components dynamically
const replicatedComponents = import.meta.glob('/product/sections/*/replicated/*.tsx', {
  eager: false,
}) as Record<string, () => Promise<{ default: React.ComponentType }>>

/**
 * Extract section ID from a product/sections file path
 * e.g., "/product/sections/invoices/spec.md" -> "invoices"
 */
function extractSectionIdFromProduct(path: string): string | null {
  const match = path.match(/\/product\/sections\/([^/]+)\//)
  return match?.[1] || null
}


/**
 * Parse spec.md content into ParsedSpec structure
 *
 * Expected format:
 * # Section Specification
 *
 * ## Overview
 * [Brief description of the section]
 *
 * ## User Flows
 * - Flow 1
 * - Flow 2
 *
 * ## UI Requirements
 * - Requirement 1
 * - Requirement 2
 *
 */
export function parseSpec(md: string): ParsedSpec | null {
  if (!md || !md.trim()) return null

  try {
    // Extract title from first # heading
    const titleMatch = md.match(/^#\s+(.+)$/m)
    const title = titleMatch?.[1]?.trim() || 'Section Specification'

    // Extract overview - content between ## Overview and next ##
    const overviewMatch = md.match(/## Overview\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)
    const overview = overviewMatch?.[1]?.trim() || ''

    // Extract user flows - bullet list after ## User Flows
    const userFlowsSection = md.match(/## User Flows\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)
    const userFlows: string[] = []

    if (userFlowsSection?.[1]) {
      const lines = userFlowsSection[1].split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('- ')) {
          userFlows.push(trimmed.slice(2).trim())
        }
      }
    }

    // Extract UI requirements - bullet list after ## UI Requirements
    const uiReqSection = md.match(/## UI Requirements\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)
    const uiRequirements: string[] = []

    if (uiReqSection?.[1]) {
      const lines = uiReqSection[1].split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('- ')) {
          uiRequirements.push(trimmed.slice(2).trim())
        }
      }
    }

    return { title, overview, userFlows, uiRequirements }
  } catch {
    return null
  }
}

/**
 * Convert filename to PascalCase component name
 * e.g., "analytics-cashier-view.png" -> "AnalyticsCashierView"
 */
function fileNameToComponentName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.(png|jpg|jpeg)$/i, '')
  return nameWithoutExt
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

/**
 * Convert filename to display name
 * e.g., "analytics-cashier-view.png" -> "Analytics Cashier View"
 */
function fileNameToDisplayName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.(png|jpg|jpeg)$/i, '')
  return nameWithoutExt
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Load all mockups for a specific section
 * Also includes replicated components without mockups (Builder workflow)
 */
export function loadSectionMocks(sectionId: string): MockupInfo[] {
  const mockupsPrefix = `/product/sections/${sectionId}/mocks/`
  const replicatedPrefix = `/product/sections/${sectionId}/replicated/`

  const mocks: MockupInfo[] = []
  const processedComponents = new Set<string>()

  // First, process mockups that have PNG files
  for (const path of Object.keys(mockFiles)) {
    if (path.startsWith(mockupsPrefix)) {
      const fileName = path.replace(mockupsPrefix, '')
      const componentName = fileNameToComponentName(fileName)
      const displayName = fileNameToDisplayName(fileName)
      const componentPath = `${replicatedPrefix}${componentName}.tsx`
      const isReplicated = componentPath in replicatedComponents

      mocks.push({
        fileName,
        displayName,
        componentName,
        imagePath: path,
        isReplicated,
        componentPath: isReplicated ? componentPath : undefined,
      })

      processedComponents.add(componentName)
    }
  }

  // Second, process replicated components without mockups (Blueprint-built screens)
  for (const path of Object.keys(replicatedComponents)) {
    if (path.startsWith(replicatedPrefix)) {
      const fileName = path.replace(replicatedPrefix, '').replace('.tsx', '')
      // Convert PascalCase back to kebab-case for component name detection
      const kebabName = fileName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      const componentName = fileName
      const displayName = fileNameToDisplayName(kebabName)

      // Only add if not already processed from mockup
      if (!processedComponents.has(componentName)) {
        mocks.push({
          fileName: `${kebabName}.png`, // Virtual filename for consistency
          displayName,
          componentName,
          imagePath: '', // No mockup image
          isReplicated: true,
          componentPath: path,
        })
      }
    }
  }

  return mocks.sort((a, b) => a.displayName.localeCompare(b.displayName))
}

/**
 * Check if a section has any mockups
 */
export function hasSectionMocks(sectionId: string): boolean {
  const mockupsPrefix = `/product/sections/${sectionId}/mocks/`
  return Object.keys(mockFiles).some(path => path.startsWith(mockupsPrefix))
}

/**
 * Check if a specific mockup has a replicated design
 */
export function hasReplicatedDesign(sectionId: string, mockName: string): boolean {
  const componentName = fileNameToComponentName(mockName)
  const componentPath = `/product/sections/${sectionId}/replicated/${componentName}.tsx`
  return componentPath in replicatedComponents
}

/**
 * Load a replicated component dynamically
 */
export async function loadReplicatedComponent(
  sectionId: string,
  mockName: string
): Promise<React.ComponentType | null> {
  const componentName = fileNameToComponentName(mockName)
  const componentPath = `/product/sections/${sectionId}/replicated/${componentName}.tsx`

  if (!(componentPath in replicatedComponents)) {
    return null
  }

  try {
    const module = await replicatedComponents[componentPath]()
    return module.default
  } catch (error) {
    console.error(`Failed to load replicated component: ${componentPath}`, error)
    return null
  }
}

/**
 * Load all data for a specific section
 */
export function loadSectionData(sectionId: string): SectionData {
  const specPath = `/product/sections/${sectionId}/spec.md`
  const dataPath = `/product/sections/${sectionId}/data.json`

  const specContent = specFiles[specPath] || null
  const dataModule = dataFiles[dataPath]
  const data = dataModule?.default || null
  const mocks = loadSectionMocks(sectionId)

  return {
    sectionId,
    spec: specContent,
    specParsed: specContent ? parseSpec(specContent) : null,
    data,
    mocks,
  }
}

/**
 * Check if a section has a spec.md file
 */
export function hasSectionSpec(sectionId: string): boolean {
  return `/product/sections/${sectionId}/spec.md` in specFiles
}

/**
 * Check if a section has a data.json file
 */
export function hasSectionData(sectionId: string): boolean {
  return `/product/sections/${sectionId}/data.json` in dataFiles
}

/**
 * Get all section IDs that have any artifacts
 */
export function getAllSectionIds(): string[] {
  const ids = new Set<string>()

  for (const path of Object.keys(specFiles)) {
    const id = extractSectionIdFromProduct(path)
    if (id) ids.add(id)
  }

  for (const path of Object.keys(dataFiles)) {
    const id = extractSectionIdFromProduct(path)
    if (id) ids.add(id)
  }

  return Array.from(ids)
}
