import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTile } from '@/components/ui/product-tile'
import { IconTile } from '@/components/atoms/icon'
import { ImageTile } from '@/components/ui/image-tile'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
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
                <ProductTile
                  element="div"
                  name="Macchiato"
                  price="$3.75"
                  tone="primary"
                  topRight={
                    <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-primary-foreground text-primary font-mono text-[10px] font-bold border-none shadow-sm">
                      1
                    </Badge>
                  }
                  bottomLeft={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-overlay-default/20 hover:bg-overlay-default/30 text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                  bottomRight={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-overlay-default/20 hover:bg-overlay-default/30 text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Add"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  }
                />

                <ProductTile
                  element="div"
                  name="Cappuccino"
                  price="$4.50"
                  tone="secondary"
                  topRight={
                    <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-secondary-foreground text-secondary font-mono text-[10px] font-bold border-none shadow-sm">
                      2
                    </Badge>
                  }
                  bottomLeft={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-overlay-default/20 hover:bg-overlay-default/30 text-secondary-foreground"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  }
                  bottomRight={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-overlay-default/20 hover:bg-overlay-default/30 text-secondary-foreground"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  }
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
        <div className="flex flex-col gap-3">
          <SettingsItem className="border border-border rounded-xl p-3 h-auto min-h-0 items-center">
            <SettingsItemIcon>
              <ImageTile
                size="small"
                src="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=256&auto=format&fit=crop"
                alt="Iced Matcha"
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Iced Matcha</SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction className="flex items-center gap-6">
              <div className="flex items-center gap-1 bg-layer-1 border border-border rounded-lg p-0.5">
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

          <SettingsItem className="border border-border rounded-xl p-3 h-auto min-h-0 items-center">
            <SettingsItemIcon>
              <ImageTile size="small" src="https://picsum.photos/seed/office-rent/72" alt="Office rent" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Office rent</SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8 text-foreground"
                aria-label="Edit price"
                onClick={(e) => e.stopPropagation()}
              >
                <Pencil className="h-[18px] w-[18px]" />
              </Button>
              <span className="text-sm font-mono font-bold text-foreground">$1,250.00</span>
            </SettingsItemAction>
          </SettingsItem>

          <div className="pt-1">
            <div className="text-xs text-muted-foreground px-1">Alternatives (atoms): icon tiles with background</div>
          </div>

          <SettingsItem className="border border-border rounded-xl p-3 h-auto min-h-0 items-center">
            <SettingsItemIcon>
              <IconTile icon={CreditCard} size="small" variant="tile" tone="neutral" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Iced Matcha</SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction className="flex items-center gap-6">
              <div className="flex items-center gap-1 bg-layer-1 border border-border rounded-lg p-0.5">
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

          <SettingsItem className="border border-border rounded-xl p-3 h-auto min-h-0 items-center">
            <SettingsItemIcon>
              <IconTile icon={Folder} size="small" variant="tile" tone="warning" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Office rent</SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8 text-foreground"
                aria-label="Edit price"
                onClick={(e) => e.stopPropagation()}
              >
                <Pencil className="h-[18px] w-[18px]" />
              </Button>
              <span className="text-sm font-mono font-bold text-foreground">$1,250.00</span>
            </SettingsItemAction>
          </SettingsItem>
        </div>
      </CardContent>
    </Card>
  )
}

