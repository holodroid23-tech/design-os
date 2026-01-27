import * as React from "react"
import { Plus, Download, ShoppingBag } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { Switch } from "@/components/ui/switch"
import { ImageTile } from "@/components/ui/image-tile"
import { IconTile } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import ItemManagementNewItem from "./ItemManagementNewItem"
import { useInventoryStore } from "@/stores/useInventoryStore"
import { FloatingActionButton } from "@/components/ui/floating-action-button"


export const designOS = {
  presentation: "mobile" as const,
}

interface InventoryManagementFolderDetailProps {
  categoryId: string
  onBack?: () => void
}

export default function InventoryManagementFolderDetail({ categoryId, onBack }: InventoryManagementFolderDetailProps) {
  const [addingItem, setAddingItem] = React.useState(false)


  const { items, categories } = useInventoryStore()
  const category = categories.find((c) => c.id === categoryId)
  const folderItems = items.filter((i) => i.categoryId === categoryId)

  const [enabledById, setEnabledById] = React.useState<Record<string, boolean>>({})

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      <PageHeader title={category?.name || "Folder"} onBack={onBack} />

      {/* Block 2: Actions & List */}
      <div
        className="flex-1 overflow-auto px-4 py-4"
      >

        <div className="space-y-3">

          {folderItems.map((item) => (
            <SettingsGroup key={item.id}>
              <SettingsItem asChild>
                <div className="cursor-pointer active:opacity-70 transition-opacity" onClick={() => setAddingItem(true)}>
                  <SettingsItemIcon>
                    {item.imageSrc ? (
                      <ImageTile src={item.imageSrc} size="small" alt={item.name} className="rounded-[12px]" />
                    ) : (
                      <IconTile
                        icon={ShoppingBag}
                        size="small"
                        color={item.color}
                        className="rounded-[12px]"
                      />
                    )}
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{item.name}</SettingsItemTitle>
                    <SettingsItemDescription>${item.price.toFixed(2)}</SettingsItemDescription>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={enabledById[item.id] ?? true}
                      onCheckedChange={(checked) =>
                        setEnabledById((prev) => ({
                          ...prev,
                          [item.id]: Boolean(checked),
                        }))
                      }
                      aria-label={`Toggle ${item.name}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}
        </div>
      </div>

      <FloatingActionButton
        actions={[
          {
            label: "Add item",
            icon: <Plus />,
            onClick: () => setAddingItem(true),
          },
          {
            label: "Import",
            icon: <Download />,
            onClick: () => console.log("Import"),
          },

        ]}
      />

      {addingItem && <ItemManagementNewItem onClose={() => setAddingItem(false)} />}
    </div>
  )
}


