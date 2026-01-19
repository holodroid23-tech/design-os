/**
 * Component Examples Inventory
 *
 * Source-of-truth list of example blocks rendered in `src/components/ComponentExamples.tsx`,
 * and the target extracted reusable component for each block.
 *
 * Notes:
 * - The `component` field is a string pointer to keep this file dependency-free.
 * - Blocks are keyed by the `Card` id used for in-page anchors.
 */

export interface ComponentExampleInventoryItem {
  id: string
  title: string
  component: string
}

export interface ComponentExampleInventoryGroup {
  id: string
  title: string
  description?: string
  items: ComponentExampleInventoryItem[]
}

/**
 * Grouped, source-of-truth structure for the component library.
 *
 * Both the left "Design library" navigation and the right "Design preview"
 * should render from this list so they stay perfectly in sync.
 *
 * Note: "Atomic items" is intentionally grouped under "Settings" since it is
 * essentially composed from the same settings primitives.
 */
export const componentExamplesInventoryGroups: ComponentExampleInventoryGroup[] = [
  {
    id: 'controls',
    title: 'Controls',
    items: [
      { id: 'buttons', title: 'Buttons', component: '@/components/patterns/component-examples/sections/controls-examples#ButtonsExamplesCard' },
      { id: 'steppers', title: 'Steppers', component: '@/components/patterns/component-examples/sections/controls-examples#SteppersExamplesCard' },
      { id: 'sliders', title: 'Sliders', component: '@/components/patterns/component-examples/sections/controls-examples#SlidersExamplesCard' },
    ],
  },
  {
    id: 'patterns',
    title: 'Patterns',
    items: [
      { id: 'navigation-menu-profile', title: 'Profile (nav item)', component: '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuProfileItemExamplesCard' },
      { id: 'navigation-menu-messages', title: 'Messages (nav item)', component: '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuMessagesItemExamplesCard' },
      { id: 'navigation-menu-notifications', title: 'Notifications (nav item)', component: '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuNotificationsItemExamplesCard' },
      { id: 'navigation-menu-settings', title: 'Settings (nav item)', component: '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuSettingsItemExamplesCard' },
      { id: 'stats-cards', title: 'Stats cards', component: '@/components/patterns/component-examples/sections/patterns-examples#StatsCardsExamplesCard' },
      { id: 'bottom-menu', title: 'Bottom sliding menu', component: '@/components/patterns/component-examples/sections/menus-examples#BottomMenuExamplesCard' },
      { id: 'sliding-selector', title: 'Sliding selector', component: '@/components/patterns/component-examples/sections/menus-examples#SlidingSelectorExamplesCard' },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    items: [
      { id: 'inputs', title: 'Inputs', component: '@/components/patterns/component-examples/sections/forms-examples#InputsExamplesCard' },
      { id: 'switches', title: 'Switches', component: '@/components/patterns/component-examples/sections/forms-examples#SwitchesExamplesCard' },
      { id: 'date-picker', title: 'Date picker', component: '@/components/patterns/component-examples/sections/forms-examples#DatePickerExamplesCard' },
      { id: 'color-picker', title: 'Color picker', component: '@/components/patterns/component-examples/sections/forms-examples#ColorPickerExamplesCard' },
      { id: 'color-selector', title: 'Color selector', component: '@/components/patterns/component-examples/sections/forms-examples#ColorSelectorExamplesCard' },
      { id: 'badges-examples', title: 'Badges (examples)', component: '@/components/patterns/component-examples/sections/forms-examples#BadgesExamplesCard' },
      { id: 'tabs', title: 'Tabs', component: '@/components/patterns/component-examples/sections/forms-examples#TabsExamplesCard' },
      { id: 'cards', title: 'Cards', component: '@/components/patterns/component-examples/sections/forms-examples#CardsExamplesCard' },
    ],
  },
  {
    id: 'controls-more',
    title: 'Controls (more)',
    items: [
      { id: 'radio-groups', title: 'Radio groups', component: '@/components/patterns/component-examples/sections/controls-more-examples#RadioGroupsExamplesCard' },
      { id: 'numpad', title: 'Numpad', component: '@/components/patterns/component-examples/sections/controls-more-examples#NumpadExamplesCard' },
      { id: 'security', title: 'Security', component: '@/components/patterns/component-examples/sections/controls-more-examples#SecurityExamplesCard' },
      { id: 'checkboxes', title: 'Checkboxes', component: '@/components/patterns/component-examples/sections/controls-more-examples#CheckboxesExamplesCard' },
      { id: 'dropdown-menus', title: 'Dropdown menus', component: '@/components/patterns/component-examples/sections/controls-more-examples#DropdownMenusExamplesCard' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    items: [
      { id: 'snackbars', title: 'Snackbars', component: '@/components/patterns/component-examples/sections/feedback-examples#SnackbarsExamplesCard' },
      { id: 'dialogs', title: 'Dialogs', component: '@/components/patterns/component-examples/sections/feedback-examples#DialogsExamplesCard' },
      { id: 'sheets', title: 'Sheets', component: '@/components/patterns/component-examples/sections/feedback-examples#SheetsExamplesCard' },
      { id: 'check-lists', title: 'Check lists', component: '@/components/patterns/component-examples/sections/feedback-examples#CheckListsExamplesCard' },
      { id: 'empty-states', title: 'Empty states', component: '@/components/patterns/component-examples/sections/feedback-examples#EmptyStatesExamplesCard' },
    ],
  },
  {
    id: 'layout',
    title: 'Layout',
    items: [
      { id: 'elevations', title: 'Elevations & shadows', component: '@/components/patterns/component-examples/sections/layout-examples#ElevationsExamplesCard' },
      { id: 'dividers', title: 'Dividers', component: '@/components/patterns/component-examples/sections/layout-examples#DividersExamplesCard' },
      { id: 'accordions', title: 'Accordions', component: '@/components/patterns/component-examples/sections/layout-examples#AccordionsExamplesCard' },
    ],
  },
  {
    id: 'items',
    title: 'Items',
    items: [
      { id: 'item-row-simple-text', title: 'Simple text item', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowSimpleTextExamplesCard' },
      { id: 'item-row-toggle', title: 'Toggle option', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowToggleExamplesCard' },
      { id: 'item-row-user-profile', title: 'User profile', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowUserProfileExamplesCard' },
      { id: 'item-row-image-chevron', title: 'Image + chevron', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowImageChevronExamplesCard' },
      { id: 'item-row-badge-chevron', title: 'Badge + chevron', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowBadgeChevronExamplesCard' },
      { id: 'item-row-avatar-badge-chevron', title: 'Avatar + badge + chevron', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowAvatarBadgeChevronExamplesCard' },
      { id: 'item-row-value-chevron', title: 'Value + chevron', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowValueChevronExamplesCard' },
      { id: 'item-row-inline-button', title: 'Trailing button', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowInlineButtonExamplesCard' },
      { id: 'item-row-inline-buttons', title: 'Inline buttons', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowInlineButtonsExamplesCard' },
      { id: 'item-row-destructive-action', title: 'Destructive action', component: '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowDestructiveActionExamplesCard' },
    ],
  },
  {
    id: 'building-blocks',
    title: 'Building blocks',
    items: [
      { id: 'building-blocks', title: 'Building blocks', component: '@/components/patterns/component-examples/sections/building-blocks-examples#BuildingBlocksExamplesCard' },
      { id: 'section-titles', title: 'Section titles', component: '@/components/patterns/component-examples/sections/building-blocks-examples#SectionTitlesExamplesCard' },
    ],
  },
  {
    id: 'domain',
    title: 'Domain',
    items: [
      { id: 'product-expense-cards', title: 'Product/expense cards', component: '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseCardsExamplesCard' },
      { id: 'product-expense-items-ds', title: 'Product/expense items (DS)', component: '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseItemsDsExamplesCard' },
      { id: 'order-expandable', title: 'Order expandable', component: '@/components/patterns/component-examples/sections/order-examples#OrderExpandableExamplesCard' },
      { id: 'order-tabs', title: 'Order tabs', component: '@/components/patterns/component-examples/sections/order-examples#OrderTabsExamplesCard' },
      { id: 'media-upload', title: 'Media upload', component: '@/components/patterns/component-examples/sections/media-examples#MediaUploadExamplesCard' },
      { id: 'stroke-style-selector', title: 'Stroke style selector', component: '@/components/patterns/component-examples/sections/media-examples#StrokeStyleSelectorExamplesCard' },
    ],
  },
  {
    id: 'tokens',
    title: 'Tokens',
    items: [
      { id: 'badges', title: 'Badges', component: '@/components/patterns/component-examples/sections/badges-examples#BadgesTokensCard' },
    ],
  },
  {
    id: 'exports',
    title: 'Exports',
    items: [
      { id: 'email-templates', title: 'Email templates', component: '@/components/patterns/component-examples/sections/exports-examples#EmailTemplatesExamplesCard' },
      { id: 'receipt', title: 'Receipt', component: '@/components/patterns/component-examples/sections/exports-examples#ReceiptExamplesCard' },
    ],
  },
]

/**
 * Backward-compatible flat list (derived from groups).
 * Prefer `componentExamplesInventoryGroups` for any UI.
 */
export const componentExamplesInventory: ComponentExampleInventoryItem[] =
  componentExamplesInventoryGroups.flatMap((g) => g.items)

