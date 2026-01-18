import { FileText, Map, ClipboardList, Database, Package, Boxes, Palette, PanelLeft, Layout } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type EmptyStateType =
  | 'overview'
  | 'roadmap'
  | 'spec'
  | 'data'
  | 'data-model'
  | 'design-system'
  | 'shell'
  | 'screen-designs'
  | 'export'

interface EmptyStateProps {
  type: EmptyStateType
}

const config: Record<EmptyStateType, {
  icon: typeof FileText
  title: string
  command: string
  description: string
}> = {
  overview: {
    icon: FileText,
    title: 'No product defined yet',
    command: '/product-vision',
    description: 'Define your product vision, key problems, and features',
  },
  roadmap: {
    icon: Map,
    title: 'No roadmap defined yet',
    command: '/product-roadmap',
    description: 'Break down your product into development sections',
  },
  spec: {
    icon: ClipboardList,
    title: 'No specification defined yet',
    command: '/shape-section',
    description: 'Define the user flows and UI requirements',
  },
  data: {
    icon: Database,
    title: 'No sample data generated yet',
    command: '/sample-data',
    description: 'Create realistic sample data for this section',
  },
  'data-model': {
    icon: Boxes,
    title: 'No data model defined yet',
    command: '/data-model',
    description: 'Define the core entities and relationships',
  },
  'design-system': {
    icon: Palette,
    title: 'No design tokens defined yet',
    command: '/design-tokens',
    description: 'Choose colors and typography for your product',
  },
  shell: {
    icon: PanelLeft,
    title: 'No application shell designed yet',
    command: '/design-shell',
    description: 'Design the navigation and layout',
  },
  'screen-designs': {
    icon: Layout,
    title: 'No screen designs yet',
    command: '/design-screen',
    description: 'Create screen designs for this section',
  },
  export: {
    icon: Package,
    title: 'Ready to export',
    command: '/export-product',
    description: 'Generate the complete handoff package',
  },
}

export function EmptyState({ type }: EmptyStateProps) {
  const { icon: Icon, title, command, description } = config[type]

  return (
    <Card className="shadow-sm border-dashed">
      <CardContent className="py-8">
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-muted-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          <div className="bg-muted rounded-md px-4 py-2.5 w-full">
            <p className="text-xs text-muted-foreground mb-0.5">
              Run in Claude Code:
            </p>
            <code className="text-sm font-mono text-foreground">
              {command}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
