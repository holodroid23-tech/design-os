import { XIcon } from "lucide-react"

import { DialogClose } from "@/components/ui/dialog"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/ui/icon"

export const designOS = {
  presentation: "mobile" as const,
}

export default function ExpenseManagementNewFolder() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      {/* Tap-outside to close */}
      <DialogClose asChild>
        <button
          type="button"
          aria-label="Close"
          className="absolute inset-0 z-0 bg-black/50"
        />
      </DialogClose>

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 z-10 animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-background border border-border rounded-t-[18px] max-h-[85vh] overflow-y-auto">
          {/* Block 1: Header */}
          <div className="px-6 py-5">
            <SectionTitle
              titleAs="h1"
              trailing={
                <DialogClose asChild>
                  <Button variant="invisible" size="icon" aria-label="Close">
                    <SystemIcon icon={XIcon} />
                  </Button>
                </DialogClose>
              }
            >
              New folder
            </SectionTitle>
          </div>
        </div>
      </div>
    </div>
  )
}

