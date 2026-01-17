import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { ComprehensiveColorSystem } from '@/types/product'

interface ColorTokensDisplayProps {
  colors: ComprehensiveColorSystem
}

export function ColorTokensDisplay({ colors }: ColorTokensDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Semantic Colors */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Semantic Colors
        </h3>
        <div className="space-y-4">
          {Object.entries(colors.semantic).map(([category, tokens]) => (
            <ColorCategory key={category} category={category} tokens={tokens as Record<string, string>} />
          ))}
        </div>
      </div>

      {/* Primitive Colors */}
      {colors.primitives && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Primitive Colors
          </h3>
          <div className="space-y-4">
            {colors.primitives.neutrals && (
              <div>
                <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Neutrals</h4>
                <div className="space-y-2">
                  {Object.entries(colors.primitives.neutrals).map(([name, shades]) => (
                    <PrimitiveColorScale key={name} name={name} shades={shades as Record<string, string>} />
                  ))}
                </div>
              </div>
            )}
            {colors.primitives.hues && (
              <div>
                <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Hues</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(colors.primitives.hues).map(([name, shades]) => (
                    <PrimitiveColorScale key={name} name={name} shades={shades as Record<string, string>} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gradients */}
      {colors.gradients && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Gradients
          </h3>
          <div className="space-y-4">
            {Object.entries(colors.gradients).map(([category, gradients]) => (
              <GradientCategory key={category} category={category} gradients={gradients as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ColorCategory({ category, tokens }: { category: string; tokens: Record<string, string> }) {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 bg-muted rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
        <span className="text-sm font-medium text-foreground capitalize">
          {category.replace(/([A-Z])/g, ' $1').trim()}
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Object.entries(tokens).map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="group">
      <div
        className="w-full h-16 rounded-md border border shadow-sm"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="mt-1.5">
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    </div>
  )
}

function PrimitiveColorScale({ name, shades }: { name: string; shades: Record<string, string> }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 bg-stone-50 dark:bg-stone-800/50 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
        <span className="text-sm font-medium text-foreground capitalize">{name}</span>
        <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div className="flex gap-1">
          {Object.entries(shades).map(([shade, value]) => (
            <div key={shade} className="flex-1 group relative">
              <div
                className="w-full h-12 border border"
                style={{ backgroundColor: value }}
                title={`${name}-${shade}: ${value}`}
              />
              <div className="text-center mt-1">
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function GradientCategory({ category, gradients }: { category: string; gradients: any }) {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 bg-muted rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
        <span className="text-sm font-medium text-foreground capitalize">{category}</span>
        <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(gradients).map(([name, gradient]: [string, any]) => {
            if (!gradient.stops) return null
            const gradientStops = gradient.stops
              .map((stop: any) => `${stop.color} ${stop.position}%`)
              .join(', ')
            const gradientStyle = `linear-gradient(135deg, ${gradientStops})`
            
            return (
              <div key={name} className="group">
                <div
                  className="w-full h-16 rounded-md border border shadow-sm"
                  style={{ background: gradientStyle }}
                  title={name}
                />
                <div className="mt-1.5">
                  <p className="text-xs font-medium text-foreground">{name}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
