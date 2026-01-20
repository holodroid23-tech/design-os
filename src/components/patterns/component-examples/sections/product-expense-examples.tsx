import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderProductTile } from '@/components/ui/order-product-tile'
import { ProductTile } from '@/components/ui/product-tile'
import { IconTile } from '@/components/atoms/icon'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { OrderLineItemRow } from '@/components/ui/order-line-item-row'
import { ExpenseLineItemRow } from '@/components/ui/expense-line-item-row'
import { SystemIcon } from '@/components/atoms/icon'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import { SettingsGroup } from '@/components/settings/settings-group'
import { GridActionTile } from '@/components/patterns/grid-action-tile'
import { CreditCard, Folder, Minus, Pencil, Plus, Trash2 } from 'lucide-react'

const productSwatches = [
  { name: 'Primary', tone: 'primary' as const },
  { name: 'Secondary', tone: 'secondary' as const },
  { name: 'Info', tone: 'info' as const },
  { name: 'Success', tone: 'success' as const },
  { name: 'Warning', tone: 'warning' as const },
  { name: 'Danger', tone: 'danger' as const },
  { name: 'Muted', tone: 'muted' as const },
  { name: 'Accent', tone: 'accent' as const },
  { name: 'Card', tone: 'card' as const },
]

export function ProductExpenseCardsExamplesCard() {
  return (
    <Card id="product-expense-cards" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Product/expense cards</CardTitle>
        <CardDescription>Interactive product cards and expense folder cards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <div className="text-base font-semibold">Product / order section</div>
            <p className="text-sm text-muted-foreground mt-1">Color swatches, prices, and quantity controls</p>
          </div>

          <div className="space-y-6">
            <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">
              Token-based swatches (no palette colors)
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {productSwatches.map((item) => (
                <ProductTile key={item.name} name={item.name} price="$4.50" tone={item.tone} />
              ))}
            </div>

            <Separator />

            {/* Actions Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Actions</Label>
              <div className="grid grid-cols-3 gap-3">
                <GridActionTile
                  icon={Plus}
                  label="Custom expense"
                  iconClassName="text-primary"
                />
                <GridActionTile
                  icon={Plus}
                  label="Custom item"
                  iconClassName="text-primary"
                />
              </div>
            </div>

            {/* Folders Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Folders</Label>
              <div className="grid grid-cols-3 gap-3">
                <GridActionTile
                  icon={Folder}
                  label="Drinks"
                  iconClassName="text-layer-info"
                />
                <GridActionTile
                  icon={Folder}
                  label="Food"
                  iconClassName="text-layer-info"
                />
              </div>
            </div>

            {/* Products Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Products</Label>
              <div className="grid grid-cols-3 gap-3">
                <OrderProductTile
                  name="Macchiato"
                  price="$3.75"
                  tone="primary"
                  count={1}
                  leftAction={{ icon: Trash2, label: "Remove" }}
                  rightAction={{ icon: Plus, label: "Add" }}
                />

                <OrderProductTile
                  name="Cappuccino"
                  price="$4.50"
                  tone="secondary"
                  count={2}
                  leftAction={{ icon: Minus, label: "Decrease" }}
                  rightAction={{ icon: Plus, label: "Increase" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <div className="text-base font-semibold">Expense section</div>
            <p className="text-sm text-muted-foreground mt-1">Folders and categories (name only)</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {productSwatches.slice(0, 6).map((item) => (
              <ProductTile key={`${item.name}-expense`} name={item.name} tone={item.tone} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductExpenseItemsDsExamplesCard() {
  return (
    <Card id="product-expense-items-ds" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Product / expense card items</CardTitle>
        <CardDescription>Variants designed for order and expense management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground px-1">Atomic items (orders)</div>
            <SettingsGroup>
              <OrderLineItemRow
                name="Iced Matcha"
                quantity={2}
                price="$11.00"
                imageSrc="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=256&auto=format&fit=crop"
                imageAlt="Iced Matcha"
                onDecrease={() => {}}
                onIncrease={() => {}}
              />
            </SettingsGroup>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground px-1">Atomic items (expenses)</div>
            <SettingsGroup>
              <ExpenseLineItemRow
                name="Office rent"
                price="$1,250.00"
                imageSrc="https://picsum.photos/seed/office-rent/72"
                imageAlt="Office rent"
                onEdit={() => {}}
              />
            </SettingsGroup>
          </div>

          <div className="pt-1">
            <div className="text-xs text-muted-foreground px-1">Alternatives (atoms): icon tiles with background</div>
          </div>

          <SettingsGroup>
            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={CreditCard} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Iced Matcha</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction className="flex items-center gap-6">
                <div className="flex items-center gap-1 bg-layer-2 border border-border rounded-lg p-0.5">
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-foreground">
                    <Minus className="h-[18px] w-[18px]" />
                  </Button>
                  <span className="font-bold px-2 text-sm text-foreground">2</span>
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-foreground">
                    <Plus className="h-[18px] w-[18px]" />
                  </Button>
                </div>
                <span className="text-sm font-mono font-bold text-foreground">$11.00</span>
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={Folder} size="small" variant="tile" tone="warning" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Office rent</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction className="flex items-center gap-6">
                <Button
                  variant="invisible"
                  size="icon-sm"
                  className="h-8 w-8 text-foreground"
                  aria-label="Edit price"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SystemIcon icon={Pencil} size="regular" aria-hidden="true" />
                </Button>
                <span className="text-sm font-mono font-bold text-foreground">$1,250.00</span>
              </SettingsItemAction>
            </SettingsItem>
          </SettingsGroup>
        </div>
      </CardContent>
    </Card>
  )
}

