import type { ComponentType } from 'react'

import {
  ButtonsExamplesCard,
  SlidersExamplesCard,
  SteppersExamplesCard,
} from '@/components/patterns/component-examples/sections/controls-examples'
import {
  BottomMenuExamplesCard,
  SlidingSelectorExamplesCard,
} from '@/components/patterns/component-examples/sections/menus-examples'
import {
  DialogsExamplesCard,
  CheckListsExamplesCard,
  EmptyStatesExamplesCard,
  SheetsExamplesCard,
  SnackbarsExamplesCard,
} from '@/components/patterns/component-examples/sections/feedback-examples'
import {
  CheckboxesExamplesCard,
  DropdownMenusExamplesCard,
  NumpadExamplesCard,
  RadioGroupsExamplesCard,
  SecurityExamplesCard,
} from '@/components/patterns/component-examples/sections/controls-more-examples'
import {
  BadgesExamplesCard,
  CardsExamplesCard,
  ColorPickerExamplesCard,
  ColorSelectorExamplesCard,
  DatePickerExamplesCard,
  InputsExamplesCard,
  SwitchesExamplesCard,
  TabsExamplesCard,
} from '@/components/patterns/component-examples/sections/forms-examples'
import {
  EmailTemplatesExamplesCard,
  ReceiptExamplesCard,
} from '@/components/patterns/component-examples/sections/exports-examples'
import {
  AccordionsExamplesCard,
  DividersExamplesCard,
  ElevationsExamplesCard,
} from '@/components/patterns/component-examples/sections/layout-examples'
import { BadgesTokensCard } from '@/components/patterns/component-examples/sections/badges-examples'
import {
  MediaUploadExamplesCard,
  StrokeStyleSelectorExamplesCard,
} from '@/components/patterns/component-examples/sections/media-examples'
import {
  BuildingBlocksExamplesCard,
  SectionTitlesExamplesCard,
} from '@/components/patterns/component-examples/sections/building-blocks-examples'
import {
  OrderExpandableExamplesCard,
  OrderTabsExamplesCard,
} from '@/components/patterns/component-examples/sections/order-examples'
import {
  ProductExpenseCardsExamplesCard,
  ProductExpenseItemsDsExamplesCard,
} from '@/components/patterns/component-examples/sections/product-expense-examples'
import {
  NavigationMenuExamplesCard,
  NavigationMenuMessagesItemExamplesCard,
  NavigationMenuNotificationsItemExamplesCard,
  NavigationMenuProfileItemExamplesCard,
  NavigationMenuSettingsItemExamplesCard,
  StatsCardsExamplesCard,
} from '@/components/patterns/component-examples/sections/patterns-examples'
import {
  ItemRowAvatarBadgeChevronExamplesCard,
  ItemRowBadgeChevronExamplesCard,
  ItemRowDestructiveActionExamplesCard,
  ItemRowImageChevronExamplesCard,
  ItemRowInlineButtonExamplesCard,
  ItemRowInlineButtonsExamplesCard,
  ItemRowSimpleTextExamplesCard,
  ItemRowToggleExamplesCard,
  ItemRowUserProfileExamplesCard,
  ItemRowValueChevronExamplesCard,
  ItemRowsExamplesCard,
} from '@/components/patterns/component-examples/sections/item-rows-examples'

/**
 * Registry mapping inventory string pointers to the actual component.
 *
 * This keeps inventory dependency-free, but still lets the Design OS app render
 * the examples without dynamic imports.
 */
