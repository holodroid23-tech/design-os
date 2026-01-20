import * as React from "react"
import { XIcon } from "lucide-react"

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

export default function UsersEditUser() {
  const [role, setRole] = React.useState<"admin" | "manager" | "cashier">("admin")
  const [fullName, setFullName] = React.useState("Sarah Jenkins")
  const [email, setEmail] = React.useState("sarah@compost.com")

  const isCashier = role === "cashier"

  return (
    <BottomSlidingModal defaultOpen>
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
            Edit user
          </SectionTitle>
        }
        footer={
          <div className="flex items-center gap-3">
            <Button variant="destructive" size="lg" className="flex-1">
              Remove user
            </Button>
            <Button size="lg" className="flex-1">
              Save changes
            </Button>
          </div>
        }
      >
        {/* Block 3 — Role selection */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <Label>User role</Label>
              <Button type="button" variant="link" size="sm">
                Learn more
              </Button>
            </div>

            <RadioButtonGroup value={role} onValueChange={(v) => setRole(v as any)}>
              <RadioButtonGroupItem value="admin" variant="default" size="lg" disabled={isCashier}>
                Admin
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="manager" variant="default" size="lg" disabled={isCashier}>
                Manager
              </RadioButtonGroupItem>
              <RadioButtonGroupItem value="cashier" variant="default" size="lg">
                Cashier
              </RadioButtonGroupItem>
            </RadioButtonGroup>
          </div>
        </div>

        {/* Block 4 — Form fields */}
        <div className="px-6 pb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-user-full-name">Full name</Label>
            <Input
              id="edit-user-full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          {isCashier ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-user-pin">PIN</Label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    id="edit-user-pin"
                    type="password"
                    value="••••"
                    readOnly
                    aria-readonly="true"
                    autoComplete="off"
                  />
                </div>
                <Button type="button" variant="ghost">
                  Regenerate
                </Button>
              </div>
              <SettingsItemDescription>
                For security reasons, we cannot reveal the current PIN. You can regenerate it to create a new one.
              </SettingsItemDescription>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-user-email">Email</Label>
              <Input
                id="edit-user-email"
                type="email"
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

