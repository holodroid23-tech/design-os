import * as React from "react"
import { XIcon } from "lucide-react"

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
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSelector, ColorSelectorItem } from "@/components/ui/color-selector"
import { MediaUpload } from "@/components/ui/media-upload"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ExpenseManagementNewFolderProps {
  onClose?: () => void
}

export default function ExpenseManagementNewFolder({ onClose }: ExpenseManagementNewFolderProps) {
  const [defaultTax, setDefaultTax] = React.useState("0%")
  const [appearanceTab, setAppearanceTab] = React.useState<"color" | "image">("color")
  const [folderColor, setFolderColor] = React.useState("surface")

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
            New folder
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full">
            Save folder
          </Button>
        }
      >
        {/* Block 2: Name */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input placeholder="e.g. Hot Coffees" />
          </div>
        </div>

        {/* Block 3: Default tax */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Default tax</Label>
            <RadioButtonGroup value={defaultTax} onValueChange={setDefaultTax}>
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

        {/* Block 4: Appearance */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-3">
            <Label>Appearance</Label>
            <Tabs value={appearanceTab} onValueChange={(v) => setAppearanceTab(v as any)}>
              <TabsList className="w-full">
                <TabsTrigger value="color" className="flex-1">
                  Color
                </TabsTrigger>
                <TabsTrigger value="image" className="flex-1">
                  Image
                </TabsTrigger>
              </TabsList>

              <TabsContent value="color" className="pt-3">
                <ColorSelector value={folderColor} onValueChange={setFolderColor} aria-label="Folder appearance">
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
                  <ColorSelectorItem value="gradient-blue" gradient="bg-gradient-tile-blue" aria-label="Blue Gradient" />
                  <ColorSelectorItem value="gradient-green" gradient="bg-gradient-tile-green" aria-label="Green Gradient" />
                  <ColorSelectorItem value="gradient-red" gradient="bg-gradient-tile-red" aria-label="Red Gradient" />
                  <ColorSelectorItem value="gradient-amber" gradient="bg-gradient-tile-amber" aria-label="Amber Gradient" />
                  <ColorSelectorItem value="gradient-purple" gradient="bg-gradient-tile-purple" aria-label="Purple Gradient" />
                  <ColorSelectorItem value="gradient-orange" gradient="bg-gradient-tile-orange" aria-label="Orange Gradient" />
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

