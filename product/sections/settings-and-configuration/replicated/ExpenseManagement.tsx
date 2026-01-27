import * as React from "react"
import { Folder, Plus, Download, Wallet } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { Switch } from "@/components/ui/switch"
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
import ExpenseManagementNewItem from "./ExpenseManagementNewItem"
import ExpenseManagementNewFolder from "./ExpenseManagementNewFolder"
import ExpenseManagementFolderDetail from "./ExpenseManagementFolderDetail"
import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"
import { FloatingActionButton } from "@/components/ui/floating-action-button"


export const designOS = {
  presentation: "mobile" as const,
}

export interface ExpenseManagementProps {
  onBack?: () => void
}

export default function ExpenseManagement({ onBack }: ExpenseManagementProps) {
  const [addingItem, setAddingItem] = React.useState(false)
  const [addingFolder, setAddingFolder] = React.useState(false)
  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null)



  const { products, folders, toggleFolderVisibility, toggleProductVisibility } = useExpenseProductsStore()

  if (selectedFolderId) {
    return <ExpenseManagementFolderDetail folderId={selectedFolderId} onBack={() => setSelectedFolderId(null)} />
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      <PageHeader title="Expense management" onBack={onBack} />

      {/* Block 2: Actions & List */}
      <div
        className="flex-1 overflow-auto px-4 py-4"
      >


        <div className="space-y-3">

          {folders.map((folder) => (
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
                      {products.filter((p) => p.folderId === folder.id).length} items
                    </SettingsItemDescription>
                  </SettingsItemContent>

                  <SettingsItemAction>
                    <Switch
                      checked={folder.isVisible !== false}
                      onCheckedChange={() => toggleFolderVisibility(folder.id)}
                      aria-label={`Toggle ${folder.name}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </SettingsItemAction>
                </div>
              </SettingsItem>
            </SettingsGroup>
          ))}

          {products
            .filter((p) => !p.folderId)
            .map((expense) => (
              <SettingsGroup key={expense.id}>
                <SettingsItem asChild>
                  <div className="cursor-pointer active:opacity-70 transition-opacity" onClick={() => setAddingItem(true)}>
                    <SettingsItemIcon>
                      <IconTile
                        icon={Wallet}
                        size="small"
                        color={expense.color}
                        className="rounded-[12px]"
                      />
                    </SettingsItemIcon>

                    <SettingsItemContent>
                      <SettingsItemTitle>{expense.name}</SettingsItemTitle>
                    </SettingsItemContent>

                    <SettingsItemAction>
                      <Switch
                        checked={expense.isVisible !== false}
                        onCheckedChange={() => toggleProductVisibility(expense.id)}
                        aria-label={`Toggle ${expense.name}`}
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

      {addingItem && <ExpenseManagementNewItem onClose={() => setAddingItem(false)} />}
      {addingFolder && <ExpenseManagementNewFolder onClose={() => setAddingFolder(false)} />}
    </div>
  )
}
