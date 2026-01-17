# Settings UI Components

This document defines the specialized components used to build the "Settings" style interfaces. These components strictly adhere to the ComPOSt Design System.

## 1. SettingsGroup

The container that groups related setting items together. It provides visual isolation and hierarchy.

### Visual Specification
*   **Background:** `Layer 1` (Standard container on the default Layer 0 page).
*   **Radius:** `Large` (18px) - *Correlates with Spacing-5, used for containers.*
*   **Padding:** `0px` (Internal items handle their own padding/sizing).
*   **Border:** `1px solid Border-Level-1` (Subtle separation).
*   **Overflow:** `Hidden` (Ensures child items respect the rounded corners).
*   **Spacing:** `Space 6` (24px) margin between groups.

### Usage
```tsx
<SettingsGroup>
  <SettingsItem ... />
  <SettingsItem ... />
</SettingsGroup>
```

---

## 2. SettingsItem

A standard interactive row for navigation or action within a group.

### Visual Specification
*   **Height:** `60px` (Space-10) - *Standard bar height for touch targets.*
*   **Padding:** `0 18px` (Space-5) - *Horizontal breathing room.*
*   **Background:** `Transparent` (inherits from Group).
*   **Interaction:**
    *   **Hover:** `Layer-Hover` background.
    *   **Active:** `Layer-Active` background + Scale 0.98 (Micro-interaction).
*   **Typography:** `Regular Semibold` (16px) for label.
*   **Icon:** `24px` (Stroke 2px). Color: `Primary`.
*   **Separator:** Bottom border (1px solid `Border-Level-1`) on all items *except* the last one.

### Component Logic
*   **Props:**
    *   `icon`: LucideIcon
    *   `label`: string
    *   `description?`: string (optional subtext)
    *   `onClick`: () => void
    *   `variant`: 'default' | 'destructive'
    *   `rightElement`: ReactNode (default: ChevronRight)

### Variants
*   **Default:** Primary text color.
*   **Destructive:** Danger text color, Danger Icon color. Used for "Log out" or "Delete".

---

## 3. UserProfileRow

A specialized variant of the settings item for the user profile header.

### Visual Specification
*   **Height:** `84px` (Custom height for prominence).
*   **Padding:** `12px 18px`.
*   **Background:** `Layer 2` (Slightly elevated relative to standard groups, or same manual override).
*   **Radius:** `Large` (18px) - *Can be standalone.*

### Content Layout
1.  **Avatar (Left):**
    *   Size: `48px` (Standard touch target size).
    *   Content: Initials (e.g., "GH").
    *   Style: Blue/Interactive background, White text.
    *   **Status Indicator:** 12px Green dot (Success color) with 2px border (matching card bg) at bottom-right of avatar.
2.  **Text Stack (Middle):**
    *   Name: `Regular Semibold` (Primary Color).
    *   Email: `Small` (Secondary Color).
3.  **Action (Right):**
    *   ChevronRight (Tertiary Color).

---

## Implementation Plan

We will create a new directory: `src/components/settings/` to house these components to keep them distinct from generic UI.

### File Structure
*   `src/components/settings/settings-group.tsx`
*   `src/components/settings/settings-item.tsx`
*   `src/components/settings/user-profile-row.tsx`
