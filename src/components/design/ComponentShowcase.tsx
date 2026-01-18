import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// Import the comprehensive component examples
import { ComponentExamples } from '@/components/ComponentExamples'

export function ComponentShowcase() {
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

      {/* Render all component examples */}
      <ComponentShowcaseSection title="All Components">
        <ComponentExamples />
      </ComponentShowcaseSection>
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
