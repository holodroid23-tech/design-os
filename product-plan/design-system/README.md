# ComPOSt Design System

This design system provides a comprehensive color palette, design rules, and guidelines for consistent UI design.

## Overview

The ComPOSt Design System uses a structured approach to color that ensures consistency, accessibility, and clear visual hierarchy across all applications.

### Key Principles

1. **Purpose-Driven**: Each color has a specific meaning and use case
2. **Accessibility-First**: All colors meet contrast requirements for readability
3. **Dark Mode Only**: Optimized for low-light environments (POS usage)
4. **Layered Architecture**: Colors are organized into semantic layers for depth and hierarchy

## Color System Structure

### Semantic Colors

Semantic colors are organized by their purpose in the UI:

#### Layer Colors
Background colors for containers, pages, and surfaces. Organized in levels (0-3) that create visual hierarchy.

- **Level 0**: Default page and dialog background
- **Level 1**: Default container background on layer 0
- **Level 2**: Container background on layer 1
- **Level 3**: Container background on layer 1

Special layer colors:
- **Hover/Active**: Interactive states
- **Info/Warning/Danger/Success/Recent**: Contextual backgrounds
- **Main Navigation**: Reserved for main navigation
- **Highlight**: Text highlighting
- **Transparent**: Transparent overlay

#### On-Layer Colors
Text and icon colors that appear on top of layers:

- **Primary**: Main text color
- **Secondary**: Secondary text color
- **Tertiary**: Placeholder and tertiary text
- **Inverse**: Text on high contrast backgrounds
- **Interactive**: Interactive elements
- **Warning/Danger/Success/Recent**: Status colors

#### Border Colors
Border colors for containers, inputs, and dividers:

- **Primary/Secondary**: Standard borders
- **Inverse**: Borders on high contrast backgrounds
- **Info/Warning/Danger/Success/Recent**: Contextual borders (with emphasis variants)
- **Focus Ring**: Focus states for inputs and interactive elements

