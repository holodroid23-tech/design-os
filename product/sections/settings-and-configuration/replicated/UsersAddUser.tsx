import * as React from "react"
import { Copy, XIcon } from "lucide-react"

import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/ui/icon"
import { SectionTitle } from "@/components/ui/section-title"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { SettingsItemDescription } from "@/components/settings/settings-item"

export const designOS = {
  presentation: "mobile" as const,
}

export interface UsersAddUserProps {
  onClose?: () => void
}

export default function UsersAddUser({ onClose }: UsersAddUserProps) {
  const [role, setRole] = React.useState<"admin" | "manager" | "cashier">("admin")
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [pin] = React.useState("5829")

  const primaryActionLabel =
    role === "admin" ? "Add administrator" : role === "manager" ? "Add manager" : "Add cashier"

  const handleCopyPin = async () => {
    try {
      await navigator.clipboard.writeText(pin)
    } catch {
      // Best-effort in preview environments.
    }
  }

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
            titleAs="h2"
            trailing={
              <BottomSlidingModalClose asChild>
                <Button variant="invisible" size="icon" aria-label="Close">
                  <SystemIcon icon={XIcon} />
                </Button>
              </BottomSlidingModalClose>
            }
          >
            Add new user
          </SectionTitle>
        }
        footer={
          <Button size="lg" className="w-full">
            {primaryActionLabel}
          </Button>
        }
      >
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <Label>User role</Label>
              <Button type="button" variant="link" size="sm">
                Learn more
              </Button>
            </div>

            <RadioButtonGroup value={role} onValueChange={(v) => setRole(v as any)}>
              <RadioButtonGroupItem value="admin" variant="default" size="lg">
                Admin
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="manager" variant="default" size="lg">
                Manager
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="cashier" variant="default" size="lg">
                Cashier
              </RadioButtonGroupItem>
            </RadioButtonGroup>
          </div>
        </div>

        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-user-full-name">Full name</Label>
            <Input
              id="add-user-full-name"
              type="text"
              placeholder="e.g. Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          {role === "cashier" ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-user-pin">PIN</Label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    id="add-user-pin"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={pin}
                    readOnly
                    aria-readonly="true"
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" aria-label="Copy PIN" onClick={handleCopyPin}>
                  <SystemIcon icon={Copy} />
                </Button>
              </div>
              <SettingsItemDescription>
                Note down this PIN. The cashier will need it to access the system. They can change it later in their
                profile.
              </SettingsItemDescription>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-user-email">Email</Label>
              <Input
                id="add-user-email"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          )}
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

