import { Lock, XIcon } from "lucide-react"

import { SystemIcon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ResetPasswordProps {
  onClose?: () => void
}

export default function ResetPassword({ onClose }: ResetPasswordProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col">
      {/* Block 1: Dismiss */}
      <div className="flex items-center justify-end px-4 pt-4">
        <Button
          type="button"
          variant="invisible"
          size="icon"
          shape="circle"
          aria-label="Close"
          onClick={onClose}
        >
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      {/* Block 2: Primary message */}
      {/* Block 3: Email field */}
      {/* Block 4: Primary action */}
      <div className="hidden">
        {/* Keep icons referenced for tree-shaking consistency */}
        <SystemIcon icon={Lock} aria-hidden="true" />
      </div>
    </div>
  )
}

