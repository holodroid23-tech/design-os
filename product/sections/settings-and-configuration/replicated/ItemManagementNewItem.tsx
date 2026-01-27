import * as React from "react"
import { Star, XIcon } from "lucide-react"

import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectWithSliding } from "@/components/ui/select-with-sliding"
import { Numpad } from "@/components/ui/numpad"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSelector, ColorSelectorItem } from "@/components/ui/color-selector"
import { MediaUpload } from "@/components/ui/media-upload"
import { IconToggleButton } from "@/components/ui/icon-toggle-button"
import { useInventoryStore } from "@/stores/useInventoryStore"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ItemManagementNewItemProps {
  onClose?: () => void
}

export default function ItemManagementNewItem({ onClose }: ItemManagementNewItemProps) {
  const { categories, addItem } = useInventoryStore()

  const [name, setName] = React.useState("")
  const [favorite, setFavorite] = React.useState(false)
  const [folderId, setFolderId] = React.useState<string>("none")
  const [price, setPrice] = React.useState("0")
  const [tax, setTax] = React.useState("21%")
  const [appearanceTab, setAppearanceTab] = React.useState<"color" | "image">("color")
  const [itemColor, setItemColor] = React.useState("surface")

  const handleSave = () => {
    if (!name.trim()) return
    addItem({
      name,
      price: parseFloat(price) || 0,
      categoryId: folderId === "none" ? null : folderId,
      isFavorite: favorite,
      color: itemColor,
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
        className="bg-black"
        scaffoldProps={{ className: "bg-black" }}
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
            New item
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full" onClick={handleSave}>
            Save item
          </Button>
        }
      >
        {/* Block 2: Name */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-item-name">Name</Label>
            <div className="flex items-center gap-3">
              <Input
                id="new-item-name"
                placeholder="e.g. Flat White"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <IconToggleButton
                pressed={favorite}
                onPressedChange={setFavorite}
                icon={Star}
                label={favorite ? "Unfavorite" : "Favorite"}
                variant="ghost"
                fillIconWhenPressed
                pressedIconClassName="text-amber-400 fill-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Block 3: Folder */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Folder</Label>
            <SelectWithSliding
              variant="sliding"
              placeholder="Select a folder"
              value={folderId}
              onValueChange={(val) => setFolderId(String(val))}
              options={[
                { value: "none", label: "No Folder" },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
          </div>
        </div>

        {/* Block 4: Price */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-3">
            {/* Numpad shows its own label ("Enter price") */}
            <div className="w-full">
              <Numpad className="max-w-none" value={price} onChange={setPrice} isCurrency={true} />
            </div>
          </div>
        </div>

        {/* Block 5: Tax */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Tax</Label>
            <RadioButtonGroup value={tax} onValueChange={setTax}>
              <RadioButtonGroupItem value="0%" variant="default" size="lg">
                0%
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="10%" variant="default" size="lg">
                10%
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="21%" variant="default" size="lg">
                21%
              </RadioButtonGroupItem>
            </RadioButtonGroup>
          </div>
        </div>

        {/* Block 6: Appearance */}
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
                <ColorSelector value={itemColor} onValueChange={setItemColor} aria-label="Item appearance">
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
                <MediaUpload />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

