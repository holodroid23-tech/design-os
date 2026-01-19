import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'

import { Separator } from './ui/separator'
import {
  User,
  Mail,
  Bell,
  Settings,
} from 'lucide-react'
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
import { MediaUploadExamplesCard } from '@/components/patterns/component-examples/sections/media-examples'
import { SettingsComponentsExamplesCard } from '@/components/patterns/component-examples/sections/settings-examples'
import {
  AtomicItemsExamplesCard,
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

interface ComponentExamplesProps {
  showHeader?: boolean
}

function SectionWrapper({ children, file, name }: { children: React.ReactNode, file: string, name: string }) {
  return (
    <div className="relative group">
      <div className='absolute right-4 top-2 z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity'>
        <code className='text-[10px] text-muted-foreground bg-background/50 backdrop-blur px-1.5 py-0.5 rounded border shadow-sm'>
          {file} • {name}
        </code>
      </div>
      {children}
    </div>
  )
}

export function ComponentExamples({ showHeader = true }: ComponentExamplesProps) {
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Component Examples
          </h2>
          <p className="text-muted-foreground">
            Comprehensive UI components optimized for mobile and desktop
          </p>
        </div>
      )}

      <SectionWrapper file="controls-examples" name="ButtonsExamplesCard">
        <ButtonsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-examples" name="SteppersExamplesCard">
        <SteppersExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-examples" name="SlidersExamplesCard">
        <SlidersExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="product-expense-examples" name="ProductExpenseCardsExamplesCard">
        <ProductExpenseCardsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="menus-examples" name="BottomMenuExamplesCard">
        <BottomMenuExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="menus-examples" name="SlidingSelectorExamplesCard">
        <SlidingSelectorExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="feedback-examples" name="SnackbarsExamplesCard">
        <SnackbarsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="feedback-examples" name="DialogsExamplesCard">
        <DialogsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="feedback-examples" name="SheetsExamplesCard">
        <SheetsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="controls-more-examples" name="RadioGroupsExamplesCard">
        <RadioGroupsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-more-examples" name="NumpadExamplesCard">
        <NumpadExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-more-examples" name="SecurityExamplesCard">
        <SecurityExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-more-examples" name="CheckboxesExamplesCard">
        <CheckboxesExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="controls-more-examples" name="DropdownMenusExamplesCard">
        <DropdownMenusExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="forms-examples" name="InputsExamplesCard">
        <InputsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="SwitchesExamplesCard">
        <SwitchesExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="DatePickerExamplesCard">
        <DatePickerExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="ColorPickerExamplesCard">
        <ColorPickerExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="ColorSelectorExamplesCard">
        <ColorSelectorExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="BadgesExamplesCard">
        <BadgesExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="TabsExamplesCard">
        <TabsExamplesCard />
      </SectionWrapper>
      <SectionWrapper file="forms-examples" name="CardsExamplesCard">
        <CardsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="ComponentExamples.tsx" name="Inline Navigation Menu">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Navigation menu
            </CardTitle>
            <CardDescription>Example navigation items (min 48px touch target)</CardDescription>
          </CardHeader>
          <CardContent>
            <nav className="space-y-1">
              <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
                <Mail className="h-4 w-4" />
                Messages
              </Button>
              <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Separator className="my-2" />
              <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper file="ComponentExamples.tsx" name="Inline Stats Cards">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Stats cards
            </CardTitle>
            <CardDescription>Dashboard-style metric cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardDescription>Total revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    $45,231
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardDescription>Active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    2,350
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-2">
                  <CardDescription>Sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    12,234
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>


      <SectionWrapper file="settings-examples" name="SettingsComponentsExamplesCard">
        <SettingsComponentsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="layout-examples" name="ElevationsExamplesCard">
        <ElevationsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="building-blocks-examples" name="BuildingBlocksExamplesCard">
        <BuildingBlocksExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="building-blocks-examples" name="AtomicItemsExamplesCard">
        <AtomicItemsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="building-blocks-examples" name="SectionTitlesExamplesCard">
        <SectionTitlesExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="product-expense-examples" name="ProductExpenseItemsDsExamplesCard">
        <ProductExpenseItemsDsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="badges-examples" name="BadgesTokensCard">
        <BadgesTokensCard />
      </SectionWrapper>

      <SectionWrapper file="layout-examples" name="AccordionsExamplesCard">
        <AccordionsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="order-examples" name="OrderExpandableExamplesCard">
        <OrderExpandableExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="order-examples" name="OrderTabsExamplesCard">
        <OrderTabsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="media-examples" name="MediaUploadExamplesCard">
        <MediaUploadExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="feedback-examples" name="CheckListsExamplesCard">
        <CheckListsExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="feedback-examples" name="EmptyStatesExamplesCard">
        <EmptyStatesExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="layout-examples" name="DividersExamplesCard">
        <DividersExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="exports-examples" name="EmailTemplatesExamplesCard">
        <EmailTemplatesExamplesCard />
      </SectionWrapper>

      <SectionWrapper file="exports-examples" name="ReceiptExamplesCard">
        <ReceiptExamplesCard />
      </SectionWrapper>
    </div >
  )
}
