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
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSelector, ColorSelectorItem } from "@/components/ui/color-selector"
import { MediaUpload } from "@/components/ui/media-upload"
import { StrokeStyleSelector, type StrokeStyleOption } from "@/components/ui/stroke-style-selector"
import { IconToggleButton } from "@/components/ui/icon-toggle-button"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ExpenseManagementNewItemProps {
  onClose?: () => void
}

export default function ExpenseManagementNewItem({ onClose }: ExpenseManagementNewItemProps) {
  const [name, setName] = React.useState("")
  const [favorite, setFavorite] = React.useState(false)
  const [category, setCategory] = React.useState<string | number>("operations")
  const [tax, setTax] = React.useState("21%")
  const [appearanceTab, setAppearanceTab] = React.useState<"color" | "image">("image")
  const [expenseColor, setExpenseColor] = React.useState("blue")
  const [strokeStyle, setStrokeStyle] = React.useState<StrokeStyleOption>("common")

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
          <Button size="lg" className="w-full">
            Save expense
          </Button>
        }
      >
        {/* Block 2: Name */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-expense-name">Name</Label>
            <div className="flex items-center gap-3">
              <Input
                id="new-expense-name"
                placeholder="e.g. Monthly Rent"
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

        {/* Block 3: Category */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <SelectWithSliding
              variant="sliding"
              placeholder="Select a category"
              value={category}
              onValueChange={setCategory}
              options={[
                { value: "operations", label: "Operations" },
                { value: "rent", label: "Rent" },
                { value: "utilities", label: "Utilities" },
                { value: "suppliers", label: "Suppliers" },
              ]}
            />
          </div>
        </div>

        {/* Block 4: Tax */}
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

        {/* Block 5: Appearance */}
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
                <ColorSelector value={expenseColor} onValueChange={setExpenseColor} aria-label="Expense color">
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
                  <ColorSelectorItem value="teal" color="#14b8a6" aria-label="Teal" />
                  <ColorSelectorItem value="slate" color="#64748b" aria-label="Slate" />
                </ColorSelector>
              </TabsContent>

              <TabsContent value="image" className="pt-3">
                <MediaUpload chooseFromFilesLabel="Choose from library" />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Block 6: Stroke style */}
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-3">
            <Label>Stroke style</Label>
            <StrokeStyleSelector value={strokeStyle} onValueChange={setStrokeStyle} />
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

