import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { CreditCard, Folder, Minus, Pencil, Plus, Trash2 } from 'lucide-react'

const productSwatches = [
  { name: 'Primary', className: 'bg-gradient-to-br from-primary/70 to-primary' },
  { name: 'Secondary', className: 'bg-gradient-to-br from-secondary/70 to-secondary' },
  { name: 'Info', className: 'bg-gradient-to-br from-layer-info/70 to-layer-info' },
  { name: 'Success', className: 'bg-gradient-to-br from-layer-success/70 to-layer-success' },
  { name: 'Warning', className: 'bg-gradient-to-br from-layer-warning/70 to-layer-warning' },
  { name: 'Danger', className: 'bg-gradient-to-br from-layer-danger/70 to-layer-danger' },
  { name: 'Muted', className: 'bg-gradient-to-br from-muted/70 to-muted' },
  { name: 'Accent', className: 'bg-gradient-to-br from-accent/70 to-accent' },
  { name: 'Card', className: 'bg-gradient-to-br from-card/70 to-card' },
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
                <button
                  key={item.name}
                  className={[
                    'relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-primary-foreground p-3 shadow-sm border border-border active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5',
                    item.className,
                  ].join(' ')}
                >
                  <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">{item.name}</h3>
                  <p className="font-mono text-sm font-medium opacity-90">$4.50</p>
                </button>
              ))}
            </div>

            <Separator />

            {/* Actions Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Actions</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-layer-2 border border-border flex flex-col items-center justify-center p-3 shadow-sm text-foreground hover:bg-layer-3 transition-colors cursor-pointer active:scale-95">
                  <Plus className="h-8 w-8 mb-2 text-primary" />
                  <SettingsItemTitle className="font-sans font-semibold text-base tracking-tight text-center leading-tight">
                    Custom expense
                  </SettingsItemTitle>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-layer-2 border border-border flex flex-col items-center justify-center p-3 shadow-sm text-foreground hover:bg-layer-3 transition-colors cursor-pointer active:scale-95">
                  <Plus className="h-8 w-8 mb-2 text-primary" />
                  <SettingsItemTitle className="font-sans font-semibold text-base tracking-tight text-center leading-tight">
                    Custom item
                  </SettingsItemTitle>
                </div>
              </div>
            </div>

            {/* Folders Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Folders</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-layer-2 border border-border flex flex-col items-center justify-center p-3 shadow-sm text-foreground hover:bg-layer-3 transition-colors cursor-pointer active:scale-95">
                  <Folder className="h-8 w-8 mb-2 text-layer-info" />
                  <SettingsItemTitle className="font-sans font-semibold text-base tracking-tight text-center leading-tight">
                    Drinks
                  </SettingsItemTitle>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-layer-2 border border-border flex flex-col items-center justify-center p-3 shadow-sm text-foreground hover:bg-layer-3 transition-colors cursor-pointer active:scale-95">
                  <Folder className="h-8 w-8 mb-2 text-layer-info" />
                  <SettingsItemTitle className="font-sans font-semibold text-base tracking-tight text-center leading-tight">
                    Food
                  </SettingsItemTitle>
                </div>
              </div>
            </div>

            {/* Products Subsection */}
            <div className="space-y-3">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Products</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary border border-border flex flex-col items-center justify-center p-3 shadow-md text-primary-foreground">
                  <div className="absolute top-1.5 right-1.5 z-20">
                    <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-primary-foreground text-primary font-mono text-[10px] font-bold border-none shadow-sm">
                      1
                    </Badge>
                  </div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10 text-center">
                    <SettingsItemTitle className="font-sans font-semibold text-base text-primary-foreground tracking-tight">
                      Macchiato
                    </SettingsItemTitle>
                    <p className="font-mono text-sm opacity-80">$3.75</p>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 z-20">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 z-20">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border flex flex-col items-center justify-center p-3 shadow-md text-secondary-foreground">
                  <div className="absolute top-1.5 right-1.5 z-20">
                    <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-secondary-foreground text-secondary font-mono text-[10px] font-bold border-none shadow-sm">
                      2
                    </Badge>
                  </div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10 text-center">
                    <SettingsItemTitle className="font-sans font-semibold text-base text-secondary-foreground tracking-tight">
                      Cappuccino
                    </SettingsItemTitle>
                    <p className="font-mono text-sm opacity-80">$4.50</p>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 z-20">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-secondary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 z-20">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-secondary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
              <button
                key={`${item.name}-expense`}
                className={[
                  'relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-primary-foreground p-3 shadow-sm border border-border active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5',
                  item.className,
                ].join(' ')}
              >
                <h3 className="font-sans text-base font-semibold text-center leading-tight px-1 tracking-tight">{item.name}</h3>
              </button>
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

