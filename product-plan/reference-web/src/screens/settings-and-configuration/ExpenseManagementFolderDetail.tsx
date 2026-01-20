import * as React from "react"
import { ChevronLeft } from "lucide-react"

import { SectionTitle } from "../../components/ui/section-title"
import { Button } from "../../components/ui/button"
import { Switch } from "../../components/ui/switch"
import { ImageTile } from "../../components/ui/image-tile"
import { SettingsGroup } from "../../components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "../../components/settings/settings-item"

export default function ExpenseManagementFolderDetail() {
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
      <div className="px-6 py-4 sticky top-0 bg-background z-10 border-b">
        <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left">
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

      {/* Block 2: Toggle List */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="space-y-3">
          {items.map((item) => (
            <SettingsGroup key={item.id}>
              <SettingsItem asChild>
                <div>
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
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}
        </div>
      </div>

      {/* Block 3: Primary Action */}
      <div className="sticky bottom-0 z-10 border-t bg-background p-6">
        <Button size="lg" className="w-full">
          Add expense
        </Button>
      </div>
    </div>
  )
}

