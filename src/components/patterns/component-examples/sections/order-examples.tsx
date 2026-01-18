import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SystemIcon } from '@/components/atoms/icon'
import { ImageTile } from '@/components/ui/image-tile'
import { SearchInputWithSuggestions, type SearchSuggestion } from '@/components/ui/search-input-with-suggestions'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import { ChevronDown, Minus, Plus } from 'lucide-react'

interface OrderTab {
  id: string
  label: string
  count: number
  type: 'dine-in' | 'takeout'
}

function OrderTabsDemo() {
  const [tabs, setTabs] = useState<OrderTab[]>([
    { id: '1', label: 'Dine-in #4', count: 3, type: 'dine-in' },
    { id: '2', label: 'Takeout #5', count: 0, type: 'takeout' },
    { id: '3', label: 'Dine-in #6', count: 12, type: 'dine-in' },
    { id: '4', label: 'Delivery #8', count: 4, type: 'takeout' },
  ])
  const [selectedId, setSelectedId] = useState('1')

  const selected = useMemo(() => tabs.find((t) => t.id === selectedId) ?? tabs[0] ?? null, [tabs, selectedId])

  const handleAddTab = () => {
    const id = Math.random().toString(36).slice(2, 9)
    const num = tabs.length + 1
    const newTab: OrderTab = { id, label: `Order #${100 + num}`, count: 0, type: 'dine-in' }
    setTabs([newTab, ...tabs])
    setSelectedId(id)
  }

  return (
    <div className="w-full max-w-3xl bg-background border border-border rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={handleAddTab}
          className="flex-shrink-0 h-10 w-10 rounded-full bg-layer-3 hover:bg-layer-3/80 border border-border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SystemIcon icon={Plus} size="regular" className="text-foreground" aria-hidden="true" />
        </button>

        <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-right">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isSelected = selectedId === tab.id
              const hasItems = tab.count > 0

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedId(tab.id)}
                  className={cn(
                    'relative group flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-all whitespace-nowrap select-none shrink-0',
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-layer-1 hover:bg-layer-1/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border'
                  )}
                >
                  <span>{tab.label}</span>
                  {hasItems && (
                    <span
                      className={cn(
                        'flex items-center justify-center h-5 min-w-[20px] px-1 rounded text-[10px] font-bold leading-none',
                        isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {selected && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{selected.label}</div>
            <Badge variant={selected.type === 'dine-in' ? 'secondary' : 'default'}>{selected.type}</Badge>
          </div>
        </div>
      )}
    </div>
  )
}

function OrderExpandableDemo() {
  const [open, setOpen] = useState(false)

  const orderItems = useMemo(
    () => [
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        qty: 2,
        unitPrice: 4.5,
        image:
          'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop',
      },
      {
        id: 'macchiato',
        name: 'Macchiato',
        qty: 1,
        unitPrice: 3.25,
        image:
          'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop',
      },
      {
        id: 'americano',
        name: 'Americano',
        qty: 1,
        unitPrice: 4.75,
        image:
          'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=256&auto=format&fit=crop',
      },
    ],
    []
  )

  const { subtotal, tax, total, summary } = useMemo(() => {
    const subtotalValue = orderItems.reduce((acc, item) => acc + item.qty * item.unitPrice, 0)
    const taxValue = 1.5
    const totalValue = subtotalValue + taxValue

    const baseSummary = orderItems
      .map((item) => (item.qty > 1 ? `${item.name} (${item.qty})` : item.name))
      .join(', ')

    const maxChars = 30
    const summaryValue = baseSummary.length > maxChars ? `${baseSummary.slice(0, maxChars - 3)}...` : baseSummary

    return { subtotal: subtotalValue, tax: taxValue, total: totalValue, summary: summaryValue }
  }, [orderItems])

  const formatMoney = (value: number) => `$${value.toFixed(2)}`

  const suggestions: SearchSuggestion[] = useMemo(
    () =>
      orderItems.map((item) => ({
        id: item.id,
        label: item.name,
        leading: <ImageTile size="small" src={item.image} alt={item.name} />,
        price: formatMoney(item.unitPrice),
      })),
    [orderItems]
  )

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          'relative bg-layer-2 text-foreground',
          open ? 'rounded-none border-0 shadow-none overflow-visible' : 'overflow-hidden rounded-[18px] border border-border shadow-md'
        )}
      >
        {/* Collapsed View */}
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full p-4 cursor-pointer active:scale-[0.99] transition-all relative group h-[96px] flex flex-col justify-center text-left"
            aria-label="Expand order"
          >
            {/* Drag Handle */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-muted-foreground/30 rounded-full" />

            <div className="flex items-center justify-between mt-1">
              <div className="flex flex-col min-w-0">
                <h2 className="text-[30px] leading-none font-bold tracking-tight font-mono">{formatMoney(total)}</h2>
                <span className="text-[12px] leading-[16px] text-muted-foreground mt-1 truncate max-w-[240px]">{summary}</span>
              </div>
              <div className="h-10 w-10 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                <SystemIcon icon={ChevronDown} size="huge" className="rotate-180" aria-hidden="true" />
              </div>
            </div>
          </button>
        )}

        {/* Expanded Content (inline preview; real app uses a full-page modal) */}
        {open && (
          <div className="flex flex-col h-[760px] animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="px-6 pt-7 pb-4">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-[22px] leading-[30px] font-semibold tracking-tight">Order #402 - Table 4</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Collapse order"
                >
                  <SystemIcon icon={ChevronDown} size="big" aria-hidden="true" />
                </button>
              </div>

              {/* Search */}
              <div className="relative z-10">
                <SearchInputWithSuggestions
                  placeholder="Search items..."
                  suggestions={suggestions}
                  className="h-12 rounded-[12px] bg-layer-3 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-6">
              {orderItems.map((item) => (
                <SettingsItem
                  key={item.id}
                  className="bg-layer-2 border border-border rounded-xl p-3 h-auto min-h-0 items-center"
                >
                  <SettingsItemIcon>
                    <ImageTile size="small" src={item.image} alt={item.name} />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{item.name}</SettingsItemTitle>
                  </SettingsItemContent>

                  <SettingsItemAction className="flex items-center gap-6">
                    <div className="flex items-center gap-1 bg-layer-1 border border-border rounded-lg p-0.5">
                      <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-foreground" aria-label="Decrease">
                        <SystemIcon icon={Minus} size="regular" aria-hidden="true" />
                      </Button>
                      <span className="font-bold px-2 text-sm text-foreground">{item.qty}</span>
                      <Button variant="invisible" size="icon-sm" className="h-7 w-7 rounded-md text-foreground" aria-label="Increase">
                        <SystemIcon icon={Plus} size="regular" aria-hidden="true" />
                      </Button>
                    </div>
                    <span className="text-sm font-mono font-bold text-foreground">{formatMoney(item.unitPrice)}</span>
                  </SettingsItemAction>
                </SettingsItem>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-6 pt-5 border-t border-border bg-layer-2">
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between gap-12 text-regular-semibold text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-12 text-regular-semibold text-muted-foreground">
                  <span>Tax</span>
                  <span className="font-mono">{formatMoney(tax)}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-border/60 mt-2">
                  <span className="text-regular-semibold text-muted-foreground mb-1.5">Total</span>
                  <h2 className="text-[22px] leading-[30px] font-semibold tracking-tight font-mono text-foreground">
                    {formatMoney(total)}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="h-12 rounded-[12px]">
                  Pay cash
                </Button>
                <Button variant="secondary" className="h-12 rounded-[12px]">
                  Pay card
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function OrderExpandableExamplesCard() {
  return (
    <Card id="order-expandable" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expandable order summary</CardTitle>
        <CardDescription>Bottom bar that expands into an order view</CardDescription>
      </CardHeader>
      <CardContent className="p-12 flex items-center justify-center">
        <OrderExpandableDemo />
      </CardContent>
    </Card>
  )
}

export function OrderTabsExamplesCard() {
  return (
    <Card id="order-tabs" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Order tabs</CardTitle>
        <CardDescription>Specialized tab interface for order management</CardDescription>
      </CardHeader>
      <CardContent>
        <OrderTabsDemo />
      </CardContent>
    </Card>
  )
}

