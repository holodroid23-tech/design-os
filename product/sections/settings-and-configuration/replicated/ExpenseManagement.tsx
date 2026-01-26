import * as React from "react"
import { ChevronLeft, Folder, Plus } from "lucide-react"

import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
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
import ExpenseManagementNewItem from "./ExpenseManagementNewItem"
import ExpenseManagementNewFolder from "./ExpenseManagementNewFolder"
import ExpenseManagementFolderDetail from "./ExpenseManagementFolderDetail"
import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"

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
  const [showTopControls, setShowTopControls] = React.useState(true)
  const lastScrollTopRef = React.useRef(0)

  const { products, folders } = useExpenseProductsStore()

  const [enabledFolders, setEnabledFolders] = React.useState<Record<string, boolean>>({})
  const [enabledExpenses, setEnabledExpenses] = React.useState<Record<string, boolean>>({})

  if (selectedFolderId) {
    return <ExpenseManagementFolderDetail folderId={selectedFolderId} onBack={() => setSelectedFolderId(null)} />
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="shrink-0 border-b bg-background px-6 pt-10 pb-4 z-10 flex items-center">
        <Button
          type="button"
          variant="invisible"
          className="group w-full h-auto p-0 justify-start text-left"
          onClick={onBack}
        >
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
            }
          >
            Expense management
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
            <Button variant="secondary" className="flex-1" onClick={() => setAddingFolder(true)}>
              <Folder />
              <span>Add folder</span>
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => console.log("Import")}>
              <span>Import</span>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {folders.map((folder) => (
            <SettingsGroup key={folder.id}>
              <SettingsItem asChild>
                <div
                  className="cursor-pointer active:opacity-70 transition-opacity"
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  <SettingsItemIcon>
                    <IconTile icon={Folder} size="small" variant="tile" tone="info" className="rounded-[12px]" />
                  </SettingsItemIcon>

                  <SettingsItemContent>
                    <SettingsItemTitle>{folder.name}</SettingsItemTitle>
                    <SettingsItemDescription>
                      {products.filter((p) => p.folderId === folder.id).length} items
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

          {products
            .filter((p) => !p.folderId)
            .map((expense) => (
              <SettingsGroup key={expense.id}>
                <SettingsItem asChild>
                  <div className="cursor-pointer active:opacity-70 transition-opacity" onClick={() => setAddingItem(true)}>
                    <SettingsItemIcon>
                      <ImageTile size="small" alt="" className="rounded-[12px]" tone={expense.color as any} />
                    </SettingsItemIcon>

                    <SettingsItemContent>
                      <SettingsItemTitle>{expense.name}</SettingsItemTitle>
                    </SettingsItemContent>

                    <SettingsItemAction>
                      <Switch
                        checked={enabledExpenses[expense.id] ?? true}
                        onCheckedChange={(checked) =>
                          setEnabledExpenses((prev) => ({
                            ...prev,
                            [expense.id]: Boolean(checked),
                          }))
                        }
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

      {addingItem && <ExpenseManagementNewItem onClose={() => setAddingItem(false)} />}
      {addingFolder && <ExpenseManagementNewFolder onClose={() => setAddingFolder(false)} />}
    </div>
  )
}


