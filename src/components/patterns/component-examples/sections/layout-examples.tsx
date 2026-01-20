import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpenseExpandableGroup, ExpenseExpandableRow } from '@/components/ui/expense-expandable-accordion'
import { OrderExpandableCard } from '@/components/ui/order-expandable-card'
import { Separator } from '@/components/ui/separator'
import { Home } from 'lucide-react'

export function ElevationsExamplesCard() {
  return (
    <Card id="elevations" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Elevations & shadows</CardTitle>
        <CardDescription>Multi-layered shadow patterns</CardDescription>
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
            <div className="h-20 w-full rounded-xl bg-primary text-primary-foreground border border-border shadow-sm flex items-center justify-center">
              <span className="text-xs font-medium">Primary surface</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">Tactile emphasis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AccordionsExamplesCard() {
  return (
    <Card id="accordions" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Complex accordions</CardTitle>
        <CardDescription>Expandable lists with rich content (Expenses & Orders)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expenses</h3>
            <ExpenseExpandableGroup
              defaultOpen
              title="Yesterday"
              subtitle="3 expenses"
              amount="$1,304.50"
              badge={{ label: "4 Edits", variant: "destructive" }}
            >
              <ExpenseExpandableRow
                title="Whole Milk"
                amount="$4.50"
                leading={{
                  type: "image",
                  src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200&auto=format&fit=crop",
                  alt: "Whole Milk",
                }}
                details={{
                  createdBy: "Sarah Jackson",
                  time: "Yesterday at 10:42 AM",
                  note: "—",
                }}
                onEdit={() => {}}
              />

              <ExpenseExpandableRow
                defaultOpen
                showChangeMarker
                title="Rent"
                amount="$1,250.00"
                leading={{ type: "icon", icon: Home, tone: "neutral" }}
                details={{
                  createdBy: "Freddy Gasper",
                  time: "Yesterday at 10:50 AM",
                  note: "Monthly Office Rent",
                }}
                changes={[
                  { text: 'Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM' },
                ]}
                onEdit={() => {}}
              />

              <ExpenseExpandableRow
                defaultOpen
                showChangeMarker
                deleted
                title="Coffee Beans"
                amount="$50.00"
                leading={{
                  type: "image",
                  src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&auto=format&fit=crop",
                  alt: "Coffee Beans",
                }}
                details={{
                  createdBy: "Sarah Jackson",
                  time: "Yesterday at 09:15 AM",
                  note: "Dark Roast",
                }}
                changes={[
                  { text: 'Sarah Jackson changed price from "$45.00" to "$50.00" at Yesterday at 09:20 AM' },
                  { text: 'Sarah Jackson changed note from "Light Roast" to "Dark Roast" at Yesterday at 09:20 AM' },
                  { text: "Sarah Jackson deleted expense at Yesterday at 09:25 AM" },
                ]}
              />
            </ExpenseExpandableGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Orders</h3>
            <div className="space-y-4">
              <OrderExpandableCard
                defaultOpen
                title="Order #402"
                time="10:42 AM"
                amount="$29.90"
                statusBadge={{ label: "Refunded", variant: "destructive" }}
                items={[
                  {
                    id: "cappuccino",
                    name: "Cappuccino",
                    qty: 1,
                    price: "$4.50",
                    imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=256&auto=format&fit=crop",
                  },
                  {
                    id: "avocado-toast",
                    name: "Avocado Toast",
                    qty: 1,
                    price: "$12.00",
                    imageSrc: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=256&auto=format&fit=crop",
                  },
                  {
                    id: "iced-matcha",
                    name: "Iced Matcha",
                    qty: 1,
                    price: "$11.00",
                    imageSrc: "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?q=80&w=256&auto=format&fit=crop",
                  },
                ]}
                details={[
                  { label: "Created by", value: "Sarah Jackson" },
                  { label: "Custom name", value: "Table 1" },
                  { label: "Payment method", value: "Visa •••• 4242" },
                  { label: "Processed by", value: "karel martinek" },
                  { label: "Refunded by", value: "Mike Ross" },
                  { label: "Reason", value: "Damaged item" },
                ]}
              />

              {/* Order #402 (collapsed) */}
              <OrderExpandableCard
                title="Order #403"
                time="10:45 AM"
                amount="$14.50"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DividersExamplesCard() {
  return (
    <Card id="dividers" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Dividers</CardTitle>
        <CardDescription>Visual separators for organizing content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm font-medium">Horizontal</div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-4">
            <div className="text-sm text-muted-foreground">Content above the separator</div>
            <Separator />
            <div className="text-sm text-muted-foreground">Content below the separator</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium">Vertical</div>
          <div className="bg-background border border-border rounded-xl p-6 flex items-center h-16 space-x-4 text-sm text-muted-foreground">
            <div>Item One</div>
            <Separator orientation="vertical" />
            <div>Item Two</div>
            <Separator orientation="vertical" />
            <div>Item Three</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
