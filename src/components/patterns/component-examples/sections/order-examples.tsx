import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ChevronDown, Plus } from 'lucide-react'

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
    <div className="w-full max-w-3xl bg-layer-2 border border-border rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={handleAddTab}
          className="flex-shrink-0 h-10 w-10 rounded-full bg-layer-3 hover:bg-layer-3/80 border border-border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="h-[18px] w-[18px] text-foreground" />
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

  return (
    <div className="w-full max-w-md">
      <div className="bg-layer-2 border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-layer-1/50 transition-colors"
        >
          <div>
            <div className="text-sm font-semibold">Order summary</div>
            <div className="text-xs text-muted-foreground">Tap to {open ? 'collapse' : 'expand'}</div>
          </div>
          <ChevronDown className={cn('h-[18px] w-[18px] text-muted-foreground transition-transform', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="px-5 pb-5 space-y-4">
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-mono">$29.90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-mono">$2.10</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="font-mono">$32.00</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="h-12 rounded-xl font-semibold">
                Pay cash
              </Button>
              <Button className="h-12 rounded-xl font-semibold">Pay card</Button>
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
      <CardContent className="bg-muted/30 p-12 flex items-center justify-center">
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

