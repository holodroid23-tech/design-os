import type { ElevationTokens } from '@/types/product'

interface ElevationsDisplayProps {
  elevations: ElevationTokens
}

export function ElevationsDisplay({ elevations }: ElevationsDisplayProps) {
  // Handle both 'levels' and 'tokens' properties for backward compatibility
  const tokens = (elevations as any).tokens || (elevations as any).levels || {}
  const rules = (elevations as any).rules?.guidelines || elevations.rules || []
  
  return (
    <div className="space-y-8">
      {/* Elevation Levels */}
      <div>
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Shadow Levels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tokens).map(([key, level]: [string, any]) => (
            <div key={key} className="space-y-3">
              {/* Visual Example */}
              <div className="h-40 bg-stone-100 dark:bg-stone-900 rounded-lg flex items-center justify-center p-6">
                <div
                  className="w-full h-full bg-white dark:bg-stone-800 rounded-lg flex items-center justify-center"
                  style={{ boxShadow: level.value }}
                >
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {key}
                  </span>
                </div>
              </div>
              
              {/* Level Details */}
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                  {key}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-2">
                  {level.description}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-500 mb-2">
                  <span className="font-medium">Usage:</span> {level.usage}
                </p>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-500 break-all">
                  {level.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      {rules.length > 0 && (
        <div className="p-6 bg-lime-50 dark:bg-lime-950/20 rounded-lg border border-lime-200 dark:border-lime-900">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Shadow Rules
          </h3>
          <ul className="space-y-2">
            {rules.map((rule: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-sm text-stone-700 dark:text-stone-300">
                <span className="text-lime-600 dark:text-lime-400">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
