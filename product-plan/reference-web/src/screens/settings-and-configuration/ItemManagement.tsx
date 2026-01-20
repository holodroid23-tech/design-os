import * as React from "react"
import { ChevronLeft, Folder } from "lucide-react"

import { SectionTitle } from "../../components/ui/section-title"
import { Button } from "../../components/ui/button"
import { Switch } from "../../components/ui/switch"
import { ImageTile } from "../../components/ui/image-tile"
import { IconTile } from "../../components/atoms/icon"
import { SettingsGroup } from "../../components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "../../components/settings/settings-item"

export const designOS = {
  presentation: "mobile" as const,
}

export default function ItemManagement() {
  const folders = [
    { id: "monthly-utilities", label: "Monthly utilities", countLabel: "12 items" },
    { id: "suppliers", label: "Suppliers", countLabel: "8 items" },
  ] as const

  const items = [
    { id: "electricity-bill", label: "Electricity bill", price: "$120.00" },
    { id: "water-supply", label: "Water supply", price: "$45.00" },
    { id: "store-rent", label: "Store rent", price: "$2,400.00" },
    { id: "internet-services", label: "Internet services", price: "$89.00" },
    { id: "equipment-maintenance", label: "Equipment maintenance", price: "$150.00" },
  ] as const

  type FolderId = (typeof folders)[number]["id"]
  type ItemId = (typeof items)[number]["id"]

  const [enabledFolders, setEnabledFolders] = React.useState<Record<FolderId, boolean>>({
    "monthly-utilities": true,
    suppliers: true,
  })

  const [enabledItems, setEnabledItems] = React.useState<Record<ItemId, boolean>>({
    "electricity-bill": true,
    "water-supply": true,
    "store-rent": true,
    "internet-services": true,
    "equipment-maintenance": true,
  })

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
        <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left">
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
            }
          >
            Item management
          </SectionTitle>
        </Button>
      </div>

      {/* Block 2: List */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="space-y-3">
          {folders.map((folder) => (
            <SettingsGroup key={folder.id}>
              <SettingsItem asChild>
                <div>
                  <SettingsItemIcon>
                    <IconTile icon={Folder} size="small" variant="tile" tone="info" className="rounded-[12px]" />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{folder.label}</SettingsItemTitle>
                    <SettingsItemDescription>{folder.countLabel}</SettingsItemDescription>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={enabledFolders[folder.id]}
                      onCheckedChange={(checked) =>
                        setEnabledFolders((prev) => ({
                          ...prev,
                          [folder.id]: Boolean(checked),
                        }))
                      }
                      aria-label={`Toggle ${folder.label}`}
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}

          {items.map((item) => (
            <SettingsGroup key={item.id}>
              <SettingsItem asChild>
                <div>
                  <SettingsItemIcon>
                    <ImageTile size="small" alt="" className="rounded-[12px]" />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{item.label}</SettingsItemTitle>
                    <SettingsItemDescription>{item.price}</SettingsItemDescription>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={enabledItems[item.id]}
                      onCheckedChange={(checked) =>
                        setEnabledItems((prev) => ({
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

      {/* Block 3: Actions */}
      <div className="sticky bottom-0 z-10 border-t bg-background p-6">
        <div className="flex gap-3">
          <Button size="lg" variant="ghost" className="flex-1">
            Add folder
          </Button>
          <Button size="lg" variant="ghost" className="flex-1">
            Add item
          </Button>
        </div>
      </div>
    </div>
  )
}

