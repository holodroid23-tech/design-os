import * as React from "react"
import { ChevronLeft, Plus, Download, Wallet } from "lucide-react"

import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { IconTile } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import ExpenseManagementNewItem from "./ExpenseManagementNewItem"

import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"
import { FloatingActionButton } from "@/components/ui/floating-action-button"


interface ExpenseManagementFolderDetailProps {
  folderId: string
  onBack?: () => void
}

export default function ExpenseManagementFolderDetail({ folderId, onBack }: ExpenseManagementFolderDetailProps) {
  const [addingItem, setAddingItem] = React.useState(false)


  const { products, folders, toggleProductVisibility } = useExpenseProductsStore()
  const folder = folders.find(f => f.id === folderId)
  const items = products.filter(p => p.folderId === folderId)

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
            {folder?.name || "Folder"}
          </SectionTitle>
        </Button>
      </div>

      {/* Block 2: Actions & List */}
      <div
        className="flex-1 overflow-auto px-4 py-4"
      >

        <div className="space-y-3">

          {items.map((item) => (
            <SettingsGroup key={item.id}>
              <SettingsItem asChild>
                <div
                  className="cursor-pointer active:opacity-70 transition-opacity"
                  onClick={() => setAddingItem(true)}
                >
                  <SettingsItemIcon>
                    <IconTile
                      icon={Wallet}
                      size="small"
                      color={item.color}
                      className="rounded-[12px]"
                    />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{item.name}</SettingsItemTitle>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={item.isVisible !== false}
                      onCheckedChange={() => toggleProductVisibility(item.id)}
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
            label: "Add expense",
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

      {/* Block 3: Actions - Moved to top */}

      {addingItem && (
        <ExpenseManagementNewItem onClose={() => setAddingItem(false)} initialFolderId={folderId} />
      )}
    </div>
  )
}


