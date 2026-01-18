import type { RadiusTokens } from '@/types/product'

interface RadiusTokensDisplayProps {
  radius: RadiusTokens
}

export function RadiusTokensDisplay({ radius }: RadiusTokensDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Radius Values */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Border Radius Values
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {radius.variables && Object.entries(radius.variables).map(([key, token]: [string, any]) => (
            <div key={key} className="p-4 bg-card rounded-lg border">
              {/* Visual Example */}
              <div className="mb-4 flex items-center justify-center h-24 bg-muted rounded-lg">
                <div
                  className="w-20 h-20 bg-lime-500 dark:bg-lime-400"
                  style={{ borderRadius: token.value }}
                />
              </div>
              
              {/* Token Details */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {key}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground">
                    {token.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {token.description}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  <span className="font-medium">Usage:</span> {token.usage}
                </p>
                {token.spacingReference && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Spacing:</span> {token.spacingReference}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hierarchy Principle */}
      {radius.hierarchy && (
        <div className="p-6 bg-lime-50 dark:bg-lime-950/20 rounded-lg border border-lime-200 dark:border-lime-900">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Hierarchy Principle
          </h3>
          <p className="text-sm text-foreground mb-2">
            {radius.hierarchy.description}
          </p>
          <p className="text-sm font-medium text-lime-700 dark:text-lime-400">
            {radius.hierarchy.principle}
          </p>
        </div>
      )}

      {/* Correlation with Spacing */}
      {radius.correlation && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Correlation with Spacing
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {radius.correlation.description}
          </p>
          <div className="space-y-2">
            {Object.entries(radius.correlation.relationships || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <span className="text-sm font-medium text-foreground capitalize w-20">
                  {key}
                </span>
                <span className="text-sm text-muted-foreground">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
