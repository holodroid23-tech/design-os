import { Card } from './ui/card'
import { componentExamplesInventoryGroups } from '@/components/patterns/component-examples/inventory'
import { componentExamplesRegistry } from '@/components/patterns/component-examples/registry'

interface ComponentExamplesProps {
  showHeader?: boolean
}

function SectionWrapper({ children, file, name }: { children: React.ReactNode, file: string, name: string }) {
  return (
    <div className="relative group">
      <div className='absolute right-4 top-2 z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity'>
        <code className='text-[10px] text-muted-foreground bg-background/50 backdrop-blur px-1.5 py-0.5 rounded border shadow-sm'>
          {file} • {name}
        </code>
      </div>
      {children}
    </div>
  )
}

export function ComponentExamples({ showHeader = true }: ComponentExamplesProps) {
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Component Examples
          </h2>
          <p className="text-muted-foreground">
            Comprehensive UI components optimized for mobile and desktop
          </p>
        </div>
      )}

      {componentExamplesInventoryGroups.map((group) => (
        <div key={group.id} id={`component-group-${group.id}`} className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
              {group.description && (
                <p className="text-sm text-muted-foreground">{group.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {group.items.map((item) => {
              const Component = componentExamplesRegistry[item.component]
              const [filePath, exportNameRaw] = item.component.split('#')
              const file = (filePath ?? '').split('/').pop() ?? filePath ?? 'unknown'
              const name = exportNameRaw ?? 'unknown'

              if (!Component) {
                return (
                  <SectionWrapper key={item.id} file={file} name={name}>
                    <Card id={item.id} className="border shadow-sm">
                      <div className="p-6">
                        <div className="text-sm font-medium text-foreground">Missing component</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Inventory entry <code className="font-mono text-xs">{item.component}</code> has no registry mapping.
                        </div>
                      </div>
                    </Card>
                  </SectionWrapper>
                )
              }

              return (
                <SectionWrapper key={item.id} file={file} name={name}>
                  <Component />
                </SectionWrapper>
              )
            })}
          </div>
        </div>
      ))}
    </div >
  )
}
