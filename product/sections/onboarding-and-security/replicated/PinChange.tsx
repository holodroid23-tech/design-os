import * as React from "react"
import { Lock } from "lucide-react"

import { PinEntryScreen } from "@/components/ui/pin-entry-screen"

export const designOS = {
  presentation: "mobile" as const,
}

export interface PinChangeProps {
  onClose?: () => void
  onConfirmOldPin?: (pin: string) => void
  onConfirmNewPin?: (pin: string) => void
}

export default function PinChange({ onClose, onConfirmOldPin, onConfirmNewPin }: PinChangeProps) {
  const [pin, setPin] = React.useState("")

  return (
    <PinEntryScreen
      layout="screen"
      icon={Lock}
      title="Enter your PIN to unlock device"
      description="Enter your 4-digit code to continue."
      length={4}
      visible={true}
      value={pin}
      onChange={setPin}
      onClose={onClose}
      primaryLabel="Continue"
      primarySize="default"
      showIncompleteMessage={false}
      onPrimary={(pin) => {
        // Back-compat: treat "old pin confirm" as the unlock confirm callback.
        onConfirmOldPin?.(pin)
        onConfirmNewPin?.(pin)
      }}
    />
  )
}

