import { Lock, XIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ResetPinEnterEmailManagerAdminProps {
  onClose?: () => void
  onSendResetLink?: (email: string) => void

  email?: string
  defaultEmail?: string
  onEmailChange?: (email: string) => void
}

function useControllableEmail(value: string | undefined, defaultValue: string) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const set = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next)
    },
    [isControlled]
  )

  return [current, set] as const
}

export default function ResetPinEnterEmailManagerAdmin({
  onClose,
  onSendResetLink,
  email,
  defaultEmail = "admin@coffeeshop.com",
  onEmailChange,
}: ResetPinEnterEmailManagerAdminProps) {
  const [currentEmail, setCurrentEmail] = useControllableEmail(email, defaultEmail)
  const canSubmit = currentEmail.trim().length > 0

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
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

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Block 2: Primary message */}
          <div className="flex flex-col items-center text-center">
            <IconTile icon={Lock} size="large" variant="tile" tone="info" />

            <div className="mt-6 flex flex-col gap-2">
              <h1>Reset your PIN</h1>
              <p>Enter your manager/administrator email to receive a recovery link.</p>
            </div>
          </div>

          {/* Block 3: Email field */}
          <div className="mt-10 flex flex-col gap-2">
            <Label htmlFor="reset-pin-manager-admin-email">Email address</Label>
            <Input
              id="reset-pin-manager-admin-email"
              type="email"
              placeholder="admin@coffeeshop.com"
              autoComplete="email"
              value={currentEmail}
              onChange={(e) => {
                const next = e.target.value
                setCurrentEmail(next)
                onEmailChange?.(next)
              }}
            />
          </div>
        </div>
      </div>

      {/* Block 4: Primary action */}
      <div className="px-6 pb-6">
        <div className="mx-auto w-full max-w-sm">
          <Button
            type="button"
            variant="default"
            size="lg"
            className="w-full"
            disabled={!canSubmit}
            onClick={() => onSendResetLink?.(currentEmail.trim())}
          >
            Send reset link
          </Button>
        </div>
      </div>

      <div className="hidden">
        {/* Keep icons referenced for tree-shaking consistency */}
        <SystemIcon icon={Lock} aria-hidden="true" />
      </div>
    </div>
  )
}

