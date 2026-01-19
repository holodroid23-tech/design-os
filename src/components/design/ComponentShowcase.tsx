import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// Import the comprehensive component examples
import { ComponentExamples } from '@/components/ComponentExamples'
import { componentExamplesInventoryGroups } from '@/components/patterns/component-examples/inventory'

export function ComponentShowcase() {
  function scrollToId(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Component Library
        </h3>
        <p className="text-sm text-muted-foreground">
          Interactive examples of all UI components in the ComPOSt Design System.
          All components are fully interactive and support dark mode.
        </p>
      </div>

      <div>
        {/* Design preview */}
        <ComponentShowcaseSection title="Design preview">
          <ComponentExamples showHeader={false} />
        </ComponentShowcaseSection>

        {/* Design library nav
            - Below preview on smaller screens
            - Floats OUTSIDE the main content box on wide screens
         */}
        <aside className="mt-6 min-[1200px]:mt-0 min-[1200px]:fixed min-[1200px]:top-24 min-[1200px]:left-[calc(50%+24rem+24px)] min-[1200px]:w-[280px] min-[1200px]:z-10">
          <div className="space-y-3">
            <div>
              <div className="text-sm font-semibold text-foreground">Design library</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Grouped navigation (mirrors preview)
              </div>
            </div>

            <div className="rounded-md border bg-card p-2 max-h-[70vh] overflow-auto min-[1200px]:max-h-[calc(100vh-7rem)]">
              <div className="space-y-2">
                {componentExamplesInventoryGroups.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-md border border-transparent hover:border-border/60 hover:bg-muted/30 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToId(`component-group-${group.id}`)}
                      className="w-full text-left px-3 py-2"
                    >
                      <div className="text-sm font-medium text-foreground">{group.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {group.items.length} item{group.items.length === 1 ? '' : 's'}
                      </div>
                    </button>

                    <div className="px-2 pb-2">
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToId(item.id)}
                            className="w-full text-left rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

interface ComponentShowcaseSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function ComponentShowcaseSection({ 
  title, 
  children, 
  defaultOpen = true 
}: ComponentShowcaseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-md hover:bg-accent transition-colors">
        <span className="text-base font-semibold text-foreground">
          {title}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-6">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
