import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import type { ParsedSpec } from '@/types/section'

interface SpecCardProps {
  spec: ParsedSpec | null
  rawContent?: string | null
  sectionTitle?: string
}

export function SpecCard({ spec, rawContent, sectionTitle }: SpecCardProps) {
  const [userFlowsOpen, setUserFlowsOpen] = useState(false)
  const [uiReqOpen, setUiReqOpen] = useState(false)

  // Empty state
  if (!spec && !rawContent) {
    return <EmptyState type="spec" />
  }

  // If rawContent is provided and we want to display "as is"
  if (rawContent) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            {sectionTitle || 'Section Specification'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-none space-y-1">
            {rawContent.split('\n').map((line, i) => {
              const trimmed = line.trim()
              if (trimmed.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-bold mb-4 mt-6 first:mt-0 text-foreground">{trimmed.replace('# ', '')}</h1>
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-semibold mb-3 mt-6 text-foreground">{trimmed.replace('## ', '')}</h2>
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-semibold mb-2 mt-4 text-foreground">{trimmed.replace('### ', '')}</h3>
              }
              if (trimmed.startsWith('- ')) {
                return (
                  <div key={i} className="flex items-start gap-2 py-0.5 ml-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span className="text-sm text-foreground">{trimmed.replace('- ', '')}</span>
                  </div>
                )
              }
              if (!trimmed) return <div key={i} className="h-2" />
              return <p key={i} className="text-sm text-foreground leading-relaxed">{line}</p>
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

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
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span className="text-foreground text-sm">
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
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span className="text-foreground text-sm">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}
