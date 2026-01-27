import * as React from "react"
import { Folder, Plus, Download, ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import { Switch } from "@/components/ui/switch"
import { ImageTile } from "@/components/ui/image-tile"
import { IconTile, SystemIcon } from "@/components/atoms/icon"
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
import ExpenseManagementNewFolder from "./ExpenseManagementNewFolder"
import InventoryManagementFolderDetail from "./InventoryManagementFolderDetail"
import { useInventoryStore } from "@/stores/useInventoryStore"
import { FloatingActionButton } from "@/components/ui/floating-action-button"


export const designOS = {
  presentation: "mobile" as const,
}

export interface ItemManagementProps {
  onBack?: () => void
}

export default function ItemManagement({ onBack }: ItemManagementProps) {
  const [addingItem, setAddingItem] = React.useState(false)
  const [addingFolder, setAddingFolder] = React.useState(false)
  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null)


  const { items, categories } = useInventoryStore()

  const [enabledFolders, setEnabledFolders] = React.useState<Record<string, boolean>>({})
  const [enabledItems, setEnabledItems] = React.useState<Record<string, boolean>>({})

  if (selectedFolderId) {
    return <InventoryManagementFolderDetail categoryId={selectedFolderId} onBack={() => setSelectedFolderId(null)} />
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      <PageHeader title="Item management" onBack={onBack} />

      {/* Block 2: Actions & List */}
      <div
        className="flex-1 overflow-auto px-4 py-4"
      >

        <div className="space-y-3">

          {categories.map((folder) => (
            <SettingsGroup key={folder.id}>
              <SettingsItem asChild>
                <div
                  className="cursor-pointer active:opacity-70 transition-opacity"
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  <SettingsItemIcon>
                    <IconTile
                      icon={Folder}
                      size="small"
                      color={folder.color || "blue"}
                      className="rounded-[12px]"
                    />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{folder.name}</SettingsItemTitle>
                    <SettingsItemDescription>
                      {items.filter((i) => i.categoryId === folder.id).length} items
                    </SettingsItemDescription>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={enabledFolders[folder.id] ?? true}
                      onCheckedChange={(checked) =>
                        setEnabledFolders((prev) => ({
                          ...prev,
                          [folder.id]: Boolean(checked),
                        }))
                      }
                      aria-label={`Toggle ${folder.name}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}

          {items
            .filter((item) => !item.categoryId)
            .map((item) => (
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
                        checked={enabledItems[item.id] ?? true}
                        onCheckedChange={(checked) =>
                          setEnabledItems((prev) => ({
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
            label: "Add folder",
            icon: <Folder />,
            onClick: () => setAddingFolder(true),
          },
          {
            label: "Import",
            icon: <Download />,
            onClick: () => console.log("Import"),
          },

        ]}
      />

      {addingItem && (
        <ItemManagementNewItem onClose={() => setAddingItem(false)} />
      )}
      {addingFolder && (
        <ExpenseManagementNewFolder onClose={() => setAddingFolder(false)} />
      )}
    </div>
  )
}
