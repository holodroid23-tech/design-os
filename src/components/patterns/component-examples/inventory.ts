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

export const componentExamplesInventory: ComponentExampleInventoryItem[] = [
  { id: 'buttons', title: 'Buttons', component: '@/components/patterns/component-examples/sections/controls-examples#ButtonsExamplesCard' },
  { id: 'steppers', title: 'Steppers', component: '@/components/patterns/component-examples/sections/controls-examples#SteppersExamplesCard' },
  { id: 'sliders', title: 'Sliders', component: '@/components/patterns/component-examples/sections/controls-examples#SlidersExamplesCard' },

  { id: 'product-expense-cards', title: 'Product/expense cards', component: '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseCardsExamplesCard' },
  { id: 'bottom-menu', title: 'Bottom sliding menu', component: '@/components/patterns/component-examples/sections/menus-examples#BottomMenuExamplesCard' },
  { id: 'sliding-selector', title: 'Sliding selector', component: '@/components/patterns/component-examples/sections/menus-examples#SlidingSelectorExamplesCard' },
  { id: 'snackbars', title: 'Snackbars', component: '@/components/patterns/component-examples/sections/feedback-examples#SnackbarsExamplesCard' },
  { id: 'dialogs', title: 'Dialogs', component: '@/components/patterns/component-examples/sections/feedback-examples#DialogsExamplesCard' },
  { id: 'sheets', title: 'Sheets', component: '@/components/patterns/component-examples/sections/feedback-examples#SheetsExamplesCard' },
  { id: 'radio-groups', title: 'Radio groups', component: '@/components/patterns/component-examples/sections/controls-more-examples#RadioGroupsExamplesCard' },
  { id: 'numpad', title: 'Numpad', component: '@/components/patterns/component-examples/sections/controls-more-examples#NumpadExamplesCard' },
  { id: 'security', title: 'Security', component: '@/components/patterns/component-examples/sections/controls-more-examples#SecurityExamplesCard' },
  { id: 'checkboxes', title: 'Checkboxes', component: '@/components/patterns/component-examples/sections/controls-more-examples#CheckboxesExamplesCard' },
  { id: 'dropdown-menus', title: 'Dropdown menus', component: '@/components/patterns/component-examples/sections/controls-more-examples#DropdownMenusExamplesCard' },
  { id: 'inputs', title: 'Inputs', component: '@/components/patterns/component-examples/sections/forms-examples#InputsExamplesCard' },
  { id: 'switches', title: 'Switches', component: '@/components/patterns/component-examples/sections/forms-examples#SwitchesExamplesCard' },
  { id: 'date-picker', title: 'Date picker', component: '@/components/patterns/component-examples/sections/forms-examples#DatePickerExamplesCard' },
  { id: 'color-picker', title: 'Color picker', component: '@/components/patterns/component-examples/sections/forms-examples#ColorPickerExamplesCard' },
  { id: 'color-selector', title: 'Color selector', component: '@/components/patterns/component-examples/sections/forms-examples#ColorSelectorExamplesCard' },
  { id: 'badges-examples', title: 'Badges (examples)', component: '@/components/patterns/component-examples/sections/forms-examples#BadgesExamplesCard' },
  { id: 'tabs', title: 'Tabs', component: '@/components/patterns/component-examples/sections/forms-examples#TabsExamplesCard' },
  { id: 'cards', title: 'Cards', component: '@/components/patterns/component-examples/sections/forms-examples#CardsExamplesCard' },
  { id: 'settings-components', title: 'Settings components', component: '@/components/patterns/component-examples/sections/settings-examples#SettingsComponentsExamplesCard' },
  { id: 'elevations', title: 'Elevations & shadows', component: '@/components/patterns/component-examples/sections/layout-examples#ElevationsExamplesCard' },
  { id: 'building-blocks', title: 'Building blocks', component: '@/components/patterns/component-examples/sections/building-blocks-examples#BuildingBlocksExamplesCard' },
  { id: 'atomic-items', title: 'Atomic items', component: '@/components/patterns/component-examples/sections/building-blocks-examples#AtomicItemsExamplesCard' },
  { id: 'section-titles', title: 'Section titles', component: '@/components/patterns/component-examples/sections/building-blocks-examples#SectionTitlesExamplesCard' },
  { id: 'product-expense-items-ds', title: 'Product/expense items (DS)', component: '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseItemsDsExamplesCard' },
  { id: 'badges', title: 'Badges', component: '@/components/patterns/component-examples/sections/badges-examples#BadgesTokensCard' },
  { id: 'accordions', title: 'Accordions', component: '@/components/patterns/component-examples/sections/layout-examples#AccordionsExamplesCard' },
  { id: 'order-expandable', title: 'Order expandable', component: '@/components/patterns/component-examples/sections/order-examples#OrderExpandableExamplesCard' },
  { id: 'order-tabs', title: 'Order tabs', component: '@/components/patterns/component-examples/sections/order-examples#OrderTabsExamplesCard' },
  { id: 'media-upload', title: 'Media upload', component: '@/components/patterns/component-examples/sections/media-examples#MediaUploadExamplesCard' },
  { id: 'check-lists', title: 'Check lists', component: '@/components/patterns/component-examples/sections/feedback-examples#CheckListsExamplesCard' },
  { id: 'empty-states', title: 'Empty states', component: '@/components/patterns/component-examples/sections/feedback-examples#EmptyStatesExamplesCard' },
  { id: 'dividers', title: 'Dividers', component: '@/components/patterns/component-examples/sections/layout-examples#DividersExamplesCard' },
  { id: 'email-templates', title: 'Email templates', component: '@/components/patterns/component-examples/sections/exports-examples#EmailTemplatesExamplesCard' },
  { id: 'receipt', title: 'Receipt', component: '@/components/patterns/component-examples/sections/exports-examples#ReceiptExamplesCard' },
]

