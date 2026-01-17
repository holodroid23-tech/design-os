import type { ComprehensiveTypographySystem } from '@/types/product'

interface TypographyTokensDisplayProps {
  typography: ComprehensiveTypographySystem
}

export function TypographyTokensDisplay({ typography }: TypographyTokensDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Type Faces */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Typefaces
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {typography.typefaces && (
            <>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  {typography.typefaces.main.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {typography.typefaces.main.description}
                </p>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-500">
                  {typography.typefaces.main.fallback}
                </p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border">
                <h4 className="text-sm font-medium text-foreground mb-2 font-mono">
                  {typography.typefaces.code.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {typography.typefaces.code.description}
                </p>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-500">
                  {typography.typefaces.code.fallback}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Typography Styles */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Typography Styles
        </h3>
        <div className="space-y-6">
          {typography.styles && Object.entries(typography.styles).map(([styleName, style]: [string, any]) => (
            <div key={styleName} className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border">
              {/* Style Name and Specs */}
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border">
                <h4 className="text-sm font-medium text-foreground uppercase tracking-wide">
                  {styleName}
                </h4>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{style.fontSize} / {style.lineHeight}</span>
                  <span>Weight: {style.fontWeight}</span>
                  {style.letterSpacing && style.letterSpacing !== '0' && (
                    <span>Tracking: {style.letterSpacing}</span>
                  )}
                </div>
              </div>

              {/* Live Preview */}
              <div className="mb-4">
                <p
                  className="text-foreground"
                  style={{
                    fontSize: style.fontSize,
                    lineHeight: style.lineHeight,
                    fontWeight: style.fontWeight,
                    letterSpacing: style.letterSpacing,
                    fontFamily: style.fontFamily,
                  }}
                >
                  {style.example}
                </p>
              </div>

              {/* Usage */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Description:</span> {style.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Usage:</span> {style.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Colors */}
      {typography.colors && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Type Colors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(typography.colors.dark || {}).map(([name, color]: [string, any]) => (
              <div key={name} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded border border"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-sm font-medium text-foreground capitalize">
                    {name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {color.description}
                </p>
                <p className="text-xs font-mono text-stone-500 dark:text-stone-500">
                  {color.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
