import * as React from "react"
import { Star, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import { SectionTitle } from "@/components/ui/section-title"
import { SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectWithSliding } from "@/components/ui/select-with-sliding"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSelector, ColorSelectorItem } from "@/components/ui/color-selector"
import { MediaUpload } from "@/components/ui/media-upload"
import { IconToggleButton } from "@/components/ui/icon-toggle-button"

import { useExpenseProductsStore } from "@/stores/useExpenseProductsStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ExpenseManagementNewItemProps {
  onClose?: () => void
  initialFolderId?: string | number
}

export default function ExpenseManagementNewItem({ onClose, initialFolderId }: ExpenseManagementNewItemProps) {
  // Store
  const { folders, addFolder, addProduct } = useExpenseProductsStore()

  // State
  const [name, setName] = React.useState("")
  const [favorite, setFavorite] = React.useState(false)
  const [folderId, setFolderId] = React.useState<string | number>(initialFolderId || "operations") // Default to operations or empty?
  const [appearanceTab, setAppearanceTab] = React.useState<"color" | "image">("color")
  const [expenseColor, setExpenseColor] = React.useState("surface")

  // Prepare folder options
  const folderOptions = React.useMemo(() => {
    return [
      { value: "none", label: "No folder" },
      ...folders.map((f) => ({ value: f.id, label: f.name })),
      { value: "__create__", label: "Create new folder..." },
    ]
  }, [folders])

  const handleFolderChange = (val: string | number) => {
    if (val === "__create__") {
      // Simple prompt for now - could be a nested dialog in future
      // Using a small timeout to allow the select to close if it wants, 
      // though typically we want to keep context.
      setTimeout(() => {
        const newName = window.prompt("Enter new folder name:")
        if (newName && newName.trim()) {
          const newId = addFolder(newName.trim())
          setFolderId(newId)
        } else {
          // Revert or keep previous?
          // If they cancelled, we just don't change anything or go back to what it was.
          // Ideally we'd keep previous. For now, let's just not set it to __create__.
        }
      }, 100)
    } else {
      setFolderId(val)
    }
  }

  const handleSave = () => {
    if (!name.trim()) return

    const finalFolderId = folderId === "none" || folderId === "__create__" ? null : String(folderId)

    addProduct({
      name,
      folderId: finalFolderId,
      color: expenseColor,
      isFavorite: favorite,
    })

    onClose?.()
  }

  return (
    <BottomSlidingModal
      defaultOpen
      onOpenChange={(open) => {
        if (!open) onClose?.()
      }}
    >
      <BottomSlidingModalContent
        header={
          <SectionTitle
            titleAs="h1"
            trailing={
              <BottomSlidingModalClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close">
                  <SystemIcon icon={XIcon} />
                </Button>
              </BottomSlidingModalClose>
            }
          >
            New expense
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full" onClick={handleSave}>
            Save expense
          </Button>
        }
      >
        {/* Block 1: Name & Favorite */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-item-name">Name</Label>
            <div className="flex items-center gap-3">
              <Input
                id="new-item-name"
                placeholder="e.g. Flat White"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
              <IconToggleButton
                pressed={favorite}
                onPressedChange={setFavorite}
                icon={Star}
                label={favorite ? "Unfavorite" : "Favorite"}
                variant="ghost"
                fillIconWhenPressed
                pressedIconClassName="text-amber-400 fill-amber-400"
                className="h-11 w-11 [&_svg]:size-6" // Increased size
              />
            </div>
          </div>
        </div>

        {/* Block 2: Folder */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Folder</Label>
            <SelectWithSliding
              variant="sliding"
              placeholder="Select a folder"
              value={folderId}
              onValueChange={handleFolderChange}
              options={folderOptions}
              className="h-11" // Match input height
              slidingPresentation="picker"
            />
          </div>
        </div>

        {/* Block 4: Appearance */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-3">
            <Label>Appearance</Label>
            <Tabs value={appearanceTab} onValueChange={(v) => setAppearanceTab(v as any)}>
              <TabsList className="w-full">
                <TabsTrigger value="color">
                  Color
                </TabsTrigger>
                <TabsTrigger value="image">
                  Image
                </TabsTrigger>
              </TabsList>

              <TabsContent value="color" className="pt-3">
                <ColorSelector value={expenseColor} onValueChange={setExpenseColor} aria-label="Expense appearance">
                  {/* Solid Colors */}
                  <ColorSelectorItem value="surface" color="#111114" aria-label="Default Black" />
                  <ColorSelectorItem value="blue" color="#3b82f6" aria-label="Blue" />
                  <ColorSelectorItem value="green" color="#22c55e" aria-label="Green" />
                  <ColorSelectorItem value="red" color="#ef4444" aria-label="Red" />
                  <ColorSelectorItem value="amber" color="#f59e0b" aria-label="Amber" />
                  <ColorSelectorItem value="purple" color="#a855f7" aria-label="Purple" />
                  <ColorSelectorItem value="orange" color="#f97316" aria-label="Orange" />
                  <ColorSelectorItem value="sky" color="#38bdf8" aria-label="Sky" />
                  <ColorSelectorItem value="pink" color="#ec4899" aria-label="Pink" />
                  <ColorSelectorItem value="indigo" color="#6366f1" aria-label="Indigo" />
                  <ColorSelectorItem value="lime" color="#84cc16" aria-label="Lime" />
                  {/* Gradients - Cross-hue for visual distinction */}
                  <ColorSelectorItem value="gradient-blue" gradient="bg-gradient-tile-blue" aria-label="Blue Gradient" />
                  <ColorSelectorItem value="gradient-green" gradient="bg-gradient-tile-green" aria-label="Green Gradient" />
                  <ColorSelectorItem value="gradient-red" gradient="bg-gradient-tile-red" aria-label="Red Gradient" />
                  <ColorSelectorItem value="gradient-amber" gradient="bg-gradient-tile-amber" aria-label="Amber Gradient" />
                  <ColorSelectorItem value="gradient-purple" gradient="bg-gradient-tile-purple" aria-label="Purple Gradient" />
                  <ColorSelectorItem value="gradient-orange" gradient="bg-gradient-tile-orange" aria-label="Orange Gradient" />
                  <ColorSelectorItem value="gradient-teal" gradient="bg-gradient-tile-teal" aria-label="Teal Gradient" />
                  <ColorSelectorItem value="gradient-pink" gradient="bg-gradient-tile-pink" aria-label="Pink Gradient" />
                  <ColorSelectorItem value="gradient-indigo" gradient="bg-gradient-tile-indigo" aria-label="Indigo Gradient" />
                  <ColorSelectorItem value="gradient-lime" gradient="bg-gradient-tile-lime" aria-label="Lime Gradient" />
                  <ColorSelectorItem value="gradient-sky" gradient="bg-gradient-tile-sky" aria-label="Sky Gradient" />
                </ColorSelector>
              </TabsContent>

              <TabsContent value="image" className="pt-3">
                <MediaUpload chooseFromFilesLabel="Choose from library" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}
