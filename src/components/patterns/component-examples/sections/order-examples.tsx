import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderExpandableSummary, type OrderExpandableSummaryItem } from '@/components/ui/order-expandable-summary'
import { OrderTabs } from '@/components/ui/order-tabs'

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
      <OrderTabs
        tabs={tabs.map((t) => ({ id: t.id, label: t.label, count: t.count }))}
        value={selectedId}
        onValueChange={setSelectedId}
        onAddTab={handleAddTab}
      />

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

export function OrderExpandableExamplesCard() {
  const orderItems = useMemo<OrderExpandableSummaryItem[]>(
    () => [
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        qty: 2,
        unitPrice: 4.5,
        imageSrc: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop',
      },
      {
        id: 'macchiato',
        name: 'Macchiato',
        qty: 1,
        unitPrice: 3.25,
        imageSrc: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=256&auto=format&fit=crop',
      },
      {
        id: 'americano',
        name: 'Americano',
        qty: 1,
        unitPrice: 4.75,
        imageSrc: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=256&auto=format&fit=crop',
      },
    ],
    []
  )

  return (
    <Card id="order-expandable" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expandable order summary</CardTitle>
        <CardDescription>Bottom bar that expands into an order view</CardDescription>
      </CardHeader>
      <CardContent className="p-12 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <OrderExpandableSummary items={orderItems} orderTitle="Order #402 - Table 4" />
        </div>
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

