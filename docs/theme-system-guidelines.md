# Theme System Guidelines

## Overview

Design OS uses a **semantic color system** based on CSS custom properties (CSS variables). This ensures that exported components work correctly regardless of the design system tokens (stone palette, ComPOSt colors, or any other system).

## Critical Rule: Never Hardcode Colors

**NEVER** use hardcoded Tailwind color utilities in exportable UI components.

### ❌ WRONG - Hardcoded Colors

```tsx
// BAD: These will break when exported to other design systems
<div className="bg-stone-200 dark:bg-stone-700">
<span className="text-stone-600 dark:text-stone-400">
<button className="border-stone-300 dark:border-stone-600">
```

### ✅ CORRECT - Semantic Theme Variables

```tsx
// GOOD: These adapt to any design system
<div className="bg-muted">
<span className="text-muted-foreground">
<button className="border">
```

---

## Semantic Color Variables Reference

Use **only** these semantic variables in all exportable UI components:

### Background & Surface Colors

| Variable | Purpose | Example |
|----------|---------|---------|
| `bg-background` | Page/app background | Main page wrapper |
| `bg-foreground` | Text color when used as bg | Inverted sections |
| `bg-card` | Card/panel background | Cards, modals |
| `bg-popover` | Popover/dropdown background | Dropdowns, tooltips |
| `bg-muted` | Subdued background | Secondary sections |
| `bg-accent` | Hover/focus background | Interactive states |

### Text Colors

| Variable | Purpose | Example |
|----------|---------|---------|
| `text-foreground` | Primary text | Headings, body text |
| `text-muted-foreground` | Secondary text | Captions, metadata |
| `text-card-foreground` | Text on cards | Card content |
| `text-popover-foreground` | Text on popovers | Dropdown items |
| `text-accent-foreground` | Text on accent bg | Hover states |

### Interactive Colors

| Variable | Purpose | Example |
|----------|---------|---------|
| `bg-primary` | Primary action | CTA buttons |
| `text-primary-foreground` | Text on primary | Button text |
| `bg-secondary` | Secondary action | Less important actions |
| `text-secondary-foreground` | Text on secondary | Secondary button text |
| `bg-destructive` | Danger/delete actions | Delete buttons |
| `text-destructive` | Destructive text | Error messages |

### Border Colors

| Variable | Purpose | Example |
|----------|---------|---------|
| `border` | Standard borders | Input borders, dividers |
| `border-input` | Input borders | Form fields |
| `border-ring` | Focus ring | Focus states |

### Special Colors

| Variable | Purpose | Example |
|----------|---------|---------|
| `bg-input` | Input background (especially dark mode) | Form fields |
| `ring-ring` | Focus ring color | Focus indicators |

---

## Common Patterns

### Hover States

```tsx
// ❌ WRONG
className="hover:bg-stone-100 dark:hover:bg-stone-800"

// ✅ CORRECT
className="hover:bg-accent"
```

### Border with Dark Mode

```tsx
// ❌ WRONG
className="border-stone-200 dark:border-stone-700"

// ✅ CORRECT
className="border"
```

### Text with Dark Mode

```tsx
// ❌ WRONG
className="text-stone-900 dark:text-stone-100"

// ✅ CORRECT
className="text-foreground"

// ❌ WRONG
className="text-stone-600 dark:text-stone-400"

// ✅ CORRECT
className="text-muted-foreground"
```

### Input Backgrounds

```tsx
// ❌ WRONG
className="bg-white dark:bg-stone-900"

// ✅ CORRECT
className="bg-background dark:bg-input/30"
```

---

## Files to Check

All files in `src/components/ui/` **MUST** follow these guidelines. Key components:

- ✅ `button.tsx` - Uses semantic colors
- ✅ `input.tsx` - Uses semantic colors
- ✅ `dropdown-menu.tsx` - Uses semantic colors
- ✅ `sliding-selector.tsx` - **FIXED** - Now uses semantic colors
- ✅ `switch.tsx` - **FIXED** - Now uses semantic colors
- ✅ `sonner.tsx` - **FIXED** - Now uses semantic colors
- ✅ `search-input-with-suggestions.tsx` - **FIXED** - Now uses semantic colors
- ✅ `numpad.tsx` - **FIXED** - Now uses semantic colors
- ✅ `date-picker.tsx` - **FIXED** - Now uses semantic colors
- ✅ `color-picker.tsx` - **FIXED** - Now uses semantic colors
- ✅ `popover.tsx` - Uses semantic colors
- ✅ `sheet.tsx` - Uses semantic colors

---

## How the Theme System Works

### 1. Theme Variables Defined in CSS

In `src/index.css`, theme variables are defined:

```css
:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --primary: oklch(...);
  /* etc. */
}

.dark {
  --background: oklch(...);
  --foreground: oklch(...);
  /* Different values for dark mode */
}
```

### 2. Theme Variables Mapped to Tailwind

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* etc. */
}
```

### 3. Components Use Tailwind Classes

```tsx
// This uses the theme variable --color-background
<div className="bg-background">
```

### 4. Theme Adapts to Design System

When you import a design system (like ComPOSt), the theme variables update automatically, and all components adapt without needing code changes.

---

## Testing for Hardcoded Colors

Run this command to find hardcoded colors in UI components:

```bash
# Check for hardcoded stone/slate/gray/zinc colors
rg "stone-\d+|slate-\d+|gray-\d+|zinc-\d+" src/components/ui/
```

Should return **no results**.

---

## Why This Matters

1. **Portability**: Exported components work in any design system
2. **Consistency**: All components adapt together when design tokens change
3. **Dark Mode**: Automatic support without manual dark: variants everywhere
4. **Maintainability**: Single source of truth for colors

---

## Exception: Non-Exported Files

Files NOT in `src/components/ui/` can use hardcoded colors for the Design OS application itself (like `ComponentExamples.tsx`, `DesignPage.tsx`, etc.). These are not exported to product implementations.

---

## Complete Migration Summary

### ✅ Exportable UI Components (`src/components/ui/`)
**Status:** 100% Complete - Zero hardcoded stone colors
- All components use semantic theme variables
- Works with any design system tokens
- Fully portable and reusable

### ✅ Design OS Application (`src/components/`)
**Status:** 100% Complete - All stone colors replaced
- All pages, cards, and shared components now use semantic colors
- Design OS interface adapts to loaded design systems
- Consistent theme system throughout

### Remaining References
- `index.css`: Extended color palette for component examples (intentional)
- ComponentExamples.tsx: "Soft stone" gradient name (product name, not a color class)

---

Last updated: 2026-01-17
