import * as React from "react"
import { ChevronLeft, Plus } from "lucide-react"

import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ImageTile } from "@/components/ui/image-tile"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import ExpenseManagementNewItem from "./ExpenseManagementNewItem"

interface ExpenseManagementFolderDetailProps {
  onBack?: () => void
}

export default function ExpenseManagementFolderDetail({ onBack }: ExpenseManagementFolderDetailProps) {
  const [addingItem, setAddingItem] = React.useState(false)
  const [showTopControls, setShowTopControls] = React.useState(true)
  const lastScrollTopRef = React.useRef(0)
  const items = [
    { id: "electricity-bill", label: "Electricity bill" },
    { id: "water-supply", label: "Water supply" },
    { id: "store-rent", label: "Store rent" },
    { id: "internet-services", label: "Internet services" },
    { id: "equipment-maintenance", label: "Equipment maintenance" },
  ] as const

  type ItemId = (typeof items)[number]["id"]

  const [enabledById, setEnabledById] = React.useState<Record<ItemId, boolean>>({
    "electricity-bill": true,
    "water-supply": true,
    "store-rent": true,
    "internet-services": true,
    "equipment-maintenance": true,
  })

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="px-4 py-4 sticky top-0 bg-background z-10 border-b">
        <Button
          type="button"
          variant="invisible"
          className="group w-full h-auto p-0 justify-start text-left"
          onClick={onBack}
        >
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
          >
            Monthly utilities
          </SectionTitle>
        </Button>
      </div>

      {/* Block 2: Actions & List */}
      <div
        className="flex-1 overflow-auto px-4 py-4"
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop
          const prev = lastScrollTopRef.current
          const delta = scrollTop - prev

          if (scrollTop < 8) {
            setShowTopControls(true)
          } else if (delta > 10) {
            setShowTopControls(false)
          } else if (delta < -10) {
            setShowTopControls(true)
          }

          lastScrollTopRef.current = scrollTop
        }}
      >
        <div
          className={`sticky top-0 z-10 bg-background pb-4 transition-transform duration-200 ${showTopControls ? "translate-y-0" : "-translate-y-[calc(100%+30px)]"
            }`}
        >
          <div className="flex items-center gap-3">
            <Button className="flex-1" onClick={() => setAddingItem(true)}>
              <Plus />
              <span>Add expense</span>
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => console.log("Import")}>
              <span>Import</span>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <SettingsGroup key={item.id}>
              <SettingsItem asChild>
                <div
                  className="cursor-pointer active:opacity-70 transition-opacity"
                  onClick={() => setAddingItem(true)}
                >
                  <SettingsItemIcon>
                    <ImageTile size="small" alt="" />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{item.label}</SettingsItemTitle>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={enabledById[item.id]}
                      onCheckedChange={(checked) =>
                        setEnabledById((prev) => ({
                          ...prev,
                          [item.id]: Boolean(checked),
                        }))
                      }
                      aria-label={`Toggle ${item.label}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}
        </div>
      </div>

      {/* Block 3: Actions - Moved to top */}

      {addingItem && (
        <ExpenseManagementNewItem onClose={() => setAddingItem(false)} />
      )}
    </div>
  )
}


