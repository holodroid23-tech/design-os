import { Lock } from "lucide-react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconTile } from "@/components/ui/icon"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CheckEmailPasswordResetInstructionsProps {
  onClose?: () => void
}

export default function CheckEmailPasswordResetInstructions({
  onClose,
}: CheckEmailPasswordResetInstructionsProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Dismiss */}
      <div className="flex items-center justify-end px-4 pt-4">
        <Button
          variant="invisible"
          size="icon"
          shape="circle"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      {/* Block 2: Primary message */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <IconTile icon={Lock} size="large" />

          <div className="flex flex-col gap-2">
            <h1>Check your email</h1>
            <p>We have sent password reset instructions to your email address.</p>
          </div>
        </div>
      </div>

      {/* Block 3: Primary action */}
      {/* Block 4: Secondary assistance */}
    </div>
  )
}

