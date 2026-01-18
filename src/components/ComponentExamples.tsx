import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'

import { Separator } from './ui/separator'
import {
  User,
  Mail,
  Bell,
  Settings,
  Search,
  ChevronDown,
  CreditCard,
  LogOut,
  Trash2,
  Store,
  Check,
  X,
  AlertTriangle,
  AlertCircle,
  Lock,
  Cloud,
  Shield,
  Zap,
  Plus,
  Minus,
  Folder,
  Printer,
  RotateCcw,
  Pencil,
  Coffee,
  Utensils,
  CupSoda,
  Camera,
  CheckCircle2,
  XCircle,
  FileQuestion,
  ShoppingCart,
  Star,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { SettingsGroup } from './settings/settings-group'
import {
  SettingsItem,
  SettingsItemIcon,
  SettingsItemContent,
  SettingsItemTitle,
  SettingsItemDescription,
  SettingsItemAction,
} from './settings/settings-item'
import { UserProfileRow } from './settings/user-profile-row'
import { SettingsFooter } from './settings/settings-footer'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { EmptyState } from './ui/empty-state'
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

// Helper components for demos
function OrderTabsDemo() {
  interface OrderTab {
    id: string
    label: string
    count: number
    type: 'dine-in' | 'takeout'
  }

  const [tabs, setTabs] = useState<OrderTab[]>([
    { id: "1", label: "Dine-in #4", count: 3, type: "dine-in" },
    { id: "2", label: "Takeout #5", count: 0, type: "takeout" },
    { id: "3", label: "Dine-in #6", count: 12, type: "dine-in" },
    { id: "4", label: "Dine-in #7", count: 0, type: "dine-in" },
    { id: "5", label: "Delivery #8", count: 4, type: "takeout" },
    { id: "6", label: "Bar #1", count: 0, type: "dine-in" },
  ])
  const [selectedId, setSelectedId] = useState("1")

  const handleAddTab = () => {
    const id = Math.random().toString(36).substr(2, 9)
    const num = tabs.length + 1
    const newTab: OrderTab = {
      id,
      label: `Order #${100 + num}`,
      count: 0,
      type: "dine-in"
    }
    setTabs([newTab, ...tabs])
    setSelectedId(id)
  }

  return (
    <div className="w-full max-w-3xl bg-layer-2 border border-border rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-3">
        {/* Pinned Add Button */}
        <button
          onClick={handleAddTab}
          className="flex-shrink-0 h-10 w-10 rounded-full bg-layer-3 hover:bg-layer-3/80 border border-border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="h-[18px] w-[18px] text-foreground" />
        </button>

        {/* Scrollable Tabs Area */}
        <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-right">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isSelected = selectedId === tab.id
              const hasItems = tab.count > 0

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedId(tab.id)}
                  className={`
                                        relative group flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all whitespace-nowrap select-none shrink-0
                                        ${isSelected
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-layer-1 hover:bg-layer-1/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                    }
                                    `}
                >
                  <span>{tab.label}</span>

                  {/* Badge */}
                  {hasItems && (
                    <span className={`
                                            flex items-center justify-center h-5 min-w-[20px] px-1 rounded text-[10px] font-bold leading-none
                                            ${isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                      }
                                        `}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mt-4 p-8 bg-layer-1/50 rounded-lg border border-border border-dashed flex items-center justify-center text-muted-foreground">
        Content for {tabs.find(t => t.id === selectedId)?.label}
      </div>
    </div>
  )
}

function OrderExpandableDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-[32px] border border-border bg-layer-2 shadow-2xl relative min-h-[110px]">
      {/* Collapsed View */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="bg-foreground text-background p-5 cursor-pointer active:scale-[0.98] transition-all relative group h-[110px] flex flex-col justify-center"
        >
          {/* Drag Handle */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-background/20 rounded-full" />

          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col">
              <span className="text-3xl font-bold font-sans tracking-tight">$18.50</span>
              <span className="text-[11px] text-background/60 font-sans mt-0.5 truncate max-w-[180px]">
                Cappuccino (2), Macchiato, Americano...
              </span>
            </div>
            <div className="h-10 w-10 flex items-center justify-center text-background/60 group-hover:text-background transition-colors">
              <ChevronDown className="h-7 w-7 rotate-180" />
            </div>
          </div>
        </div>
      )}

      {/* Expanded Content (Inline) */}
      {isOpen && (
        <div className="bg-foreground text-background flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold font-sans">Order #402 - Table 4</h2>
              </div>
              <div
                className="h-10 w-10 flex items-center justify-center text-background/60 hover:text-background transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <ChevronDown className="h-7 w-7" />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-background/60" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-6 custom-scrollbar">
            {/* Item 1 */}
            <SettingsItem className="border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
              <SettingsItemIcon>
                <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="h-full w-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-white/80" />
                  </div>
                </div>
              </SettingsItemIcon>
              <SettingsItemContent className="gap-2.5">
                <SettingsItemTitle className="text-white font-sans tracking-tight">Cappuccino</SettingsItemTitle>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 w-fit">
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Minus className="h-[18px] w-[18px]" /></Button>
                  <span className="font-bold px-2 text-sm text-white min-w-[20px] text-center font-mono">1</span>
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Plus className="h-[18px] w-[18px]" /></Button>
                </div>
              </SettingsItemContent>
              <SettingsItemAction className="self-start pt-0.5">
                <span className="text-sm font-mono font-bold text-white">$4.50</span>
              </SettingsItemAction>
            </SettingsItem>

            {/* Item 2 */}
            <SettingsItem className="border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
              <SettingsItemIcon>
                <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="h-full w-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-white/80" />
                  </div>
                </div>
              </SettingsItemIcon>
              <SettingsItemContent className="gap-2.5">
                <SettingsItemTitle className="text-white font-sans tracking-tight">Avocado Toast</SettingsItemTitle>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 w-fit">
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Minus className="h-[18px] w-[18px]" /></Button>
                  <span className="font-bold px-2 text-sm text-white min-w-[20px] text-center font-mono">1</span>
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Plus className="h-[18px] w-[18px]" /></Button>
                </div>
              </SettingsItemContent>
              <SettingsItemAction className="self-start pt-0.5">
                <span className="text-sm font-mono font-bold text-white">$12.00</span>
              </SettingsItemAction>
            </SettingsItem>

            {/* Item 3 */}
            <SettingsItem className="border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
              <SettingsItemIcon>
                <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1000&auto=format&fit=crop"
                    alt="Iced Matcha"
                    className="h-full w-full object-cover"
                  />
                </div>
              </SettingsItemIcon>
              <SettingsItemContent className="gap-2.5">
                <SettingsItemTitle className="text-white font-sans tracking-tight">Iced Matcha</SettingsItemTitle>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 w-fit">
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Minus className="h-[18px] w-[18px]" /></Button>
                  <span className="font-bold px-2 text-sm text-white min-w-[20px] text-center font-mono">2</span>
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-white/80 hover:bg-white/10"><Plus className="h-[18px] w-[18px]" /></Button>
                </div>
              </SettingsItemContent>
              <SettingsItemAction className="self-start pt-0.5">
                <span className="text-sm font-mono font-bold text-white">$11.00</span>
              </SettingsItemAction>
            </SettingsItem>
          </div>

          {/* Footer */}
          <div className="p-6 pt-5 bg-foreground border-t border-background/10">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-[11px] text-white/30 uppercase tracking-widest font-bold">
                <span>Subtotal</span>
                <span className="font-mono">$27.50</span>
              </div>
              <div className="flex justify-between text-[11px] text-white/30 uppercase tracking-widest font-bold">
                <span>Tax</span>
                <span className="font-mono">$2.40</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/5 mt-2">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Total</span>
                <div className="text-4xl font-mono font-bold text-white tracking-tighter leading-none">$29.90</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="h-14 rounded-2xl font-bold text-base hover:bg-secondary/20 shadow-none border-white/10">
                Pay Cash
              </Button>
              <Button variant="secondary" className="h-14 rounded-2xl font-bold text-base hover:bg-secondary/20 shadow-none border-white/10">
                Pay Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component for Check Lists
function PermissionItem({ allowed, children }: { allowed: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      {allowed ? (
        <CheckCircle2 className="h-[18px] w-[18px] text-green-500 shrink-0" />
      ) : (
        <XCircle className="h-[18px] w-[18px] text-red-500 shrink-0" />
      )}
      <span className="text-sm text-foreground leading-5">{children}</span>
    </div>
  )
}

interface ComponentExamplesProps {
  showHeader?: boolean
}

export function ComponentExamples({ showHeader = true }: ComponentExamplesProps) {
  const gradColors = [
    { name: "Blue sky", grad: "from-blue-400 via-blue-500 to-indigo-600", price: "$4.50" },
    { name: "Emerald sea", grad: "from-emerald-400 via-teal-500 to-cyan-600", price: "$3.25" },
    { name: "Sunset red", grad: "from-rose-400 via-red-500 to-orange-600", price: "$4.00" },
    { name: "Golden hour", grad: "from-amber-400 via-orange-500 to-yellow-600", price: "$5.00" },
    { name: "Royal purple", grad: "from-purple-400 via-violet-500 to-fuchsia-600", price: "$3.50" },
    { name: "Juicy orange", grad: "from-orange-400 via-amber-500 to-red-600", price: "$4.25" },
    { name: "Deep cyan", grad: "from-cyan-400 via-sky-500 to-blue-600", price: "$4.75" },
    { name: "Neon pink", grad: "from-pink-400 via-rose-500 to-purple-600", price: "$2.50" },
    { name: "Midnight indigo", grad: "from-indigo-400 via-blue-500 to-slate-600", price: "$3.75" },
    { name: "Lime punch", grad: "from-lime-400 via-green-500 to-emerald-600", price: "$4.10" },
    { name: "Teal dream", grad: "from-teal-400 via-emerald-500 to-green-600", price: "$4.20" },
    { name: "Soft stone", grad: "from-stone-400 via-stone-500 to-stone-600", price: "$4.30" },
    { name: "Layer 1", grad: "bg-none bg-layer-1 border border-border text-foreground", price: "$0.00" },
  ]

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

      <ButtonsExamplesCard />
      <SteppersExamplesCard />
      <SlidersExamplesCard />

      <ProductExpenseCardsExamplesCard />
      {false && (
      <Card id="product-expense-cards" className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Product/expense cards
          </CardTitle>
          <CardDescription>
            Interactive product cards with various states - optimized for mobile touch targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-16">
          {/* Product / Order Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b">
              <div className="text-base font-semibold">Product / order section</div>
              <p className="text-sm text-muted-foreground mt-1">Gradients, prices, and interactive quantity controls</p>
            </div>

            <div className="space-y-12">
              {/* Default - Gradient Variants (Name + Price) */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Default gradient palette (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={item.name}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
                        item.grad
                      )}
                    >
                      <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">{item.name}</h3>
                      <p className="font-mono text-sm font-medium opacity-90">{item.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Variants */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Interactive states & image variants</Label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Tapped Once - Color (Blue) */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-blue-500 border border-blue-600 flex flex-col items-center justify-center p-3 shadow-md hover:shadow-lg transition-shadow text-white">
                    <div className="absolute top-1.5 right-1.5 z-20">
                      <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-white text-blue-600 font-mono text-[10px] font-bold border-none shadow-sm">1</Badge>
                    </div>
                    <div className="h-full flex flex-col items-center justify-center relative z-10 text-center">
                      <SettingsItemTitle className="font-sans font-semibold text-base text-white tracking-tight">Macchiato</SettingsItemTitle>
                      <p className="font-mono text-sm opacity-80">$3.75</p>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-white" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-white" onClick={(e) => e.stopPropagation()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tapped Twice - Color (Purple) */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-purple-500 border border-purple-600 flex flex-col items-center justify-center p-3 shadow-md hover:shadow-lg transition-shadow text-white">
                    <div className="absolute top-1.5 right-1.5 z-20">
                      <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-white text-purple-600 font-mono text-[10px] font-bold border-none shadow-sm">2</Badge>
                    </div>
                    <div className="h-full flex flex-col items-center justify-center relative z-10 text-center">
                      <SettingsItemTitle className="font-sans font-semibold text-base text-white tracking-tight">Cappuccino</SettingsItemTitle>
                      <p className="font-mono text-sm opacity-80">$4.50</p>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-white" onClick={(e) => e.stopPropagation()}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/40 text-white" onClick={(e) => e.stopPropagation()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image Background - Tapped Once */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-1.5 right-1.5 z-20">
                      <Badge className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold shadow-md">1</Badge>
                    </div>
                    <div className="relative z-10 text-center drop-shadow-md">
                      <SettingsItemTitle className="font-sans text-white font-semibold text-base tracking-tight">Latte</SettingsItemTitle>
                      <p className="font-mono text-sm opacity-90">$4.75</p>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/40 hover:bg-black/60 text-white" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 z-20">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-lg bg-black/40 hover:bg-black/60 text-white" onClick={(e) => e.stopPropagation()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Expense Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b">
              <div className="text-base font-semibold">Expense section</div>
              <p className="text-sm text-muted-foreground mt-1">Clean cards with names only, no prices or controls</p>
            </div>

            <div className="space-y-12">
              {/* Default - Gradient Variants (Name Only) */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Expense gradient palette (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={`${item.name}-expense`}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
                        item.grad
                      )}
                    >
                      <h3 className="font-sans text-base font-semibold text-center leading-tight px-1 tracking-tight">{item.name}</h3>
                    </button>
                  ))}
                </div>
              </div>

              {/* Folders Variants */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Folder variants (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={`${item.name}-folder-ex`}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
                        item.grad
                      )}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Folder className="h-7 w-7 mb-2 opacity-95" />
                        <span className="font-sans text-base font-semibold leading-tight text-center tracking-tight">
                          {item.name} folder
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Border & Stroke Variants */}
          <div className="space-y-8">
            <div className="pb-4 border-b">
              <div className="text-base font-semibold">Border & stroke variants</div>
              <p className="text-sm text-muted-foreground mt-1">Different stroke styles for items and folders</p>
            </div>

            <div className="space-y-12">
              {/* Dashed Stroke */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Dashed stroke variants (long dashes)</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square rounded-2xl border-2 border-dashed bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm [border-style:dashed] [border-dasharray:12,8]">
                    <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Dashed item</h3>
                    <p className="font-mono text-sm opacity-70">$0.00</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl border-2 border-dashed bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm">
                    <Folder className="h-7 w-7 mb-2 opacity-70" />
                    <span className="font-sans text-base font-semibold text-center leading-tight tracking-tight">Dashed folder</span>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-2 border-2 border-dashed border-border shadow-sm group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/30" />
                    <h3 className="relative z-10 font-sans text-base font-semibold drop-shadow-sm text-center tracking-tight">Dashed image</h3>
                  </div>
                </div>
              </div>

              {/* Dotted Stroke */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Dotted stroke variants</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square rounded-2xl border-2 border-dotted bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm">
                    <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Dotted item</h3>
                    <p className="font-mono text-sm opacity-70">$0.00</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl border-2 border-dotted bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm">
                    <Folder className="h-7 w-7 mb-2 opacity-70" />
                    <span className="font-sans text-base font-semibold text-center leading-tight tracking-tight">Dotted folder</span>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-2 border-2 border-dotted border-border shadow-sm group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/30" />
                    <h3 className="relative z-10 font-sans text-base font-semibold drop-shadow-sm text-center tracking-tight">Dotted image</h3>
                  </div>
                </div>
              </div>

              {/* Solid Stroke */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Solid stroke variants</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square rounded-2xl border-2 bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm">
                    <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Solid item</h3>
                    <p className="font-mono text-sm opacity-70">$0.00</p>
                  </div>
                  <div className="relative aspect-square rounded-2xl border-2 bg-layer-1 border-border flex flex-col items-center justify-center p-3 text-foreground shadow-sm">
                    <Folder className="h-7 w-7 mb-2 opacity-70" />
                    <span className="font-sans text-base font-semibold text-center leading-tight tracking-tight">Solid folder</span>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-2 border-2 border-border shadow-sm group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/30" />
                    <h3 className="relative z-10 font-sans text-base font-semibold drop-shadow-sm text-center tracking-tight">Solid image</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Utility Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b">
              <div className="text-base font-semibold text-foreground">Utility section</div>
              <p className="text-sm text-muted-foreground mt-1">Special actions for adding items and expenses</p>
            </div>

            <div className="space-y-4">
              <Label className="text-[11px] font-bold tracking-tight text-muted-foreground">Custom creation variants (ghost)</Label>
              <div className="grid grid-cols-3 gap-3">
                {/* Custom Item */}
                <button className="relative aspect-square rounded-2xl overflow-hidden bg-layer-1 border-2 border-border hover:bg-layer-2 flex flex-col items-center justify-center text-foreground p-3 transition-all active:scale-95 shadow-sm group">
                  <Plus className="h-7 w-7 mb-1.5 group-hover:scale-110 transition-transform opacity-70" />
                  <SettingsItemTitle className="font-sans text-base font-semibold tracking-tight text-center">Custom item</SettingsItemTitle>
                </button>

                {/* Custom Expense */}
                <button className="relative aspect-square rounded-2xl overflow-hidden bg-layer-1 border-2 border-border hover:bg-layer-2 flex flex-col items-center justify-center text-foreground p-3 transition-all active:scale-95 shadow-sm group">
                  <Plus className="h-7 w-7 mb-1.5 group-hover:scale-110 transition-transform opacity-70" />
                  <SettingsItemTitle className="font-sans text-base font-semibold tracking-tight text-center">Custom expense</SettingsItemTitle>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      <BottomMenuExamplesCard />
      <SlidingSelectorExamplesCard />
      <SnackbarsExamplesCard />
      <DialogsExamplesCard />
      <SheetsExamplesCard />

      <RadioGroupsExamplesCard />
      <NumpadExamplesCard />
      <SecurityExamplesCard />
      <CheckboxesExamplesCard />
      <DropdownMenusExamplesCard />

      <InputsExamplesCard />
      <SwitchesExamplesCard />
      <DatePickerExamplesCard />
      <ColorPickerExamplesCard />
      <ColorSelectorExamplesCard />
      <BadgesExamplesCard />
      <TabsExamplesCard />
      <CardsExamplesCard />

      {/* Navigation Menu - Mobile Optimized */}
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

      {/* Stats Cards - Mobile Optimized */}
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


      <SettingsComponentsExamplesCard />
      {false && (
      <Card id="settings-components" className="border shadow-sm">
        <CardHeader>
          <CardTitle className=" text-lg font-semibold text-foreground">
            Settings components
          </CardTitle>
          <CardDescription>Specialized components for settings pages (SettingsGroup, SettingsItem, UserProfileRow)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground block">
              User profile row
            </Label>
            <SettingsGroup>
              <UserProfileRow
                name="Ghhh"
                email="holodroid23@gmail.com"
              />
            </SettingsGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground block">
              Settings group with items
            </Label>
            <SettingsGroup>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Store className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Inventory</SettingsItemTitle>
                  <SettingsItemDescription>Manage products and stock</SettingsItemDescription>
                </SettingsItemContent>
                <SettingsItemAction>
                  <ChevronDown className="h-4 w-4 text-muted-foreground rotate-270" />
                </SettingsItemAction>
              </SettingsItem>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Expenses</SettingsItemTitle>
                  <SettingsItemDescription>Track business spending</SettingsItemDescription>
                </SettingsItemContent>
              </SettingsItem>
            </SettingsGroup>

            <SettingsGroup>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <Settings className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>General</SettingsItemTitle>
                </SettingsItemContent>
              </SettingsItem>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Users</SettingsItemTitle>
                </SettingsItemContent>
              </SettingsItem>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <LogOut className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle className="text-red-600 dark:text-red-400">Log out</SettingsItemTitle>
                </SettingsItemContent>
              </SettingsItem>
            </SettingsGroup>

            <SettingsFooter version="VERSION 2.4.1" build="89" />
          </div>
        </CardContent>
      </Card>
      )}

      <ElevationsExamplesCard />

      <BuildingBlocksExamplesCard />
      {false && (
      <Card id="building-blocks" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Building blocks</CardTitle>
          <CardDescription>Atomic elements: icons and avatars with standardized sizes</CardDescription>
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">?? Design rule: Outline icons only</p>
            <p className="text-xs text-amber-800 dark:text-amber-300">Always use outline/stroke variants of icons. Never use filled icons. This ensures visual consistency across the entire design system.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-12">
          {/* Raw Icons */}
          <div id="icons" className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Standardized icons</h3>
              <p className="text-xs text-muted-foreground">Raw icon sizes (12px, 18px, 24px, 30px)</p>
            </div>
            <div className="flex flex-wrap items-end gap-8 p-6 bg-layer-2 border border-border rounded-xl">
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-3 h-3" />
                </div>
                <span className="text-xs text-muted-foreground">Small (12px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-3 h-3</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-[18px] h-[18px]" />
                </div>
                <span className="text-xs text-muted-foreground">Regular (18px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-[18px] h-[18px]</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="text-xs text-muted-foreground">Big (24px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-6 h-6</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-[30px] h-[30px]" />
                </div>
                <span className="text-xs text-muted-foreground">Huge (30px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-[30px] h-[30px]</code>
              </div>
            </div>
          </div>

          <Separator />

          {/* Icons with Background */}
          <div id="icons-with-background" className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Icons with background</h3>
              <p className="text-xs text-muted-foreground">Standardized containers for lists and feedback</p>
            </div>
            <div className="space-y-8">
              {/* Small Icons (List/Action size) */}
              <div className="space-y-4">
                <div className="text-sm font-medium">Small (36px) - Common colors</div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-layer-info dark:bg-blue-900/30 flex items-center justify-center text-on-layer-info dark:text-blue-400">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-layer-success dark:bg-emerald-900/30 flex items-center justify-center text-on-layer-success dark:text-emerald-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-layer-warning dark:bg-amber-900/30 flex items-center justify-center text-on-layer-warning dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-layer-danger dark:bg-red-900/30 flex items-center justify-center text-on-layer-danger dark:text-red-400">
                    <X className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-layer-recent dark:bg-purple-900/30 flex items-center justify-center text-on-layer-recent dark:text-purple-400">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Medium Icons (Role Variants) */}
              <div className="space-y-4">
                <div className="text-sm font-medium">Medium (48px) - Role & action variants</div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Store className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Large Icons */}
              <div className="space-y-4">
                <div className="text-sm font-medium">Large (60px) - Empty states & feedback</div>
                <div className="flex flex-wrap gap-8 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-success dark:bg-emerald-900/20 flex items-center justify-center text-on-layer-success dark:text-emerald-500">
                      <Check className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Success</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-danger dark:bg-red-900/20 flex items-center justify-center text-on-layer-danger dark:text-red-500">
                      <X className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Error</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-info dark:bg-blue-900/10 flex items-center justify-center text-on-layer-info dark:text-blue-500">
                      <Lock className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Empty / secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-warning dark:bg-amber-900/20 flex items-center justify-center text-on-layer-warning dark:text-amber-500">
                      <AlertCircle className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Alert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Avatars */}
          <div id="avatars-sub" className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Avatars</h3>
              <p className="text-xs text-muted-foreground">User profile images with size variants</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="text-sm font-medium">Small size (36px)</div>
                <div className="flex items-center gap-3">
                  <Avatar variant="primary" size="small">
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="small">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="small" online>
                    <AvatarImage src="https://i.pravatar.cc/150?u=morty" alt="Morty" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Medium size (48px)</div>
                <div className="flex items-center gap-3">
                  <Avatar variant="primary" size="medium">
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="medium">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="medium" online>
                    <AvatarImage src="https://i.pravatar.cc/150?u=morty" alt="Morty" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Large size (60px)</div>
                <div className="flex items-center gap-3">
                  <Avatar variant="primary" size="large">
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="large">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar variant="primary" size="large" online>
                    <AvatarImage src="https://i.pravatar.cc/150?u=morty" alt="Morty" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      <AtomicItemsExamplesCard />
      {false && (
      <Card id="atomic-items" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Atomic items</CardTitle>
          <CardDescription>Examples of complex items built from atoms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Simple Text Item */}
          <SettingsItem className="border border-border rounded-xl">
            <SettingsItemContent>
              <SettingsItemTitle>Simple text item</SettingsItemTitle>
            </SettingsItemContent>
          </SettingsItem>

          {/* Toggle Option */}
          <SettingsItem className="border border-border rounded-xl">
            <SettingsItemContent>
              <SettingsItemTitle>Toggle option</SettingsItemTitle>
              <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Switch />
            </SettingsItemAction>
          </SettingsItem>

          {/* User Profile */}
          <SettingsItem className="border border-border rounded-xl">
            <SettingsItemIcon>
              <Avatar size="small">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>User profile</SettingsItemTitle>
              <SettingsItemDescription>manage account settings</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
              </Button>
            </SettingsItemAction>
          </SettingsItem>

          {/* Analytics */}
          <SettingsItem className="border border-border rounded-xl">
            <SettingsItemIcon>
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
              </div>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Analytics</SettingsItemTitle>
              <SettingsItemDescription>View latest reports</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <div className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">New</div>
            </SettingsItemAction>
          </SettingsItem>

          {/* Kitchen Printer */}
          <SettingsItem className="border border-border rounded-xl items-start">
            <SettingsItemIcon>
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m2 22 1-1h3l9-9" /><path d="M3 21v-8" /><path d="M16 4.04 11 9" /><path d="m2 22 1-1h3l9-9" /><path d="M3 21v-8" /><path d="M22 7 15 2l-1 1-1 1 5 5 4-2Z" /> <path d="M6 14h12c2 0 3-1 3-3V7c0-2-1-3-3-3H6C4 4 3 5 3 7v4c0 2 1 3 3 3Z" /><path d="M6 18h12" /></svg>
              </div>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Kitchen printer</SettingsItemTitle>
              <SettingsItemDescription className="text-emerald-500 font-medium">Connected</SettingsItemDescription>
              <div className="flex items-center gap-2 pt-2">
                <Button variant="secondary" size="sm">Test</Button>
                <Button variant="destructive" size="sm">Reset</Button>
              </div>
            </SettingsItemContent>
          </SettingsItem>

          {/* Administrator Role Item */}
          <SettingsItem className="border-none bg-transparent px-0 shadow-none">
            <SettingsItemIcon>
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Shield className="h-6 w-6" />
              </div>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle className="text-lg">Administrator</SettingsItemTitle>
              <SettingsItemDescription>God mode. Full system access.</SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>

          {/* Manager Role Item */}
          <SettingsItem className="border-none bg-transparent px-0 shadow-none">
            <SettingsItemIcon>
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <User className="h-6 w-6" />
              </div>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle className="text-lg">Manager</SettingsItemTitle>
              <SettingsItemDescription>Daily operations focus.</SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>

          {/* Cashier Role Item */}
          <SettingsItem className="border-none bg-transparent px-0 shadow-none">
            <SettingsItemIcon>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Store className="h-6 w-6" />
              </div>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle className="text-lg">Cashier</SettingsItemTitle>
              <SettingsItemDescription>Register focus. Strictly for processing sales.</SettingsItemDescription>
            </SettingsItemContent>
          </SettingsItem>
        </CardContent>
      </Card>
      )}

      <SectionTitlesExamplesCard />
      {false && (
      <Card id="section-titles" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Section titles</CardTitle>
          <CardDescription>Standardized headers (h3, 18px Regular Semibold)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Variant 1: Text Only */}
          <div className="p-4 bg-layer-2 rounded-xl border border-border">
            <h2 className="text-xl font-semibold text-foreground">Todays expenses</h2>
          </div>

          {/* Variant 2: With Dropdown Trigger */}
          <div className="p-4 bg-layer-2 rounded-xl border border-border">
            <div className="flex items-center justify-between cursor-pointer group">
              <h2 className="text-xl font-semibold text-foreground">Today expenses</h2>
              <ChevronDown className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>

          {/* Variant 3: With Back Navigation */}
          <div className="p-4 bg-layer-2 rounded-xl border border-border">
            <div className="flex items-center gap-3 cursor-pointer group">
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="text-xl font-semibold text-foreground">Monthly utilities</h2>
            </div>
          </div>

          {/* Variant 4: With Leading Icon */}
          <div className="p-4 bg-layer-2 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <Star className="h-[18px] w-[18px] text-blue-500" />
              <h3 className="text-lg font-semibold text-foreground">Favorites</h3>
            </div>
          </div>

          {/* Variant 5: Text Only (Alternative) */}
          <div className="p-4 bg-layer-2 rounded-xl border border-border">
            <h3 className="text-lg font-semibold text-foreground">Favorites</h3>
          </div>
        </CardContent>
      </Card>
      )}

      <ProductExpenseItemsDsExamplesCard />
      {false && (
      <Card id="product-expense-items-ds" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Product / expense card items</CardTitle>
          <CardDescription>Special variants designed for order and expense management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {/* Iced Matcha Card Item */}
            <SettingsItem className="bg-layer-2 border border-border rounded-xl p-3 h-auto min-h-0 items-center">
              <SettingsItemIcon>
                <div className="h-9 w-9 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1000&auto=format&fit=crop"
                    className="h-full w-full object-cover"
                    alt="Iced Matcha"
                  />
                </div>
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

            {/* Cappuccino Card Item */}
            <SettingsItem className="bg-layer-2 border border-border rounded-xl p-3 h-auto min-h-0 items-center">
              <SettingsItemIcon>
                <div className="h-9 w-9 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop"
                    className="h-full w-full object-cover"
                    alt="Cappuccino"
                  />
                </div>
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Cappuccino</SettingsItemTitle>
              </SettingsItemContent>
              <SettingsItemAction className="flex items-center gap-6">
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-foreground">
                  <Pencil className="h-[18px] w-[18px]" />
                </Button>
                <span className="text-sm font-mono font-bold text-foreground">$4.50</span>
              </SettingsItemAction>
            </SettingsItem>
          </div>
        </CardContent>
      </Card>
      )}


      <BadgesTokensCard />


      {/* Avatars Section */}






      <AccordionsExamplesCard />
      {false && (
      <Card id="accordions" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Complex accordions</CardTitle>
          <CardDescription>Expandable lists with rich content (Expenses & Orders)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Expenses Example */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expenses</h3>
              <div className="space-y-3">


                {/* Yesterday Header (Expanded) */}
                <Collapsible defaultOpen className="bg-layer-2 rounded-xl border border-border overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-layer-1/50 transition-colors group">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">Yesterday</span>
                          <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                        </div>
                        <span className="text-xs text-muted-foreground">3 expenses</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-medium text-sm">$1,304.50</div>
                        <Badge variant="destructive">4 Edits</Badge>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="divide-y divide-border/50 border-t border-border">
                      {/* Whole Milk ITEM */}
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SettingsItem className="pl-6 cursor-pointer bg-layer-2 transition-colors border-t border-border/50 first:border-0 rounded-none h-auto min-h-0 py-3">
                            <SettingsItemContent>
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-base font-semibold">Whole Milk</SettingsItemTitle>
                                <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                              </div>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$4.50</span>
                            </SettingsItemAction>
                          </SettingsItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="bg-layer-1/30 px-6 py-4 space-y-3 text-sm border-t border-border/50">
                            <div className="space-y-1">
                              <div className="flex justify-between text-muted-foreground">
                                <span>Created by:</span>
                                <span className="text-foreground">Sarah Jackson</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Time:</span>
                                <span className="text-foreground">Yesterday at 10:42 AM</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Note:</span>
                                <span className="text-foreground">put some text here</span>
                              </div>
                            </div>
                            <div className="flex justify-end pt-2">
                              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Rent ITEM */}
                      <Collapsible defaultOpen className="relative">
                        <CollapsibleTrigger asChild>
                          <SettingsItem className="relative pl-6 cursor-pointer bg-layer-2 transition-colors rounded-none h-auto min-h-0 py-3">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 -ml-px z-10" />
                            <SettingsItemContent>
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-base font-semibold">Rent</SettingsItemTitle>
                                <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                              </div>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$1,250.00</span>
                            </SettingsItemAction>
                          </SettingsItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="bg-layer-1/30 px-6 py-4 space-y-4 text-sm border-t border-border/50">
                            <div className="space-y-1">
                              <div className="flex justify-between text-muted-foreground">
                                <span>Created by:</span>
                                <span className="text-foreground">Freddy Gasper</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Time:</span>
                                <span className="text-foreground">Yesterday at 10:50 AM</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Note:</span>
                                <span className="text-foreground">Monthly Office Rent</span>
                              </div>
                            </div>

                            {/* History Log */}
                            <div className="space-y-2 pt-2">
                              <div className="flex gap-2 text-xs text-muted-foreground items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                <p>Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM</p>
                              </div>
                            </div>

                            <div className="flex justify-end pt-2">
                              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Coffee Beans ITEM */}
                      <Collapsible defaultOpen className="relative">
                        <CollapsibleTrigger asChild>
                          <SettingsItem className="relative pl-6 cursor-pointer bg-layer-2 transition-colors rounded-none h-auto min-h-0 py-3">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 -ml-px z-10" />
                            <SettingsItemContent>
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-base font-semibold line-through">Coffee Beans</SettingsItemTitle>
                                <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                              </div>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm line-through">$50.00</span>
                            </SettingsItemAction>
                          </SettingsItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="bg-layer-1/30 px-6 py-4 space-y-4 text-sm border-t border-border/50">
                            <div className="space-y-1">
                              <div className="flex justify-between text-muted-foreground">
                                <span>Created by:</span>
                                <span className="text-foreground">Sarah Jackson</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Time:</span>
                                <span className="text-foreground">Yesterday at 09:15 AM</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Note:</span>
                                <span className="text-foreground">Dark Roast</span>
                              </div>
                            </div>

                            {/* History Log */}
                            <div className="space-y-2 pt-2">
                              <div className="flex gap-2 text-xs text-muted-foreground items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                <p>Sarah Jackson changed price from <span className="line-through">$45.00</span> to $50.00 at Yesterday at 09:20 AM</p>
                              </div>
                              <div className="flex gap-2 text-xs text-muted-foreground items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                <p>Sarah Jackson changed note from "Light Roast" to "Dark Roast" at Yesterday at 09:20 AM</p>
                              </div>
                              <div className="flex gap-2 text-xs text-muted-foreground items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                <p>Sarah Jackson deleted expense at Yesterday at 09:25 AM</p>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>


                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Orders Example */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Orders</h3>
              <div className="space-y-3">


                <div className="space-y-3">


                  {/* Order #402 (Expanded) */}
                  <Collapsible defaultOpen className="bg-layer-2 rounded-xl border border-border overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-layer-1/50 transition-colors group">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">Order #402</span>
                            <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                          </div>
                          <span className="text-xs text-muted-foreground">10:42 AM</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium text-sm">$29.90</div>
                          <Badge variant="destructive">Refunded</Badge>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-5 pb-5 pt-0 space-y-5 bg-layer-1/20 border-t border-dashed border-border/50">
                        {/* Order Items */}
                        <div className="space-y-1.5 pt-4">
                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Coffee className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Cappuccino</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$4.50</span>
                            </SettingsItemAction>
                          </SettingsItem>

                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Utensils className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Avocado Toast</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$12.00</span>
                            </SettingsItemAction>
                          </SettingsItem>

                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <CupSoda className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Iced Matcha</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$11.00</span>
                            </SettingsItemAction>
                          </SettingsItem>
                        </div>

                        <div className="h-px bg-border/50" />

                        {/* Order Details */}
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created by:</span>
                            <span>Sarah Jackson</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Custom name:</span>
                            <span>Table 1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment method:</span>
                            <span>Visa •••• 4242</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processed by:</span>
                            <span>karel martinek</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Refunded by:</span>
                            <span>Mike Ross</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reason:</span>
                            <span>Damaged item</span>
                          </div>
                        </div>

                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Duplicate Order #402 (Without status) */}
                  <Collapsible className="bg-layer-2 rounded-xl border border-border overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-layer-1/50 transition-colors group">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">Order #402</span>
                            <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                          </div>
                          <span className="text-xs text-muted-foreground">10:42 AM</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium text-sm">$29.90</div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-5 pb-5 pt-0 space-y-5 bg-layer-1/20 border-t border-dashed border-border/50">
                        {/* Order Items */}
                        <div className="space-y-1.5 pt-4">
                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Coffee className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Cappuccino</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$4.50</span>
                            </SettingsItemAction>
                          </SettingsItem>

                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Utensils className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Avocado Toast</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$12.00</span>
                            </SettingsItemAction>
                          </SettingsItem>

                          <SettingsItem className="px-0 h-auto min-h-0 py-2 border-b border-border/50 last:border-0 rounded-none group">
                            <SettingsItemIcon>
                              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <CupSoda className="h-[18px] w-[18px]" />
                              </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                              <SettingsItemTitle className="text-base font-semibold">Iced Matcha</SettingsItemTitle>
                              <SettingsItemDescription>Qty: 1</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                              <span className="font-mono text-sm">$11.00</span>
                            </SettingsItemAction>
                          </SettingsItem>
                        </div>

                        <div className="h-px bg-border/50" />

                        {/* Order Details */}
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created by:</span>
                            <span>Sarah Jackson</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Custom name:</span>
                            <span>Table 1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment Method:</span>
                            <span>Visa •••• 4242</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processed by:</span>
                            <span>karel martinek</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="secondary" className="gap-2">
                            <Printer className="h-[18px] w-[18px]" />
                            Print
                          </Button>
                          <Button variant="destructive" className="gap-2">
                            <RotateCcw className="h-[18px] w-[18px]" />
                            Refund
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>




                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      )}


      <OrderExpandableExamplesCard />
      {false && (
      <Card id="order-expandable" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Expandable order summary</CardTitle>
          <CardDescription>Persistent bottom bar that expands into a full order view</CardDescription>
        </CardHeader>
        <CardContent className="bg-muted p-12 flex items-center justify-center">
          <OrderExpandableDemo />
        </CardContent>
      </Card>
      )}


      <OrderTabsExamplesCard />
      {false && (
      <Card id="order-tabs" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Order tabs</CardTitle>
          <CardDescription>Specialized tab interface for order management</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderTabsDemo />
        </CardContent>
      </Card>
      )}

      <MediaUploadExamplesCard />
      {false && (
      <Card id="media-upload" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Media upload</CardTitle>
          <CardDescription>Upload component with multiple actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square w-full max-w-[320px] rounded-[32px] border-2 border-dashed border-border p-8 flex flex-col items-center justify-center gap-8 bg-layer-2/50 hover:bg-layer-2 transition-all duration-300 group mx-auto text-center">
            <div className="h-20 w-20 rounded-[24px] bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
              <Camera className="h-10 w-10" />
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Button variant="ghost">Choose from files</Button>
              <Button variant="ghost">Take photo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      )}



      <CheckListsExamplesCard />
      {false && (
      <Card id="check-lists" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Check lists</CardTitle>
          <CardDescription>Permission lists and status checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Manager Permissions */}
          <div className="bg-layer-2/50 border border-border rounded-2xl p-5 space-y-3">
            <PermissionItem allowed={true}>Update inventory levels & stock alerts</PermissionItem>
            <PermissionItem allowed={true}>View operational performance dashboards</PermissionItem>
            <PermissionItem allowed={true}>Full access to back office</PermissionItem>
            <PermissionItem allowed={true}>Refund yesterday and older orders</PermissionItem>
            <PermissionItem allowed={true}>Edit and delete yesterday and older expenses</PermissionItem>
            <PermissionItem allowed={true}>Access settings</PermissionItem>
            <PermissionItem allowed={false}>Restricted from payment, user settings, and account deletion</PermissionItem>
          </div>

          {/* Cashier Permissions */}
          <div className="bg-layer-2/50 border border-border rounded-2xl p-5 space-y-3">
            <PermissionItem allowed={true}>Refund and edit today's expenses</PermissionItem>
            <PermissionItem allowed={false}>No access to back office</PermissionItem>
            <PermissionItem allowed={false}>Cannot edit or delete yesterday and older expenses</PermissionItem>
            <PermissionItem allowed={false}>Cannot refund yesterday and older orders</PermissionItem>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Icons with Background */}
      <EmptyStatesExamplesCard />
      {false && (
      <Card id="empty-states" className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Empty states</CardTitle>
          <CardDescription>Placeholders for when no data is available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <EmptyState
              icon={Search}
              title="No results found"
              description="We couldn't find any items matching your search terms. Please try again with different keywords."
              action={
                <Button variant="secondary" onClick={() => { }}>Clear search</Button>
              }
            />

            <EmptyState
              icon={FileQuestion}
              title="No expenses yet"
              description="Create your first expense tracking record to see analytics here."
              action={
                <Button onClick={() => { }} className="gap-2">
                  <Plus className="h-3 w-3" />
                  Add expense
                </Button>
              }
            />

            <EmptyState
              icon={ShoppingCart}
              title="Your cart is empty"
              description="Looks like you haven't added any items to the cart yet."
              action={
                <div className="flex flex-col gap-3 w-full">
                  <Button variant="ghost" onClick={() => { }} className="w-full">View menu</Button>
                  <Button onClick={() => { }} className="w-full">Start order</Button>
                </div>
              }
            />

            <EmptyState
              className="border-solid border-layer-3 bg-layer-1"
              title="Connection lost"
              description="Please check your internet connection and try again."
              action={
                <a href="#" className="text-primary hover:underline text-sm font-medium">
                  Troubleshoot connection
                </a>
              }
            />
          </div>
        </CardContent>
      </Card>
      )}



      <DividersExamplesCard />

      <EmailTemplatesExamplesCard />
      <ReceiptExamplesCard />


    </div >
  )
}

