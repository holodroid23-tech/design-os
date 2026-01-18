export function ImplementationGuide() {
  return (
    <div className="max-w-4xl space-y-8">
      {/* Critical Notice */}
      <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border-2 border-red-200 dark:border-red-900">
        <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
          CRITICAL: Implementation Rules
        </h2>
        <p className="text-sm text-red-800 dark:text-red-200 mb-4">
          This guide ensures all design system rules are properly applied during implementation. 
          <strong> READ THIS FIRST</strong> before starting any component development.
        </p>
        <p className="text-sm text-red-800 dark:text-red-200">
          <strong>Violating these rules will result in inconsistent UI.</strong> Always reference the design system JSON files.
        </p>
      </div>

      {/* Quick Reference */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Reference - Design System Rules
        </h2>
        <div className="space-y-2">
          {quickRules.map((rule, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-card rounded-lg border">
              <span className="text-sm font-semibold text-lime-600 dark:text-lime-400 flex-shrink-0">
                {idx + 1}.
              </span>
              <p className="text-sm text-foreground">
                <strong>{rule.title}:</strong> {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Design System Rules Summary */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Design System Rules Summary
        </h2>
        <div className="space-y-6">
          {designSystemRules.map((section, idx) => (
            <div key={idx} className="p-5 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.rules.map((rule, ruleIdx) => (
                  <li key={ruleIdx} className="flex gap-2 text-sm text-foreground">
                    <span className="text-lime-600 dark:text-lime-400">•</span>
                    <span>
                      <strong>{rule.label}:</strong> {rule.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Form Validation */}
      <div className="p-6 bg-lime-50 dark:bg-lime-950/20 rounded-lg border border-lime-200 dark:border-lime-900">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Form Validation & Disabled States
        </h2>
        <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900 mb-4">
          <p className="text-sm font-semibold text-red-900 dark:text-red-100">
            CRITICAL RULE: Never disable action buttons for validation purposes.
          </p>
        </div>
        <p className="text-sm text-foreground mb-4">
          Disabled buttons create poor user experience, especially on mobile devices where tooltips don't work 
          and users can't understand what's wrong without clear feedback.
        </p>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Instead, follow this pattern:
          </h4>
          {validationPattern.map((step, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-card rounded-md border">
              <span className="text-sm font-semibold text-lime-600 dark:text-lime-400 flex-shrink-0">
                {idx + 1}.
              </span>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {step.details && (
                  <ul className="mt-2 space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-muted-foreground ml-3">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DO and DON'T */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
            <span>✓</span> DO
          </h3>
          <ul className="space-y-2">
            {doRules.map((rule, idx) => (
              <li key={idx} className="text-sm text-green-800 dark:text-green-200 flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
            <span>✗</span> DON'T
          </h3>
          <ul className="space-y-2">
            {dontRules.map((rule, idx) => (
              <li key={idx} className="text-sm text-red-800 dark:text-red-200 flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Implementation Checklist */}
      <div className="p-6 bg-lime-50 dark:bg-lime-950/20 rounded-lg border border-lime-200 dark:border-lime-900">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Component Development Checklist
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          When building any component, verify:
        </p>
        <div className="space-y-2">
          {checklist.map((item, idx) => (
            <label key={idx} className="flex items-start gap-3 p-2 hover:bg-accent rounded cursor-pointer">
              <input type="checkbox" className="mt-0.5" />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-muted rounded-lg border border">
        <p className="text-xs text-muted-foreground text-center">
          For complete implementation details and code examples, refer to the full implementation guide at 
          <code className="mx-1 px-1.5 py-0.5 bg-background rounded text-foreground">
            product/implementation-guide.md
          </code>
        </p>
      </div>
    </div>
  )
}

// Data constants
const quickRules = [
  { title: 'Spacing', description: 'Always use spacing scale (space-1 through space-13). Never use arbitrary values like p-5, m-7.' },
  { title: 'Radius', description: 'Use only: 3px (3px), small (6px), medium (12px), large (18px), full (50%), pill (1998px)' },
  { title: 'Colors', description: 'Use semantic color names from colors.json. Never hardcode hex values.' },
  { title: 'Typography', description: 'Use exact sizes from typography.json (H1: 28px, H2: 22px, Regular: 16px, etc.)' },
  { title: 'Component Sizes', description: '42px (compact), 48px (default), 54px (large), 60px (bars)' },
  { title: 'Touch Targets', description: 'Minimum 48px for all interactive elements' },
  { title: 'Dark Mode Only', description: 'All components designed for dark mode' },
  { title: '6px Grid', description: 'All spacing and sizes align with 6px base unit' },
  { title: 'Form Validation', description: 'Never disable action buttons. Always allow submission and show errors with highlighting and auto-scroll' },
  { title: 'Elevations', description: 'Use standardized shadow tokens: shadow-xs, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl' },
]

const designSystemRules = [
  {
    title: 'Colors',
    rules: [
      { label: 'Source', value: 'product/design-system/colors.json' },
      { label: 'System', value: 'ComPOSt Design System (comprehensive semantic colors)' },
      { label: 'Mode', value: 'Dark mode only' },
      { label: 'Usage', value: 'Use semantic color names (e.g., layer-level-0, on-layer-primary, border-primary)' },
    ]
  },
  {
    title: 'Typography',
    rules: [
      { label: 'Source', value: 'product/design-system/typography.json' },
      { label: 'Fonts', value: 'System fonts (SF Pro on iOS, Roboto on Android, system-ui on web)' },
      { label: 'Styles', value: 'H1 (28px), H2 (22px), H3 (18px), H4 (14px uppercase), Regular (16px), Small (14px), Support Small (12px)' },
      { label: 'Weights', value: 'Regular (400), Semibold (600)' },
    ]
  },
  {
    title: 'Spacing',
    rules: [
      { label: 'Source', value: 'product/design-system/spacing.json' },
      { label: 'Grid', value: '6px base unit' },
      { label: 'Scale', value: 'space-1 (3px) through space-13 (120px)' },
      { label: 'Component Sizes', value: '42px (compact), 48px (default), 54px (large), 60px (bars)' },
    ]
  },
  {
    title: 'Radius',
    rules: [
      { label: 'Source', value: 'product/design-system/radius.json' },
      { label: 'Values', value: '3px, Small (6px), Medium (12px), Large (18px), Full (50%), Pill (1998px)' },
      { label: 'Correlation', value: 'Matches spacing grid (small=space-2, medium=space-4, large=space-5)' },
    ]
  },
  {
    title: 'Elevations & Shadows',
    rules: [
      { label: 'Source', value: 'product/design-system/elevations.json' },
      { label: 'Levels', value: 'shadow-sm (default), shadow-md (hover), shadow-lg (revealed), shadow-xl (floating)' },
      { label: 'Pressed States', value: 'Use shadow-inner for active/pressed states' },
    ]
  },
]

const validationPattern = [
  {
    title: 'Always allow submission',
    description: 'Action buttons remain enabled at all times',
  },
  {
    title: 'Show errors on submit',
    description: 'When user clicks submit with invalid data:',
    details: [
      'Highlight fields with errors using error border colors',
      'Display clear error messages below or near the problematic fields',
      'Use error text colors from the design system',
    ]
  },
  {
    title: 'Auto-scroll to errors',
    description: 'If error fields are off-screen:',
    details: [
      'Automatically scroll to the first error field',
      'Ensure the error message is fully visible',
      'Provide smooth scrolling animation',
    ]
  },
  {
    title: 'Real-time feedback (optional)',
    description: 'For better UX, show validation feedback as user types:',
    details: [
      'Show success states for valid fields',
      'Show error states only after user attempts to submit or leaves the field',
      'Use subtle visual indicators (border colors, icons)',
    ]
  },
]

const doRules = [
  'Use design system spacing values (space-2, space-4, etc.)',
  'Use design system radius values (small, medium, large)',
  'Use semantic color names from colors.json',
  'Apply exact typography sizes and weights',
  'Follow the 6px spacing grid',
  'Use 48px as default component height',
  'Correlate radius with spacing (small=space-2, medium=space-4)',
]

const dontRules = [
  'Use arbitrary spacing values (e.g., p-5, m-7) - use spacing scale',
  'Use arbitrary radius values - use design system radius',
  'Hardcode colors - use semantic color tokens',
  'Use custom fonts - use system fonts',
  'Mix light/dark mode - dark mode only',
  'Ignore touch target sizes - minimum 48px for interactive elements',
  'Replicate mockup artifacts like capitalization blindly',
]

const checklist = [
  'Uses design system spacing (space-2, space-4, etc.) - NO arbitrary values',
  'Uses design system radius (small, medium, large) - NO arbitrary values',
  'Uses semantic colors (layer-level-*, on-layer-*, etc.) - NO hardcoded hex',
  'Uses typography styles from typography.json - exact sizes and weights',
  'Component height matches design system (42px, 48px, 54px, or 60px)',
  'Meets minimum touch target (48px for interactive elements)',
  'Follows 6px spacing grid (all values are multiples of 6px)',
  'Dark mode compatible (uses dark mode colors)',
  'Props-based (no direct data imports)',
  'TypeScript types defined',
  'Adheres to Design System aesthetics, overriding mockup artifacts',
]
