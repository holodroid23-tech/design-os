import { Lock, XIcon } from "lucide-react"

import { SystemIcon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CreateNewPinProps {
  onExit?: () => void
}

export default function CreateNewPin({ onExit }: CreateNewPinProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Top actions */}
      <div className="flex items-center justify-end px-4 pt-4">
        <Button
          type="button"
          variant="invisible"
          size="icon"
          shape="circle"
          aria-label="Close"
          onClick={onExit}
        >
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      {/* Block 2: Header */}
      <div className="flex flex-col items-center px-6 pt-6">
        <div className="flex size-16 items-center justify-center rounded-full border border-border/40">
          <SystemIcon icon={Lock} size="huge" aria-hidden="true" />
        </div>
      </div>
      {/* Block 3: PIN entry */}
      {/* Block 4: Primary CTA */}

      <div className="hidden">
        {/* Keep icons referenced for tree-shaking consistency */}
        <SystemIcon icon={Lock} aria-hidden="true" />
      </div>
    </div>
  )
}

