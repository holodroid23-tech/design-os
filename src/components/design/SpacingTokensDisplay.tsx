import type { SpacingTokens } from '@/types/product'

interface SpacingTokensDisplayProps {
  spacing: SpacingTokens
}

export function SpacingTokensDisplay({ spacing }: SpacingTokensDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Spacing Scale */}
      <div>
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Spacing Scale
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          Based on a {spacing.grid} base unit. All spacing values align to this grid for consistency.
        </p>
        <div className="space-y-3">
          {spacing.scale && Object.entries(spacing.scale).map(([key, token]: [string, any]) => (
            <div key={key} className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
              {/* Visual representation */}
              <div className="flex-shrink-0 w-32 flex items-center">
                <div
                  className="bg-lime-500 dark:bg-lime-400 h-8 rounded"
                  style={{ width: token.value }}
                />
              </div>
              
              {/* Token details */}
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    space-{key}
                  </span>
                  <span className="text-sm font-mono text-stone-700 dark:text-stone-300">
                    {token.value}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {token.description}
                </p>
                {token.usage && (
                  <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                    Usage: {token.usage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Sizes */}
      {spacing.recommendations?.sizes && (
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Component Sizes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(spacing.recommendations.sizes).map(([size, details]: [string, any]) => (
              <div key={size} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="bg-lime-500 dark:bg-lime-400 rounded"
                    style={{ width: details.value, height: details.value }}
                  />
                  <div>
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100 block">
                      {details.value}
                    </span>
                    {details.spacingReference && (
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {details.spacingReference}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-2">
                  {details.description}
                </p>
                {details.examples && (
                  <ul className="text-xs text-stone-500 dark:text-stone-500 space-y-1">
                    {details.examples.map((example: string, idx: number) => (
                      <li key={idx}>• {example}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Padding & Margins Recommendations */}
      {spacing.recommendations?.paddingsAndMargins && (
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Padding & Margin Recommendations
          </h3>
          <div className="space-y-3">
            {Object.entries(spacing.recommendations.paddingsAndMargins).map(([value, details]: [string, any]) => (
              <div key={value} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {details.value}
                  </span>
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    {details.description}
                  </span>
                </div>
                {details.examples && (
                  <ul className="text-xs text-stone-500 dark:text-stone-500 space-y-1">
                    {details.examples.map((example: string, idx: number) => (
                      <li key={idx}>• {example}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Optimizations */}
      {spacing.mobileOptimizations && (
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Mobile Optimizations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spacing.mobileOptimizations.contentPadding && (
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Content Padding
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                  {spacing.mobileOptimizations.contentPadding.description}
                </p>
                <ul className="text-xs text-stone-500 dark:text-stone-500 space-y-1">
                  <li>Portrait: {spacing.mobileOptimizations.contentPadding.portrait}</li>
                  <li>Landscape: {spacing.mobileOptimizations.contentPadding.landscape}</li>
                  <li>Tablet: {spacing.mobileOptimizations.contentPadding.tablet}</li>
                </ul>
              </div>
            )}
            
            {spacing.mobileOptimizations.touchTargets && (
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Touch Targets
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                  {spacing.mobileOptimizations.touchTargets.description}
                </p>
                <ul className="text-xs text-stone-500 dark:text-stone-500 space-y-1">
                  <li>Minimum: {spacing.mobileOptimizations.touchTargets.minimum}</li>
                  <li>Recommended: {spacing.mobileOptimizations.touchTargets.recommended}</li>
                </ul>
              </div>
            )}
            
            {spacing.mobileOptimizations.sectionSpacing && (
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Section Spacing
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                  {spacing.mobileOptimizations.sectionSpacing.description}
                </p>
                <ul className="text-xs text-stone-500 dark:text-stone-500 space-y-1">
                  <li>Small: {spacing.mobileOptimizations.sectionSpacing.small}</li>
                  <li>Medium: {spacing.mobileOptimizations.sectionSpacing.medium}</li>
                  <li>Large: {spacing.mobileOptimizations.sectionSpacing.large}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
