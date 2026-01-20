import { BottomSlidingModal, BottomSlidingModalContent } from "@/components/ui/bottom-sliding-modal"
import * as React from "react"
import { Lock } from "lucide-react"

import { PinEntryScreen } from "@/components/ui/pin-entry-screen"

export const designOS = {
  presentation: "mobile" as const,
}

export interface SettingsSecurityAccesWithPinToEnterSectionProps {
  onClose?: () => void
  onConfirmPin?: (pin: string) => void
}

export default function SettingsSecurityAccesWithPinToEnterSection({
  onClose,
  onConfirmPin,
}: SettingsSecurityAccesWithPinToEnterSectionProps) {
  const [pin, setPin] = React.useState("")

  return (
    <div className="relative h-full min-h-full bg-background">
      {/* Background is intentionally abstracted; the modal/overlay is the focus of this mock. */}
      <div className="absolute inset-0 bg-background">
        <div className="h-full w-full bg-muted/30 blur-sm scale-105" />
      </div>

      <BottomSlidingModal open onOpenChange={() => {}}>
        <BottomSlidingModalContent
          scaffoldProps={{
            bodyClassName: "flex justify-center py-2",
          }}
        >
          <PinEntryScreen
            layout="embedded"
            icon={Lock}
            title="Authorization required"
            description="Manager or admin authorization is required to access settings. Please enter your 4-digit PIN."
            length={4}
            value={pin}
            onChange={setPin}
            onClose={onClose}
            primaryLabel="Confirm PIN"
            onPrimary={(value) => onConfirmPin?.(value)}
          />
        </BottomSlidingModalContent>
      </BottomSlidingModal>
    </div>
  )
}