export const componentExamplesRegistry: Record<string, ComponentType> = {
  '@/components/patterns/component-examples/sections/controls-examples#ButtonsExamplesCard': ButtonsExamplesCard,
  '@/components/patterns/component-examples/sections/controls-examples#SteppersExamplesCard': SteppersExamplesCard,
  '@/components/patterns/component-examples/sections/controls-examples#SlidersExamplesCard': SlidersExamplesCard,

  '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuExamplesCard': NavigationMenuExamplesCard,
  '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuProfileItemExamplesCard': NavigationMenuProfileItemExamplesCard,
  '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuMessagesItemExamplesCard': NavigationMenuMessagesItemExamplesCard,
  '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuNotificationsItemExamplesCard': NavigationMenuNotificationsItemExamplesCard,
  '@/components/patterns/component-examples/sections/patterns-examples#NavigationMenuSettingsItemExamplesCard': NavigationMenuSettingsItemExamplesCard,
  '@/components/patterns/component-examples/sections/patterns-examples#StatsCardsExamplesCard': StatsCardsExamplesCard,

  '@/components/patterns/component-examples/sections/menus-examples#BottomMenuExamplesCard': BottomMenuExamplesCard,
  '@/components/patterns/component-examples/sections/menus-examples#SlidingSelectorExamplesCard': SlidingSelectorExamplesCard,

  '@/components/patterns/component-examples/sections/feedback-examples#SnackbarsExamplesCard': SnackbarsExamplesCard,
  '@/components/patterns/component-examples/sections/feedback-examples#DialogsExamplesCard': DialogsExamplesCard,
  '@/components/patterns/component-examples/sections/feedback-examples#SheetsExamplesCard': SheetsExamplesCard,
  '@/components/patterns/component-examples/sections/feedback-examples#CheckListsExamplesCard': CheckListsExamplesCard,
  '@/components/patterns/component-examples/sections/feedback-examples#EmptyStatesExamplesCard': EmptyStatesExamplesCard,

  '@/components/patterns/component-examples/sections/controls-more-examples#RadioGroupsExamplesCard': RadioGroupsExamplesCard,
  '@/components/patterns/component-examples/sections/controls-more-examples#NumpadExamplesCard': NumpadExamplesCard,
  '@/components/patterns/component-examples/sections/controls-more-examples#SecurityExamplesCard': SecurityExamplesCard,
  '@/components/patterns/component-examples/sections/controls-more-examples#CheckboxesExamplesCard': CheckboxesExamplesCard,
  '@/components/patterns/component-examples/sections/controls-more-examples#DropdownMenusExamplesCard': DropdownMenusExamplesCard,

  '@/components/patterns/component-examples/sections/forms-examples#InputsExamplesCard': InputsExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#SwitchesExamplesCard': SwitchesExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#DatePickerExamplesCard': DatePickerExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#ColorPickerExamplesCard': ColorPickerExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#ColorSelectorExamplesCard': ColorSelectorExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#BadgesExamplesCard': BadgesExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#TabsExamplesCard': TabsExamplesCard,
  '@/components/patterns/component-examples/sections/forms-examples#CardsExamplesCard': CardsExamplesCard,

  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowsExamplesCard': ItemRowsExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowSimpleTextExamplesCard': ItemRowSimpleTextExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowToggleExamplesCard': ItemRowToggleExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowUserProfileExamplesCard': ItemRowUserProfileExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowImageChevronExamplesCard': ItemRowImageChevronExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowBadgeChevronExamplesCard': ItemRowBadgeChevronExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowAvatarBadgeChevronExamplesCard': ItemRowAvatarBadgeChevronExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowValueChevronExamplesCard': ItemRowValueChevronExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowInlineButtonExamplesCard': ItemRowInlineButtonExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowInlineButtonsExamplesCard': ItemRowInlineButtonsExamplesCard,
  '@/components/patterns/component-examples/sections/item-rows-examples#ItemRowDestructiveActionExamplesCard': ItemRowDestructiveActionExamplesCard,

  '@/components/patterns/component-examples/sections/layout-examples#ElevationsExamplesCard': ElevationsExamplesCard,
  '@/components/patterns/component-examples/sections/layout-examples#DividersExamplesCard': DividersExamplesCard,
  '@/components/patterns/component-examples/sections/layout-examples#AccordionsExamplesCard': AccordionsExamplesCard,

  '@/components/patterns/component-examples/sections/building-blocks-examples#BuildingBlocksExamplesCard': BuildingBlocksExamplesCard,
  '@/components/patterns/component-examples/sections/building-blocks-examples#SectionTitlesExamplesCard': SectionTitlesExamplesCard,

  '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseCardsExamplesCard': ProductExpenseCardsExamplesCard,
  '@/components/patterns/component-examples/sections/product-expense-examples#ProductExpenseItemsDsExamplesCard': ProductExpenseItemsDsExamplesCard,

  '@/components/patterns/component-examples/sections/badges-examples#BadgesTokensCard': BadgesTokensCard,

  '@/components/patterns/component-examples/sections/order-examples#OrderExpandableExamplesCard': OrderExpandableExamplesCard,
  '@/components/patterns/component-examples/sections/order-examples#OrderTabsExamplesCard': OrderTabsExamplesCard,

  '@/components/patterns/component-examples/sections/media-examples#MediaUploadExamplesCard': MediaUploadExamplesCard,
  '@/components/patterns/component-examples/sections/media-examples#StrokeStyleSelectorExamplesCard':
    StrokeStyleSelectorExamplesCard,

  '@/components/patterns/component-examples/sections/exports-examples#EmailTemplatesExamplesCard': EmailTemplatesExamplesCard,
  '@/components/patterns/component-examples/sections/exports-examples#ReceiptExamplesCard': ReceiptExamplesCard,
}

