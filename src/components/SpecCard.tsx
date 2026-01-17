import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, PanelTop, Square } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import type { ParsedSpec } from '@/types/section'

interface SpecCardProps {
  spec: ParsedSpec | null
  sectionTitle?: string
}

export function SpecCard({ spec, sectionTitle }: SpecCardProps) {
  const [userFlowsOpen, setUserFlowsOpen] = useState(false)
  const [uiReqOpen, setUiReqOpen] = useState(false)

  // Empty state
  if (!spec) {
    return <EmptyState type="spec" />
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          {sectionTitle || 'Specification'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overview */}
        {spec.overview && (
          <p className="text-muted-foreground leading-relaxed">
            {spec.overview}
          </p>
        )}

        {/* User Flows - Expandable */}
        {spec.userFlows.length > 0 && (
          <Collapsible open={userFlowsOpen} onOpenChange={setUserFlowsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left group">
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                User Flows
                <span className="ml-2 text-muted-foreground normal-case tracking-normal">
                  ({spec.userFlows.length})
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  userFlowsOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={1.5}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-2 pt-2">
                {spec.userFlows.map((flow, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {flow}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* UI Requirements - Expandable */}
        {spec.uiRequirements.length > 0 && (
          <Collapsible open={uiReqOpen} onOpenChange={setUiReqOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left group">
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                UI Requirements
                <span className="ml-2 text-muted-foreground normal-case tracking-normal">
                  ({spec.uiRequirements.length})
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  uiReqOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={1.5}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-2 pt-2">
                {spec.uiRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Display Configuration */}
        <div className="flex items-center gap-2 pt-2 border-t">
          {spec.useShell ? (
            <>
              <PanelTop className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">
                Displays inside app shell
              </span>
            </>
          ) : (
            <>
              <Square className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">
                Standalone page (no shell)
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
