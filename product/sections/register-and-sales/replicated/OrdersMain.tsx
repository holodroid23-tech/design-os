import * as React from "react"
import { Plus } from "lucide-react"

import { SystemIcon } from "@/components/atoms/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrdersMainOrderTab {
  id: string
  label: string
  count?: number
}

export interface OrdersMainProps {
  tabs?: OrdersMainOrderTab[]
  selectedTabId?: string
  onSelectTab?: (tabId: string) => void
  onAddOrder?: () => void
}

function useControllableState(value: string | undefined, defaultValue: string) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const set = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next)
    },
    [isControlled]
  )

  return [current, set] as const
}

export default function OrdersMain({
  tabs = [
    { id: "dine-in-4", label: "Dine-in #4", count: 3 },
    { id: "takeout-5", label: "Takeout #5" },
    { id: "dine-in-6", label: "Dine-in #6", count: 12 },
  ],
  selectedTabId,
  onSelectTab,
  onAddOrder,
}: OrdersMainProps) {
  const fallbackSelected = tabs[0]?.id ?? "default"
  const [selected, setSelected] = useControllableState(selectedTabId, fallbackSelected)

  React.useEffect(() => {
    if (tabs.length === 0) return
    const exists = tabs.some((t) => t.id === selected)
    if (!exists) setSelected(tabs[0]?.id ?? fallbackSelected)
  }, [fallbackSelected, selected, setSelected, tabs])

  return (
    <div className="min-h-full w-full bg-background">
      {/* Block 1: Order switcher */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            shape="circle"
            variant="secondary"
            onClick={onAddOrder}
            aria-label="Add order"
          >
            <SystemIcon icon={Plus} size="regular" aria-hidden="true" />
          </Button>

          <div className="flex-1 overflow-x-auto">
            <Tabs
              value={selected}
              onValueChange={(next) => {
                setSelected(next)
                onSelectTab?.(next)
              }}
            >
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    <span className="truncate">{tab.label}</span>
                    {tab.count ? <Badge variant="secondary">{tab.count}</Badge> : null}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