- **Primary**: Main action buttons (#148134) - **Use white text for readability**
- **Light/Ghost/Invisible/Inverse**: Secondary button styles
- **Request/Danger/Purchase**: Special purpose buttons
- **Hover/Active variants**: Interactive states

#### Link Colors
Link colors for navigation and references:

- **Primary/Secondary/Tertiary**: Link hierarchy
- **Inverse**: Links on high contrast backgrounds
- **Visited**: Visited link state

#### Additional Semantic Categories

- **Overlay**: Modal and dialog overlays
- **Tooltip**: Tooltip and snackbar backgrounds
- **Table**: Table row colors and hover states
- **Platform**: Brand colors for social platforms
- **Chart**: Data visualization colors
- **Operator**: Search and filter operator colors
- **Sentiment**: Sentiment analysis colors
- **Grade**: Performance grade colors
- **Approval Flow**: Workflow stage colors
- **Scrollbar**: Scrollbar styling
- **Brand**: Brand colors
- **AI**: AI feature colors
- **Message**: Chat message colors
- **Loader**: Loading indicator colors
- **Shadow**: Shadow and elevation colors

### Primitive Colors

Primitive colors are the foundational color ramps that semantic colors are built from.

#### Neutrals
- **White**: 0-100 scale (opacity-based)
- **Black**: 0-100 scale (opacity-based)
- **Gray**: 10-120 scale (solid colors)

#### Hues
Full color ramps (5-100 scale) for:
- Red, Orange, Yellow, Pear, Lime
- Green, Teal, Ocean, Sky, Blue
- Indigo, Violet, Fuchsia, Pink
- Sand, Brown

### Gradients

Pre-defined gradients for:
- **AI**: AI feature gradients (teal to purple)
- **Avatar**: User avatar gradients in multiple colors
  - indigo, blue, cyan, teal, emerald, lime, yellow, orange, red, pink, purple, brown, gray, chatbot
  - All gradients use 180deg linear direction (top to bottom)
  - Each gradient defined with start and end color stops
- **Button**: Button gradient states (hover, active)

#### Avatar Gradient Colors

All avatar gradients follow a consistent pattern with defined colors from the hue primitives:

- **indigo**: `#6666ff` → `#291a98`
- **blue**: `#2f79ff` → `#103a9f`
- **cyan**: `#00bcd4` → `#006064`
- **teal**: `#05c7bb` → `#0e5352`
- **emerald**: `#20c54f` → `#135428`
- **lime**: `#84cc16` → `#365314`
- **yellow**: `#f5a017` → `#c46512`
- **orange**: `#ff5a1f` → `#7f1c0f`
- **red**: `#ed4646` → `#7e1e1e`
- **pink**: `#ec4899` → `#831843`
- **purple**: `#9c27b0` → `#4a148c`
- **brown**: `#795548` → `#442c28`
- **gray**: `#9f9f9f` → `#575757`
- **chatbot**: `#1a91ff` → `#263dec`

These gradients are defined in `colors.json` under `gradients.avatar` and should be referenced from there rather than hardcoded.

## Typography System

The typography system uses native system fonts for optimal performance and platform consistency, adapted for dark mode.

### Typefaces

#### Main Typeface: System Font
- **Platform**: Uses native system fonts
  - **iOS**: SF Pro
  - **Android**: Roboto
  - **Web**: system-ui
- **Fallback**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Description**: Native system fonts are optimized for each platform, provide better performance, and feel familiar to users

#### Code Typeface: System Monospace
- **Platform**: Uses native system monospace fonts
  - **iOS**: SF Mono
  - **Android**: Roboto Mono
  - **Web**: ui-monospace
- **Fallback**: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace`
- **Description**: Native system monospace fonts for code, tables, and technical content

### Typography Styles

#### Headlines

- **H1** (28px/36px, 600): Main page title - primary heading, one per page
- **H2** (22px/30px, 600): Section heading - secondary heading for major sections
- **H3** (18px/26px, 600): Subsection heading - tertiary heading for subsections
- **H4** (14px/20px, 600, uppercase): Small uppercase heading - labels, categories, small section headers

#### Body Text

- **Regular** (16px/24px, 400): Default paragraph and body text
- **Regular Semibold** (16px/24px, 600): Emphasized body text
- **Small** (14px/20px, 400): Secondary information, captions
- **Small Semibold** (14px/20px, 600): Emphasized small text

#### Support Text

- **Support Small** (12px/16px, 400): Helper text, metadata, fine print
- **Support Small Semibold** (12px/16px, 600): Emphasized helper text, labels

### Type Colors (Dark Mode)

The choice of type color should prioritize legibility and accessibility above all else:

- **Primary** (#f9f9fa): Main text color - default for most UI text (primary content, headings, body text)
- **Secondary** (#b5b5b7): Secondary text color - supplemental texts (metadata, captions, less important information)
- **Tertiary** (#6d6d71): Tertiary text color - placeholder and subtle text (placeholders, hints, disabled states)
- **Interactive** (#148134): Interactive elements - hyperlinks and primary actions (links, primary action text)
- **Success** (#15a43e): Positive confirmations and success messages
- **Warning** (#e1ab11): Warnings and alerts
- **Danger** (#da2828): Negative confirmations and errors

### Usage Guidelines

1. **Hierarchy**: Follow predefined styles to create clear user expectations about hierarchy
2. **One H1 per page**: Use only one H1 style per page
3. **Color consistency**: Use semantic type colors that match the design system
4. **Accessibility**: All text/color combinations meet WCAG standards for contrast
5. **Native fonts**: System fonts are automatically used - no font files needed, better performance

## Radius System

The radius system defines border radius values for rounded corners, optimized for mobile app use.

### Radius Variables

- **3px**: Extra small radius for tiny components like checkboxes
  - *Correlates with: spacing-1 (3px) - tight spacing unit*
  - Usage: Checkboxes, small indicators

- **Small** (6px): Use to soften corners of areas you don't want to look like cards or boxes
  - *Correlates with: spacing-2 (6px) - primary spacing unit*
  - Usage: Small elements, subtle rounding

- **Medium** (12px): Default radius for most elements
  - *Correlates with: spacing-4 (12px) - standard spacing*
  - Usage: Default for buttons, cards, inputs, and most UI elements

- **Large** (18px): Use when an element is used as a Container for other elements
  - *Correlates with: spacing-5 (18px) - medium spacing*
  - Usage: Container elements, cards that wrap content, modals

- **Full** (50%): Use to create a circle
  - Usage: Circular avatars, icons, badges

- **Pill** (1998px): Use to create a pill-like shape with rounded ends
  - Usage: Pill-shaped buttons, tags, badges with rounded ends

### Hierarchy Principle

The purpose of radius rules is to highlight the container nesting level visually – the more the container envelops, the bigger its radius. This serves as a general guideline rather than a strict rule.

**Principle**: Higher nesting level = larger radius

### Correlation with Spacing

Radius values are mathematically correlated with the spacing scale for design system consistency:
- **Small** (6px) = spacing-2 - primary spacing unit
- **Medium** (12px) = spacing-4 - standard spacing
- **Large** (18px) = spacing-5 - medium spacing

This correlation ensures visual harmony and makes the design system easier to remember and maintain.

### Usage

#### Web
```css
--border-radius-small: 4px;
--border-radius-medium: 12px;
--border-radius-large: 16px;
--border-radius-full: 50%;
--border-radius-pill: 1998px;
```

#### Native Apps
- **iOS**: Use CGFloat values (e.g., `12.0`)
- **Android**: Use dp values (e.g., `12dp`)

## Spacing System

The spacing system defines spacing values for padding, margins, and component sizes, optimized for mobile app use.

### Spacing Scale

The spacing scale provides incremental values from 3px to 120px:

- **Space 1** (3px): Reserved for smaller components (Input, Select, Button) - not recommended for general spacing
- **Space 2** (6px): Primary and default space unit - standard space between logically associated elements
- **Space 3** (9px): Reserved for smaller components - not recommended for general spacing
- **Space 4** (12px): Standard space between associated and unassociated elements
- **Space 5** (18px): Medium spacing between elements
- **Space 6** (24px): Standard space between form elements; default app content padding for mobile
- **Space 7** (30px): Larger spacing for separation
- **Space 8** (36px): Standard space for empty states; default app content padding for tablets
- **Space 9** (48px): Large spacing for emphasis
- **Space 10** (60px): Standard height of bars (app header, bulk action bars)
- **Space 11** (72px): Standard space below empty state in panels
- **Space 12** (96px): Very large spacing for hero sections
- **Space 13** (120px): Maximum spacing for special cases

### Recommendations

#### Paddings and Margins

- **6px**: Standard space between logically associated elements
  - Multiple buttons, checkbox and label, tooltip and button/icon, icon and text

- **12px**: Standard space between associated and unassociated elements
  - Inside of a tooltip, horizontal spacing between buttons

- **24px**: Standard space between form elements
  - Form elements like inputs and selects
  - Default app content padding for mobile (portrait)

- **36px**: Standard space for empty states
  - Empty states
  - Default app content padding for tablets and larger screens

- **72px**: Standard space below empty state
  - Bottom padding for content where there is a 'Go to up' button

#### Sizes

All component sizes are aligned with the 6px spacing grid for design system consistency:

- **30px**: Small avatar size (default)
  - *Correlates with: 5 × 6px grid units*
  - Default avatar size for most interfaces
  - Aligned with 6px grid for consistency

- **42px**: Large avatar size
  - *Correlates with: 7 × 6px grid units*
  - Larger avatar for emphasis (user profiles, settings)
  - Aligned with 6px grid and compact touch target size

- **48px**: Default size of buttons, inputs, and other interactive elements
  - *Correlates with: space-9 (48px) - 8 × 6px grid units*
  - Primary buttons, text inputs, select fields, standard touch targets
  - Meets both iOS (44pt) and Android (48dp) minimum touch target requirements
  - **Recommended default** for all interactive elements

- **54px**: Bigger size for prominent CTAs and important actions
  - *Correlates with: 9 × 6px grid units*
  - Prominent CTAs, request buttons, important actions
  - Enhanced touch target for better accessibility and emphasis

- **60px**: Standard height of bars
  - *Correlates with: space-10 (60px) - 10 × 6px grid units*
  - App header, navigation bars, bulk action bars
  - Standard bar height for mobile apps

### Mobile Optimizations

- **Content Padding**: 24px for mobile (portrait/landscape), 36px for tablets
- **Touch Targets**: Minimum 44px (iOS) / 48px (Android) for interactive elements
- **Section Spacing**: 24px (small), 36px (medium), 48px (large) between major sections

### Usage

#### Web
```css
--space-1: 3px;
--space-2: 6px;
--space-3: 9px;
/* ... */
--space-13: 120px;
```

#### Native Apps
- **iOS**: Use CGFloat values (e.g., `6.0`)
- **Android**: Use dp values (e.g., `6dp`)

## Design Rules

### Icons

- **Stroke-based only**: Never use fill-based icons (e.g., FontAwesome Solid).
- **Library**: Use **Lucide React** (standard stroke-based library).
- **Styling**: Do not use `fill` attributes on icons. Use `className="text-..."` or `stroke` for coloring.

### Modes
 
 #### Dark Mode
- Base: Gray 110 (#111114)
- Background layers: Gray 120-90
- Text/Icons: Gray 10, 70, 80

### Layering

#### Light Mode Layering
Layers alternate between grays and white with each added layer, creating a subtle depth effect.

#### Dark Mode Layering
Layers become progressively lighter with each added layer, maintaining contrast in dark environments.

### Accessibility

- **Consistent Contrast**: Each color role maintains consistent contrast ratios
- **Legibility**: All text/color combinations meet WCAG standards
- **Color Relationships**: Semantic relationships ensure colors work together harmoniously

### Purpose Guidelines

1. **Each color has a specific meaning**:
   - Red = Danger/Error
   - Green = Success
   - Purple = News/Offers
   - Yellow = Warning

2. **Color as decoration is exclusive to illustrations** - UI elements use color purposefully

3. **Status colors are consistent** across all components

## Usage

### In Components

When using this design system in components:

1. **Use semantic colors** for UI elements (layer, onLayer, border, button, etc.)
2. **Use primitive colors** only when building custom components that need specific shades
3. **Respect mode** - always provide both light and dark variants
4. **Follow layering rules** - use appropriate layer levels for nested containers

### CSS Custom Properties

The design system can generate CSS custom properties matching the system's naming convention:

```css
:root {
  --color-layer-level-0: #f3f3f5;
  --color-on-layer-primary: #24242b;
  /* ... */
}

.dark {
  --color-layer-level-0: #111114;
  --color-on-layer-primary: #f9f9fa;
  --color-button-primary: #15a43e;
  /* ... */
}
```

### TypeScript Types

The design system includes full TypeScript types for type-safe color access:

```typescript
import type { CompostColorTokens } from '@/types/product'

// Access semantic colors
const primaryText = tokens.semantic.onLayer.primary.light

// Access primitives
const gray50 = tokens.primitives.neutrals.gray['50']

// Access gradients
const aiGradient = tokens.gradients.ai['on-layer']
```

## Migration from Simple Format

If you have an existing simple color format (`{primary, secondary, neutral}`), the system maintains backward compatibility. The comprehensive system is detected automatically when `semantic`, `primitives`, and `gradients` properties are present.
