import { Lock } from "lucide-react"
import * as React from "react"

import { PinEntryScreen } from "../../components/ui/pin-entry-screen"

export const designOS = {
  presentation: "mobile" as const,
}

export interface CreateNewPinProps {
  onClose?: () => void
  onConfirm?: (pin: string) => void
}

export default function CreateNewPin({ onClose, onConfirm }: CreateNewPinProps) {
  const [pin, setPin] = React.useState("")

  return (
    <PinEntryScreen
      layout="screen"
      icon={Lock}
      title="Create your PIN"
      description="Enter a 4-digit code to secure your account profile."
      length={4}
      visible
      value={pin}
      onChange={setPin}
      onClose={onClose}
      primaryLabel="Confirm PIN"
      onPrimary={(value) => onConfirm?.(value)}
    />
  )
}

