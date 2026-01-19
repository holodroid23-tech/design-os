import * as React from "react"
import { ChevronLeft } from "lucide-react"

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
        <button type="button" className="w-full text-left group">
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
          >
            Monthly utilities
          </SectionTitle>
        </button>
      </div>

      {/* Block 2: Toggle List */}
      <div className="px-6 py-4">
        <SettingsGroup>
          {items.map((item) => (
            <SettingsItem key={item.id} type="button">
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
            </SettingsItem>
          ))}
        </SettingsGroup>
      </div>

      {/* Block 3: Primary Action */}
      <div className="px-6 py-8 pb-12 mt-auto">
        <Button variant="outline" size="lg" className="w-full">
          Add expense
        </Button>
      </div>
    </div>
  )
}

