import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { SectionTitle } from "@/components/ui/section-title"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export const designOS = {
  presentation: "modal" as const,
}

export default function ExpenseManagementNewItem() {
  return (
    <Sheet open={true}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="inset-0 top-0 left-0 max-w-none h-[100dvh] w-[100dvw] rounded-none p-0"
      >
        <div className="flex h-full flex-col bg-background">
          {/* Block 2: Header row */}
          <div className="px-6 pt-6 pb-4">
            <SectionTitle
              size="page"
              trailing={
                <DialogClose asChild>
                  <Button aria-label="Close" variant="secondary" size="icon" shape="circle">
                    <X />
                  </Button>
                </DialogClose>
              }
            >
              New expense
            </SectionTitle>
          </div>

          {/* Block 3: Name row */}
          {/* Block 4: Category row */}
          {/* Block 5: Appearance block */}
          {/* Block 6: Stroke style block */}
          {/* Block 7: Footer action */}
        </div>
      </SheetContent>
    </Sheet>
  )
}

