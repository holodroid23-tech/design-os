import { Info, User, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SystemIcon } from "@/components/ui/icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ResetForgottenPinCashierFinalProps {
  onExit?: () => void
  admins?: Array<{ name: string; onPress?: () => void }>
}

export default function ResetForgottenPinCashierFinal({
  onExit,
  admins = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Michael Scott" },
  ],
}: ResetForgottenPinCashierFinalProps) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      {/* Block 1: Header dismiss control */}
      <div className="flex items-center justify-end px-6 pt-5">
        <Button
          type="button"
          variant="invisible"
          size="icon-lg"
          shape="circle"
          aria-label="Close"
          onClick={onExit}
        >
          <SystemIcon icon={XIcon} aria-hidden="true" />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center px-6 pt-10">
        {/* Block 2: Message block */}
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          <Avatar size="large" variant="blue">
            <AvatarFallback>
              <SystemIcon icon={Info} aria-hidden="true" />
            </AvatarFallback>
          </Avatar>

          <h1 className="mt-7 text-[42px] leading-[1.05] font-semibold tracking-tight text-foreground">
            Contact your admin
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            To reset your PIN, please reach out to one of the following administrators:
          </p>
        </div>

        {/* Block 3: Administrator list */}
        <div className="mt-10 w-full max-w-sm">
          <div className="flex flex-col gap-4">
            {admins.map((admin) => (
              <button
                key={admin.name}
                type="button"
                onClick={admin.onPress}
                className="w-full rounded-[18px] border border-border bg-card/10 px-5 py-5 text-left shadow-sm transition-colors hover:bg-card/20"
              >
                <div className="flex items-center gap-4">
                  <Avatar size="small" variant="secondary">
                    <AvatarFallback>
                      <SystemIcon icon={User} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-semibold text-foreground">{admin.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

