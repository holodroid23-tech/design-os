import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

import { Separator } from './ui/separator'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { RadioButtonGroup, RadioButtonGroupItem } from './ui/radio-button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu'
import { DatePicker } from './ui/date-picker'
import { ColorPicker } from './ui/color-picker'
import { ColorSelector, ColorSelectorItem } from './ui/color-selector'
import { Numpad } from './ui/numpad'
import { PinEntry } from './ui/pin-entry'
import { Stepper } from './ui/stepper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import {
  BottomMenu,
  BottomMenuContent,
  BottomMenuItem,
  BottomMenuSeparator,
  BottomMenuSection,
  BottomMenuTrigger,
} from './ui/bottom-menu'
import {
  User,
  Mail,
  Bell,
  Settings,
  Search,
  Download,
  Heart,
  Share2,
  ChevronDown,
  MoreVertical,
  CreditCard,
  Menu,
  LogOut,
  Edit,
  Trash2,
  Store,
  BarChart3,
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
import { SlidingSelector } from './ui/sliding-selector'
import { SearchInputWithSuggestions } from "./ui/search-input-with-suggestions"
import { toast } from 'sonner'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { SettingsGroup } from './settings/settings-group'
import {
  SettingsItem,
  SettingsItemIcon,
  SettingsItemContent,
  SettingsItemTitle,
  SettingsItemDescription,
  SettingsItemAction,
} from './ui/settings-item'
import { UserProfileRow } from './settings/user-profile-row'
import { SettingsFooter } from './settings/settings-footer'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { EmptyState } from './ui/empty-state'
import { EmailTemplatePreview } from '@/components/previews/EmailTemplatePreview'
import { ReceiptPreview } from '@/components/previews/ReceiptPreview'

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
          className="bg-[#0c141c] text-white p-5 cursor-pointer active:scale-[0.98] transition-all relative group h-[110px] flex flex-col justify-center"
        >
          {/* Drag Handle */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />

          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col">
              <span className="text-3xl font-bold font-sans tracking-tight">$18.50</span>
              <span className="text-[11px] text-white/50 font-sans mt-0.5 truncate max-w-[180px]">
                Cappuccino (2), Macchiato, Americano...
              </span>
            </div>
            <div className="h-10 w-10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
              <ChevronDown className="h-7 w-7 rotate-180" />
            </div>
          </div>
        </div>
      )}

      {/* Expanded Content (Inline) */}
      {isOpen && (
        <div className="bg-[#0c141c] text-white flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold font-sans">Order #402 - Table 4</h2>
              </div>
              <div
                className="h-10 w-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <ChevronDown className="h-7 w-7" />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-white/40" />
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
            <SettingsItem className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
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
            <SettingsItem className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
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
            <SettingsItem className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 items-start">
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
          <div className="p-6 pt-5 bg-[#0c141c] border-t border-white/10">
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
  const [inputValue, setInputValue] = useState('')
  const [selectedRadio, setSelectedRadio] = useState('option1')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [dropdownValue, setDropdownValue] = useState('option1')
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [selectorValue, setSelectorValue] = useState<string | number>('option1')
  const [isMultiSelectorOpen, setIsMultiSelectorOpen] = useState(false)
  const [multiSelectorValue, setMultiSelectorValue] = useState<(string | number)[]>(['option1', 'option2'])
  const [priceValue, setPriceValue] = useState('0')
  const [sliderValue, setSliderValue] = useState([50])

  interface TaxItem {
    id: string
    label: string
    rate: string
  }

  const [useTaxes, setUseTaxes] = useState(true)
  const [taxes, setTaxes] = useState<TaxItem[]>([
    { id: "1", label: "VAT standard", rate: "21%" },
    { id: "2", label: "Service charge", rate: "10%" },
    { id: "3", label: "Luxury tax", rate: "15%" },
    { id: "4", label: "New tax", rate: "10%" },
  ])
  const [selectedTaxId, setSelectedTaxId] = useState<string | null>(taxes.length > 1 ? taxes[0].id : null)

  const handleRemoveTax = (id: string) => {
    const newTaxes = taxes.filter((tax) => tax.id !== id)
    setTaxes(newTaxes)
    if (newTaxes.length <= 1) {
      setSelectedTaxId(null)
    } else if (selectedTaxId === id) {
      setSelectedTaxId(newTaxes[0].id)
    }
  }

  const handleAddTax = () => {
    const newId = Math.random().toString(36).substring(2, 9)
    const newTaxes = [...taxes, { id: newId, label: "New tax", rate: "10%" }]
    setTaxes(newTaxes)
    if (newTaxes.length > 1 && !selectedTaxId) {
      setSelectedTaxId(newTaxes[0].id)
    }
  }

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
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Component Examples
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Comprehensive UI components optimized for mobile and desktop
          </p>
        </div>
      )}

      {/* Buttons - Mobile Optimized */}
      <Card id="buttons" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Buttons
          </CardTitle>
          <CardDescription>Various button styles and sizes (min 48px touch target)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Primary CTA button
              </Label>
              <Button
                className="min-h-[48px] sm:min-h-0 text-white hover:opacity-90"
              >
                Primary action
              </Button>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Button variants
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button className="min-h-[48px] sm:min-h-0">Default</Button>
                <Button variant="secondary" className="min-h-[48px] sm:min-h-0">Secondary</Button>
                <Button variant="destructive" className="min-h-[48px] sm:min-h-0">Destructive</Button>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">Ghost</Button>
                <Button variant="invisible" className="min-h-[48px] sm:min-h-0">Invisible</Button>
                <Button variant="link" className="min-h-[48px] sm:min-h-0">Link</Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Button sizes
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" className="min-h-[48px] sm:min-h-0">Small</Button>
                <Button size="default" className="min-h-[48px] sm:min-h-0">Default</Button>
                <Button size="lg" className="min-h-[48px] sm:min-h-0">Large</Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Buttons with icons
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button className="min-h-[48px] sm:min-h-0">
                  <Download className="h-4 w-4" />
                  With icon
                </Button>
                <Button variant="secondary" className="min-h-[48px] sm:min-h-0">
                  <Mail className="h-4 w-4" />
                  Send email
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Disabled state
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button disabled className="min-h-[48px] sm:min-h-0">Disabled</Button>
                <Button disabled variant="secondary" className="min-h-[48px] sm:min-h-0">Disabled secondary</Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Icon-only buttons (all variants)
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
                <Button variant="invisible" size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steppers */}
      <Card id="steppers" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Steppers
          </CardTitle>
          <CardDescription>Segmented progress indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Primary variant
            </Label>
            <Stepper value={2} max={4} variant="primary" />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Success variant
            </Label>
            <Stepper value={4} max={4} variant="success" />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Destructive variant
            </Label>
            <Stepper value={0} max={4} variant="destructive" />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Custom label
            </Label>
            <Stepper value={3} max={5} variant="warning" labelSuffix="stages completed" />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Continuous mode
            </Label>
            <Stepper value={3} max={5} variant="primary" mode="continuous" />
          </div>
        </CardContent>
      </Card>

      <Card id="sliders" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Sliders
          </CardTitle>
          <CardDescription>Adjustable values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Opacity
              </Label>
              <span className="text-sm text-stone-500 dark:text-stone-400 font-mono">
                {sliderValue[0]}%
              </span>
            </div>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              value={sliderValue}
              onValueChange={setSliderValue}
            />
          </div>
        </CardContent>
      </Card>

      {/* Product/Expense Cards */}
      <Card id="product-expense-cards" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Product/expense cards
          </CardTitle>
          <CardDescription>
            Interactive product cards with various states - optimized for mobile touch targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-16">
          {/* Product / Order Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="text-base font-semibold text-stone-900 dark:text-stone-100">Product / order section</div>
              <p className="text-sm text-stone-500 mt-1">Gradients, prices, and interactive quantity controls</p>
            </div>

            <div className="space-y-12">
              {/* Default - Gradient Variants (Name + Price) */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Default gradient palette (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={item.name}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-stone-100/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
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
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Interactive states & image variants</Label>
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

          <Separator className="bg-stone-200 dark:bg-stone-800" />

          {/* Expense Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="text-base font-semibold text-stone-900 dark:text-stone-100">Expense section</div>
              <p className="text-sm text-stone-500 mt-1">Clean cards with names only, no prices or controls</p>
            </div>

            <div className="space-y-12">
              {/* Default - Gradient Variants (Name Only) */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Expense gradient palette (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={`${item.name}-expense`}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-stone-100/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
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
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Folder variants (13 colors)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {gradColors.map((item) => (
                    <button
                      key={`${item.name}-folder-ex`}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center text-white p-3 shadow-sm border border-stone-100/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5",
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

          <Separator className="bg-stone-200 dark:bg-stone-800" />

          {/* Border & Stroke Variants */}
          <div className="space-y-8">
            <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="text-base font-semibold text-stone-900 dark:text-stone-100">Border & stroke variants</div>
              <p className="text-sm text-stone-500 mt-1">Different stroke styles for items and folders</p>
            </div>

            <div className="space-y-12">
              {/* Dashed Stroke */}
              <div className="space-y-4">
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Dashed stroke variants (long dashes)</Label>
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
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Dotted stroke variants</Label>
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
                <Label className="text-[11px] font-bold tracking-tight text-stone-400">Solid stroke variants</Label>
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

          <Separator className="bg-stone-200 dark:bg-stone-800" />

          {/* Utility Section */}
          <div className="space-y-8">
            <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="text-base font-semibold text-stone-900 dark:text-stone-100">Utility section</div>
              <p className="text-sm text-stone-500 mt-1">Special actions for adding items and expenses</p>
            </div>

            <div className="space-y-4">
              <Label className="text-[11px] font-bold tracking-tight text-stone-400">Custom creation variants (ghost)</Label>
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

      {/* Bottom Menu - Mobile Optimized */}
      <Card id="bottom-menu" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Bottom sliding menu
          </CardTitle>
          <CardDescription>
            Slide-up menu cards from bottom - perfect alternative to dropdowns on mobile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Simple bottom menu
              </Label>
              <BottomMenu>
                <BottomMenuTrigger asChild>
                  <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                    <Menu className="h-4 w-4 mr-2" />
                    Open Bottom Menu
                  </Button>
                </BottomMenuTrigger>
                <BottomMenuContent>
                  <BottomMenuSection>
                    <BottomMenuItem>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </BottomMenuItem>
                    <BottomMenuItem>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </BottomMenuItem>
                    <BottomMenuItem>
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </BottomMenuItem>
                  </BottomMenuSection>
                  <BottomMenuSeparator />
                  <BottomMenuSection>
                    <BottomMenuItem>
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </BottomMenuItem>
                  </BottomMenuSection>
                </BottomMenuContent>
              </BottomMenu>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Bottom menu with header
              </Label>
              <BottomMenu>
                <BottomMenuTrigger asChild>
                  <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                    <MoreVertical className="h-4 w-4 mr-2" />
                    Menu with Header
                  </Button>
                </BottomMenuTrigger>
                <BottomMenuContent showHeader>
                  <BottomMenuSection title="Account">
                    <BottomMenuItem>
                      <User className="h-4 w-4" />
                      <span>View Profile</span>
                    </BottomMenuItem>
                    <BottomMenuItem>
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </BottomMenuItem>
                  </BottomMenuSection>
                  <BottomMenuSeparator />
                  <BottomMenuSection title="Actions">
                    <BottomMenuItem>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="text-destructive">Delete Account</span>
                    </BottomMenuItem>
                  </BottomMenuSection>
                </BottomMenuContent>
              </BottomMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sliding Selector */}
      <Card id="sliding-selector" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Sliding selector
          </CardTitle>
          <CardDescription>
            iOS-style bottom picker for single selection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Single selection
              </Label>
              <Button
                variant="ghost"
                className="w-full justify-between min-h-[48px] sm:min-h-0"
                onClick={() => setIsSelectorOpen(true)}
              >
                <span>{selectorValue ? `Selected: ${selectorValue}` : 'Select an option'}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
              <SlidingSelector
                open={isSelectorOpen}
                onOpenChange={setIsSelectorOpen}
                title="Select option"
                selectedValue={selectorValue}
                onSelect={(val) => setSelectorValue(val as string)}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                  { value: 'option4', label: 'Option 4' },
                  { value: 'option5', label: 'Option 5' },
                ]}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Multiple selection
              </Label>
              <Button
                variant="ghost"
                className="w-full justify-between min-h-[48px] sm:min-h-0"
                onClick={() => setIsMultiSelectorOpen(true)}
              >
                <span className="truncate">
                  {multiSelectorValue.length > 0
                    ? `Selected (${multiSelectorValue.length}): ${multiSelectorValue.join(', ')}`
                    : 'Select options'}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
              <SlidingSelector
                open={isMultiSelectorOpen}
                onOpenChange={setIsMultiSelectorOpen}
                title="Select multiple"
                multiple
                selectedValue={multiSelectorValue}
                onSelect={(val) => setMultiSelectorValue(val as (string | number)[])}
                options={[
                  { value: 'option1', label: 'Marketing' },
                  { value: 'option2', label: 'Design' },
                  { value: 'option3', label: 'Engineering' },
                  { value: 'option4', label: 'Sales' },
                  { value: 'option5', label: 'Support' },
                  { value: 'option6', label: 'Product' },
                  { value: 'option7', label: 'Finance' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Snackbars / Toasts */}
      <Card id="snackbars" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Snackbars
          </CardTitle>
          <CardDescription>
            Brief notifications for feedback and confirmation. Error states require manual dismissal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="ghost"
              className="min-h-[48px] sm:min-h-0"
              onClick={() => toast.success("Event created successfully", {
                description: "This notification will auto-hide in 4 seconds.",
              })}
            >
              Success (Auto-hide)
            </Button>

            <Button
              variant="ghost"
              className="min-h-[48px] sm:min-h-0"
              onClick={() => toast.success("File uploaded", {
                description: "You can view it in your dashboard.",
                action: {
                  label: "View",
                  onClick: () => console.log("View"),
                },
              })}
            >
              Success + Action
            </Button>

            <Button
              variant="ghost"
              className="min-h-[48px] sm:min-h-0"
              onClick={() => toast.warning("Low disk space", {
                description: "You are running low on storage space.",
                action: {
                  label: "Upgrade",
                  onClick: () => console.log("Upgrade"),
                },
              })}
            >
              Warning
            </Button>

            <Button
              variant="ghost"
              className="min-h-[48px] sm:min-h-0"
              onClick={() => toast.error("Network Error", {
                description: "Failed to connect. Please try again.",
                duration: Infinity,
                closeButton: true,
                action: {
                  label: "Retry",
                  onClick: () => console.log("Retry"),
                }
              })}
            >
              Error (Manual Close)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals - Centered and Fullscreen */}
      <Card id="dialogs" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Modals
          </CardTitle>
          <CardDescription>
            Centered small modal and fullscreen modal with close icon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Centered small modal
              </Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                    Open centered modal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Centered modal</DialogTitle>
                    <DialogDescription>
                      This is a small modal centered on the screen. Perfect for confirmations, forms, or quick actions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost">
                      Cancel
                    </Button>
                    <Button>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Fullscreen modal
              </Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                    Open fullscreen modal
                  </Button>
                </DialogTrigger>
                <DialogContent variant="fullscreen">
                  <DialogHeader>
                    <DialogTitle>Fullscreen modal</DialogTitle>
                    <DialogDescription>
                      This modal takes up the entire screen. Great for detailed views, forms, or immersive experiences.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full name</Label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email address</Label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone number</Label>
                        <Input type="tel" placeholder="Enter your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <textarea
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your message"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Select an option</Label>
                        <RadioGroup defaultValue="option1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option1" id="option1" />
                            <Label htmlFor="option1">Option 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option2" id="option2" />
                            <Label htmlFor="option2">Option 2</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-stone-200 dark:border-stone-700">
                      <Button variant="ghost" className="flex-1 min-h-[48px] sm:min-h-0">
                        Cancel
                      </Button>
                      <Button variant="ghost" className="flex-1 min-h-[48px] sm:min-h-0">
                        Save draft
                      </Button>
                      <Button className="flex-1 min-h-[48px] sm:min-h-0">
                        Submit
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Examples */}
      <Card id="sheets" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Sheet (side panels)
          </CardTitle>
          <CardDescription>
            Sliding panels from different sides - enhanced for bottom menu use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
                Bottom sheet (enhanced)
              </Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                    Open bottom sheet
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom sheet</SheetTitle>
                    <SheetDescription>
                      This bottom sheet has rounded top corners and is optimized for mobile menus.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      Content slides up from the bottom with smooth animation.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radio Button Group - Mobile Optimized */}
      <Card id="radio-groups" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Radio button group
          </CardTitle>
          <CardDescription>Single selection from multiple options showing different variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Default Vertical */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Vertical layout (default)</Label>
            <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
              <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
                <RadioGroupItem value="option1" id="option1" className="h-6 w-6" />
                <Label htmlFor="option1" className="flex-1 cursor-pointer py-2">
                  Option 1 - Default
                </Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
                <RadioGroupItem value="option2" id="option2" className="h-6 w-6" />
                <Label htmlFor="option2" className="flex-1 cursor-pointer py-2">
                  Option 2 - With Description
                </Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
                <RadioGroupItem value="option3" id="option3" className="h-6 w-6" />
                <Label htmlFor="option3" className="flex-1 cursor-pointer py-2">
                  Option 3
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-stone-600 dark:text-stone-400 pl-7">
              Selected: <span className="font-medium">{selectedRadio}</span>
            </p>
          </div>

          <Separator />

          {/* Horizontal */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Horizontal layout</Label>
            <RadioGroup defaultValue="h1" className="flex flex-row space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="h1" id="h1" className="h-6 w-6" />
                <Label htmlFor="h1" className="cursor-pointer">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="h2" id="h2" className="h-6 w-6" />
                <Label htmlFor="h2" className="cursor-pointer">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="h3" id="h3" className="h-6 w-6" />
                <Label htmlFor="h3" className="cursor-pointer">Spacious</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* States */}
          <div className="space-y-3">
            <Label className="text-base font-medium">States</Label>
            <div className="flex flex-wrap gap-6">
              <RadioGroup disabled defaultValue="d1" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="d1" id="d1" className="h-6 w-6" />
                  <Label htmlFor="d1" className="cursor-not-allowed text-stone-400 dark:text-stone-500">Disabled Selected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="d2" id="d2" className="h-6 w-6" />
                  <Label htmlFor="d2" className="cursor-not-allowed text-stone-400 dark:text-stone-500">Disabled Unselected</Label>
                </div>
              </RadioGroup>
            </div>
          </div>



          <Separator />

          {/* Button Styled Radio Group */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Radio button group variants</Label>

              <div className="space-y-6">
                {/* Default Variant */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">Default variant (with spaces)</Label>
                  <RadioButtonGroup defaultValue="2m" className="gap-3">
                    {["1m", "2m", "3m", "5m"].map((time) => (
                      <RadioButtonGroupItem key={time} value={time} className="flex-1">
                        {time}
                      </RadioButtonGroupItem>
                    ))}
                  </RadioButtonGroup>
                </div>

                {/* Surface Variant */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">Surface variant (standard sizes)</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Small (h-8)</Label>
                      <RadioButtonGroup defaultValue="Small 1" className="gap-2">
                        {["Small 1", "Small 2", "Small 3"].map((val) => (
                          <RadioButtonGroupItem key={val} value={val} variant="surface" size="sm">
                            {val}
                          </RadioButtonGroupItem>
                        ))}
                      </RadioButtonGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Default (h-9)</Label>
                      <RadioButtonGroup defaultValue="Default 1" className="gap-2">
                        {["Default 1", "Default 2", "Default 3"].map((val) => (
                          <RadioButtonGroupItem key={val} value={val} variant="surface" size="default">
                            {val}
                          </RadioButtonGroupItem>
                        ))}
                      </RadioButtonGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Large (h-10)</Label>
                      <RadioButtonGroup defaultValue="Large 1" className="gap-2">
                        {["Large 1", "Large 2", "Large 3"].map((val) => (
                          <RadioButtonGroupItem key={val} value={val} variant="surface" size="lg">
                            {val}
                          </RadioButtonGroupItem>
                        ))}
                      </RadioButtonGroup>
                    </div>
                  </div>

                </div>


              </div>
            </div>
          </div>

          <Separator />

          {/* Card Radio Groups */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Card radio groups</Label>
            <p className="text-sm text-stone-500 dark:text-stone-400">Radio buttons with rich content and custom layouts</p>

            <RadioButtonGroup defaultValue="image" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <RadioButtonGroupItem value="none" variant="surface" className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0">
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                  <div className="h-12 w-12 rounded border-2 border-dashed border-muted-foreground/30" />
                  <span className="text-xs text-muted-foreground">None</span>
                </div>
              </RadioButtonGroupItem>

              <RadioButtonGroupItem value="common" variant="surface" className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0">
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                  <div className="h-12 w-12 rounded border-2 border-solid border-foreground/50 relative flex items-center justify-center">
                    <div className="absolute inset-2 border border-foreground/20 rounded-sm" />
                  </div>
                  <span className="text-xs font-medium">Common</span>
                </div>
              </RadioButtonGroupItem>

              <RadioButtonGroupItem value="dashed" variant="surface" className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0">
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                  <div className="h-12 w-12 rounded border-2 border-dashed border-foreground/50" />
                  <span className="text-xs text-muted-foreground">Dashed</span>
                </div>
              </RadioButtonGroupItem>

              <RadioButtonGroupItem value="gradient" variant="surface" className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0">
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                  <div className="h-12 w-12 rounded bg-gradient-to-br from-green-400 to-blue-500 shadow-sm" />
                  <span className="text-xs text-muted-foreground">Gradient</span>
                </div>
              </RadioButtonGroupItem>

              <RadioButtonGroupItem value="image" variant="surface" className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0">
                <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                  <div className="h-12 w-12 rounded overflow-hidden relative">
                    <img src="https://github.com/shadcn.png" alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-xs text-muted-foreground">Image</span>
                </div>
              </RadioButtonGroupItem>
            </RadioButtonGroup>
          </div>

          <Separator />

          {/* Tax Selection (Moved and Standardized) */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Tax radio buttons</Label>
                <p className="text-sm text-stone-500 dark:text-stone-400">Specialized selection with badges and actions</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="use-taxes-section"
                  className="text-sm font-medium leading-none text-foreground cursor-pointer"
                >
                  Use taxes
                </Label>
                <Switch id="use-taxes-section" checked={useTaxes} onCheckedChange={setUseTaxes} />
              </div>
              <Button variant="secondary" size="icon" onClick={handleAddTax} aria-label="Add tax">
                <Plus />
              </Button>
            </div>

            {useTaxes && (
              <RadioButtonGroup
                value={selectedTaxId || ""}
                onValueChange={(val) => taxes.length > 1 && setSelectedTaxId(val)}
                className="flex flex-col gap-3"
              >
                {taxes.map((tax) => {
                  const isSelected = selectedTaxId === tax.id
                  return (
                    <RadioButtonGroupItem
                      key={tax.id}
                      value={tax.id}
                      variant="default"
                      className={`
                        relative w-full !flex !flex-row items-center justify-between p-4 h-auto min-h-[72px] rounded-[12px] transition-all border
                        ${isSelected
                          ? "bg-secondary text-secondary-foreground border-transparent shadow-sm"
                          : "border-border bg-layer-2 hover:bg-layer-1"
                        }
                      `}
                    >
                      <div className="flex-1 flex flex-col items-start gap-1 overflow-hidden">
                        <div className="flex items-center gap-2 max-w-full">
                          <span className={`text-base font-normal truncate ${isSelected ? "text-secondary-foreground" : "text-foreground"}`}>
                            {tax.label} {tax.rate}
                          </span>
                          {isSelected && (
                            <Badge variant="default" className="bg-green-500 text-white text-[10px] px-2 py-0 h-5 rounded-full font-bold tracking-wider shrink-0">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0 ml-4"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveTax(tax.id)
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </RadioButtonGroupItem>
                  )
                })}
              </RadioButtonGroup>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Numeric Entry - Numpad */}
      <Card id="numpad" className="border-stone-200 dark:border-stone-700 shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Numeric entry
          </CardTitle>
          <CardDescription>
            Premium numeric pad for price entry and PIN codes - optimized for POS touch targets
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Numpad
            value={priceValue}
            onChange={setPriceValue}
            label="Enter price"
          />
        </CardContent>
      </Card>

      {/* Security Interfaces */}
      <Card id="security" className="border-stone-200 dark:border-stone-700 shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Security interfaces
          </CardTitle>
          <CardDescription>
            PIN entry components for authorization
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8 items-center justify-center py-10 bg-stone-50/50 dark:bg-stone-900/50">
          <div className="w-full max-w-[360px] bg-white dark:bg-stone-950 rounded-3xl shadow-lg border border-stone-200 dark:border-stone-800 overflow-hidden">
            <PinEntry
              onCancel={() => { }}
              className="scale-90 origin-top"
            />
          </div>
          <div className="w-full max-w-[360px] bg-white dark:bg-stone-950 rounded-3xl shadow-lg border border-stone-200 dark:border-stone-800 overflow-hidden">
            <PinEntry
              title="Confirm PIN"
              description="Please confirm your PIN code."
              visible={true}
              onCancel={() => { }}
              className="scale-90 origin-top"
            />
          </div>
        </CardContent>
      </Card>

      {/* Checkboxes */}
      <Card id="checkboxes" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Checkboxes
          </CardTitle>
          <CardDescription>Multiple selection options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" defaultChecked />
            <Label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Receive marketing emails
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Disabled option
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Disabled checked
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Dropdowns - Mobile Optimized */}
      <Card id="dropdown-menus" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Dropdowns
          </CardTitle>
          <CardDescription>Menu dropdowns with various options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                  Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" className="min-h-[48px] sm:min-h-0">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                  With Checkboxes
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked className="min-h-[48px] sm:min-h-0">
                  Show notifications
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="min-h-[48px] sm:min-h-0">
                  Enable dark mode
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="min-h-[48px] sm:min-h-0">
                  Auto-save
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                  Radio Group
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>View Mode</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={dropdownValue} onValueChange={setDropdownValue}>
                  <DropdownMenuRadioItem value="option1" className="min-h-[48px] sm:min-h-0">
                    List View
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="option2" className="min-h-[48px] sm:min-h-0">
                    Grid View
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="option3" className="min-h-[48px] sm:min-h-0">
                    Compact View
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Inputs - Mobile Optimized */}
      <Card id="inputs" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Inputs
          </CardTitle>
          <CardDescription>Form input components (min 48px height)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-h-[48px] sm:min-h-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" className="min-h-[48px] sm:min-h-0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                id="search"
                type="search"
                placeholder="Search..."
                className="pl-10 min-h-[48px] sm:min-h-0"
              />
            </div>
            <div className="space-y-2">
              <Label>Search with suggestions (whisperer)</Label>
              <div className="relative z-10 space-y-4">
                <SearchInputWithSuggestions
                  placeholder="Search items..."
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled input</Label>
            <Input id="disabled" placeholder="Disabled" disabled className="min-h-[48px] sm:min-h-0" />
          </div>
        </CardContent>
      </Card>

      {/* Switches - Mobile Optimized */}
      <Card id="switches" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Switches
          </CardTitle>
          <CardDescription>Toggle controls for boolean states - with and without text labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Variant 1: Without Text */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Without text</Label>
            <div className="flex items-center gap-4 flex-wrap">
              <Switch id="switch-no-text-1" />
              <Switch id="switch-no-text-2" defaultChecked />
              <Switch id="switch-no-text-3" disabled />
              <Switch id="switch-no-text-4" disabled defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Variant 2: With Text on Left */}
          <div className="space-y-3">
            <Label className="text-base font-medium">With text (left side)</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label htmlFor="airplane-mode" className="cursor-pointer">
                  Airplane mode
                </Label>
                <Switch id="airplane-mode" />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="notifications" className="cursor-pointer">
                  Notifications
                </Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="disabled-switch" className="cursor-pointer opacity-50">
                  Disabled
                </Label>
                <Switch id="disabled-switch" disabled />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="disabled-checked" className="cursor-pointer opacity-50">
                  Disabled checked
                </Label>
                <Switch id="disabled-checked" disabled defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Picker - Mobile Optimized */}
      <Card id="date-picker" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Date picker
          </CardTitle>
          <CardDescription>Select dates with calendar popup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select date</Label>
            <DatePicker
              date={selectedDate}
              onDateChange={setSelectedDate}
              placeholder="Pick a date"
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Picker - Mobile Optimized */}
      <Card id="color-picker" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Color picker
          </CardTitle>
          <CardDescription>Select colors with presets and custom picker</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select color</Label>
            <ColorPicker color={selectedColor} onColorChange={setSelectedColor} />
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded border-2 border-stone-300 dark:border-stone-600"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Selected color</p>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-mono">{selectedColor}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Color Selector (Grid) - Mobile Optimized */}
      <Card id="color-selector" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Color selector (grid alternative)
          </CardTitle>
          <CardDescription>High-premium circular grid for quick color selection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select theme color</Label>
            <ColorSelector value={selectedColor} onValueChange={setSelectedColor}>
              {[
                { hex: "layer-1", grad: "bg-layer-1", label: "Layer 1" },
                { hex: "#3b82f6", grad: "bg-gradient-to-br from-blue-400 to-blue-600" },
                { hex: "#10b981", grad: "bg-gradient-to-br from-emerald-400 to-emerald-600" },
                { hex: "#ef4444", grad: "bg-gradient-to-br from-red-400 to-red-600" },
                { hex: "#f59e0b", grad: "bg-gradient-to-br from-amber-400 to-amber-600" },
                { hex: "#a855f7", grad: "bg-gradient-to-br from-purple-400 to-purple-600" },
                { hex: "#ea580c", grad: "bg-gradient-to-br from-orange-400 to-orange-600" },
                { hex: "#06b6d4", grad: "bg-gradient-to-br from-cyan-400 to-cyan-600" },
                { hex: "#ec4899", grad: "bg-gradient-to-br from-pink-400 to-pink-600" },
                { hex: "#6366f1", grad: "bg-gradient-to-br from-indigo-400 to-indigo-600" },
                { hex: "#84cc16", grad: "bg-gradient-to-br from-lime-400 to-lime-600" },
                { hex: "#14b8a6", grad: "bg-gradient-to-br from-teal-400 to-teal-600" },
                { hex: "#4b5563", grad: "bg-gradient-to-br from-stone-400 to-stone-600" }
              ].map((item) => (
                <ColorSelectorItem
                  key={item.hex}
                  value={item.hex}
                  gradient={item.grad}
                  aria-label={`Select color ${item.hex}`}
                />
              ))}
            </ColorSelector>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Selected HEX: <span className="font-mono font-medium text-primary">{selectedColor}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card id="badges-examples" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Badges
          </CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </CardContent>
      </Card>



      {/* Tabs - Mobile Optimized */}
      <Card id="tabs" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Tabs
          </CardTitle>
          <CardDescription>Tabbed content navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="min-h-[48px] sm:min-h-0">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="min-h-[48px] sm:min-h-0">Analytics</TabsTrigger>
              <TabsTrigger value="settings" className="min-h-[48px] sm:min-h-0">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Overview content
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  This is the overview tab content. You can display summary information here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Analytics content
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Analytics data and charts would be displayed here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Settings content
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Application settings and preferences would be shown here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cards - Mobile Optimized */}
      <Card id="cards" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Cards
          </CardTitle>
          <CardDescription>Different card usages and layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Card Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Card selection</Label>
            <RadioGroup defaultValue="card1" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <RadioGroupItem value="card1" id="card1" className="peer sr-only" />
                <Label
                  htmlFor="card1"
                  className="flex flex-col gap-2 rounded-lg border border-foreground/20 bg-transparent p-4 hover:bg-foreground/5 peer-data-[state=checked]:border-transparent peer-data-[state=checked]:bg-secondary cursor-pointer transition-all"
                >
                  <span className="font-semibold text-base text-stone-900 dark:text-stone-100 peer-data-[state=checked]:opacity-70">Pro plan</span>
                  <span className="text-sm text-stone-500 dark:text-stone-400 peer-data-[state=checked]:opacity-50">Advanced features for power users</span>
                  <span className="font-bold mt-2 text-stone-900 dark:text-stone-100 peer-data-[state=checked]:opacity-70">$29/mo</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="card2" id="card2" className="peer sr-only" />
                <Label
                  htmlFor="card2"
                  className="flex flex-col gap-2 rounded-lg border border-foreground/20 bg-transparent p-4 hover:bg-foreground/5 peer-data-[state=checked]:border-transparent peer-data-[state=checked]:bg-secondary cursor-pointer transition-all"
                >
                  <span className="font-semibold text-base text-stone-900 dark:text-stone-100 peer-data-[state=checked]:opacity-70">Team plan</span>
                  <span className="text-sm text-stone-500 dark:text-stone-400 peer-data-[state=checked]:opacity-50">Collaboration tools for teams</span>
                  <span className="font-bold mt-2 text-stone-900 dark:text-stone-100 peer-data-[state=checked]:opacity-70">$99/mo</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <div className="flex flex-col gap-1 mb-3">
              <Label className="text-base font-medium">Card variations</Label>
              <p className="text-sm text-stone-500 dark:text-stone-400">Different card layouts and content</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-stone-200 dark:border-stone-700">
                <CardHeader>
                  <CardTitle className="text-base">Simple card</CardTitle>
                  <CardDescription>Basic card with title and description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    This is a simple card component with minimal content.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-stone-200 dark:border-stone-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Card with actions</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="invisible" size="icon-sm" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="invisible" size="icon-sm" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Card with action buttons in the header.
                  </p>
                </CardContent>
              </Card>

              <Separator className="col-span-1 md:col-span-2 my-2" />

              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col gap-1 mb-3">
                  <Label className="text-base font-medium">Selection cards</Label>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Selectable cards with active states (min 48px touch target)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Register (POS) Mode - Permanently Selected State */}
                  <div
                    className="relative p-4 rounded-xl border transition-all border-primary bg-primary/10 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <Badge>Selected</Badge>
                    </div>
                    <div className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">Register (POS)</div>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Process orders and payments on the go.
                    </p>
                  </div>

                  {/* Back Office Mode - Permanently Unselected State */}
                  <div
                    className="relative p-4 rounded-xl border transition-all border-stone-200 dark:border-stone-700 cursor-pointer hover:border-stone-300 dark:hover:border-stone-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-10 w-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Switch
                      </Button>
                    </div>
                    <div className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">Back Office</div>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Advanced analytics and inventory management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu - Mobile Optimized */}
      <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
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
      <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Stats cards
          </CardTitle>
          <CardDescription>Dashboard-style metric cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-stone-200 dark:border-stone-700">
              <CardHeader className="pb-2">
                <CardDescription>Total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  $45,231
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stone-200 dark:border-stone-700">
              <CardHeader className="pb-2">
                <CardDescription>Active users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  2,350
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stone-200 dark:border-stone-700">
              <CardHeader className="pb-2">
                <CardDescription>Sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  12,234
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>


      {/* Settings Components - Mobile Optimized */}
      <Card id="settings-components" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className=" text-lg font-semibold text-stone-900 dark:text-stone-100">
            Settings components
          </CardTitle>
          <CardDescription>Specialized components for settings pages (SettingsGroup, SettingsItem, UserProfileRow)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 block">
              User profile row
            </Label>
            <SettingsGroup>
              <UserProfileRow
                name="Ghhh"
                email="holodroid23@gmail.com"
                initials="G"
              />
            </SettingsGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300 block">
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
                  <div className="h-10 w-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400">
                    <Settings className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>General</SettingsItemTitle>
                </SettingsItemContent>
              </SettingsItem>
              <SettingsItem>
                <SettingsItemIcon>
                  <div className="h-10 w-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400">
                    <User className="h-5 w-5" />
                  </div>
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>Users</SettingsItemTitle>
                </SettingsItemContent>
              </SettingsItem>
              <SettingsItem className="hover:bg-destructive/5">
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

      {/* Elevations & Shadows (Soul Design System) */}
      <Card id="elevations" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Elevations & shadows</CardTitle>
          <CardDescription>Multi-layered shadow patterns from the Soul Design System</CardDescription>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">?? Soul elevation rules</p>
            <ul className="text-xs text-blue-800 dark:text-blue-300 list-disc pl-4 space-y-1">
              <li><strong>Shadow 100 (sm):</strong> Default shadow for most containers and cards.</li>
              <li><strong>Shadow 200 (md):</strong> Interactive elevation for hover states.</li>
              <li><strong>Shadow 300 (lg):</strong> Elements revealed by action (popovers, select lists).</li>
              <li><strong>Shadow 400 (xl):</strong> Floating elements and multi-action bars.</li>
              <li><strong>Tactile Detail:</strong> All shadows use multi-layered values with subtle insets for physical depth.</li>
            </ul>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-sm flex items-center justify-center">
                <span className="text-xs font-medium">Shadow 100</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">sm: Default Containers</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-md flex items-center justify-center">
                <span className="text-xs font-medium">Shadow 200</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">md: Hover States</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-lg flex items-center justify-center">
                <span className="text-xs font-medium">Shadow 300</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">lg: Popovers & Menus</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-xl flex items-center justify-center">
                <span className="text-xs font-medium">Shadow 400</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">xl: Floating Elements</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
            <div className="flex flex-col gap-2">
              <div className="h-20 w-full rounded-xl bg-layer-2 border border-border shadow-inner flex items-center justify-center">
                <span className="text-xs font-medium italic opacity-50">shadow-inner</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">Pressed/Inset states</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 w-full rounded-xl bg-primary text-primary-foreground border border-[#0d5e24] shadow-btn flex items-center justify-center">
                <span className="text-xs font-medium">shadow-btn</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">Tactile primary button</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Blocks */}
      <Card id="building-blocks" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Building blocks</CardTitle>
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
              <p className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Raw icon sizes (12px, 18px, 24px, 30px)</p>
            </div>
            <div className="flex flex-wrap items-end gap-8 p-6 bg-layer-2 border border-border rounded-xl">
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-3 h-3" />
                </div>
                <span className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Small (12px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-3 h-3</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-[18px] h-[18px]" />
                </div>
                <span className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Regular (18px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-[18px] h-[18px]</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Big (24px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-6 h-6</code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="border border-dashed border-border p-2 rounded">
                  <Settings className="w-[30px] h-[30px]" />
                </div>
                <span className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Huge (30px)</span>
                <code className="text-[10px] text-muted-foreground bg-muted px-1 rounded">w-[30px] h-[30px]</code>
              </div>
            </div>
          </div>

          <Separator />

          {/* Icons with Background */}
          <div id="icons-with-background" className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Icons with background</h3>
              <p className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">Standardized containers for lists and feedback</p>
            </div>
            <div className="space-y-8">
              {/* Small Icons (List/Action size) */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Small (36px) - Common colors</div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-9 w-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400">
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
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Medium (48px) - Role & action variants</div>
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
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Large (60px) - Empty states & feedback</div>
                <div className="flex flex-wrap gap-8 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-success dark:bg-emerald-900/20 flex items-center justify-center text-on-layer-success dark:text-emerald-500">
                      <Check className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground text-stone-500 dark:text-stone-400">Success</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-danger dark:bg-red-900/20 flex items-center justify-center text-on-layer-danger dark:text-red-500">
                      <X className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground text-stone-500 dark:text-stone-400">Error</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-info dark:bg-blue-900/10 flex items-center justify-center text-on-layer-info dark:text-blue-500">
                      <Lock className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground text-stone-500 dark:text-stone-400">Empty / secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[60px] w-[60px] rounded-xl bg-layer-warning dark:bg-amber-900/20 flex items-center justify-center text-on-layer-warning dark:text-amber-500">
                      <AlertCircle className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground text-stone-500 dark:text-stone-400">Alert</span>
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
              <p className="text-xs text-muted-foreground text-stone-500 dark:text-stone-400">User profile images with size variants</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Small size (36px)</div>
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
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Medium size (48px)</div>
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
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">Large size (60px)</div>
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

      {/* Atomic Items */}
      <Card id="atomic-items" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Atomic items</CardTitle>
          <CardDescription>Examples of complex items built from atoms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Simple Text Item */}
          <SettingsItem className="bg-layer-2 border border-border rounded-xl">
            <SettingsItemContent>
              <SettingsItemTitle>Simple text item</SettingsItemTitle>
            </SettingsItemContent>
          </SettingsItem>

          {/* Toggle Option */}
          <SettingsItem className="bg-layer-2 border border-border rounded-xl">
            <SettingsItemContent>
              <SettingsItemTitle>Toggle option</SettingsItemTitle>
              <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Switch />
            </SettingsItemAction>
          </SettingsItem>

          {/* User Profile */}
          <SettingsItem className="bg-layer-2 border border-border rounded-xl">
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
          <SettingsItem className="bg-layer-2 border border-border rounded-xl">
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
          <SettingsItem className="bg-layer-2 border border-border rounded-xl items-start">
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

      {/* Section Titles */}
      <Card id="section-titles" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Section titles</CardTitle>
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

      {/* Product / Expense Card Items */}
      <Card id="product-expense-items-ds" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Product / expense card items</CardTitle>
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
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-stone-900 dark:text-stone-100">
                    <Minus className="h-[18px] w-[18px]" />
                  </Button>
                  <span className="font-bold px-2 text-sm text-stone-900 dark:text-stone-100">2</span>
                  <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-stone-900 dark:text-stone-100">
                    <Plus className="h-[18px] w-[18px]" />
                  </Button>
                </div>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">$11.00</span>
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
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-stone-900 dark:text-stone-100">
                  <Pencil className="h-[18px] w-[18px]" />
                </Button>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">$4.50</span>
              </SettingsItemAction>
            </SettingsItem>
          </div>
        </CardContent>
      </Card>


      {/* Badges Section */}
      <Card id="badges" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Badges</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </CardContent>
      </Card>


      {/* Avatars Section */}






      {/* Complex Accordions */}
      <Card id="accordions" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Complex accordions</CardTitle>
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


      {/* Expandable Order Summary */}
      <Card id="order-expandable" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Expandable order summary</CardTitle>
          <CardDescription>Persistent bottom bar that expands into a full order view</CardDescription>
        </CardHeader>
        <CardContent className="bg-stone-50 dark:bg-stone-900/50 p-12 flex items-center justify-center">
          <OrderExpandableDemo />
        </CardContent>
      </Card>


      {/* Order Management Tabs */}
      <Card id="order-tabs" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Order tabs</CardTitle>
          <CardDescription>Specialized tab interface for order management</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderTabsDemo />
        </CardContent>
      </Card>

      {/* Media Upload */}
      <Card id="media-upload" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Media upload</CardTitle>
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



      {/* Check Lists */}
      <Card id="check-lists" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Check lists</CardTitle>
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

      {/* Icons with Background */}

      {/* Empty States */}
      <Card id="empty-states" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Empty states</CardTitle>
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



      {/* Dividers */}
      <Card id="dividers" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Dividers</CardTitle>
          <CardDescription>Visual separators for organizing content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="text-sm font-medium">Horizontal</div>
            <div className="bg-layer-2 border border-border rounded-xl p-6 space-y-4">
              <div className="text-sm text-muted-foreground">
                Content above the separator
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Content below the separator
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium">Vertical</div>
            <div className="bg-layer-2 border border-border rounded-xl p-6 flex items-center h-16 space-x-4 text-sm text-muted-foreground">
              <div>Item One</div>
              <Separator orientation="vertical" />
              <div>Item Two</div>
              <Separator orientation="vertical" />
              <div>Item Three</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card id="email-templates" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Email templates</CardTitle>
          <CardDescription>Transactional email designs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-layer-2 border border-border rounded-xl p-6 flex justify-center bg-stone-100 dark:bg-stone-900">
            <div className="w-full max-w-xl">
              <EmailTemplatePreview />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt */}
      <Card id="receipt" className="border-stone-200 dark:border-stone-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">Receipt</CardTitle>
          <CardDescription>Print-ready receipt design with QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <ReceiptPreview />
        </CardContent>
      </Card>


    </div >
  )
}

