import * as React from "react"
import { XIcon } from "lucide-react"

import { SystemIcon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { PinEntry } from "@/components/ui/pin-entry"
import { cn } from "@/lib/utils"

export const designOS = {
  presentation: "mobile" as const,
}

type PinChangeStep = "old" | "new"

export default function PinChange() {
  const [step, setStep] = React.useState<PinChangeStep>("old")
  const [oldPin, setOldPin] = React.useState("")
  const [newPin, setNewPin] = React.useState("")

  const title = step === "old" ? "Enter your current PIN" : "Enter your new PIN"
  const description =
    step === "old"
      ? "Enter your current 4-digit code to continue."
      : "Enter your new 4-digit code to continue."

  const value = step === "old" ? oldPin : newPin
  const setValue = step === "old" ? setOldPin : setNewPin

  return (
    <div className="relative h-full min-h-full w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/30" />

      <div className="relative flex h-full min-h-full flex-col px-6 pb-6 pt-5">
        {/* Top controls: step toggle + close */}
        <div className="relative flex items-start justify-center">
          <div className="flex items-center gap-14">
            <button
              type="button"
              aria-pressed={step === "old"}
              onClick={() => setStep("old")}
              className="flex flex-col items-center gap-2 px-2 py-1"
            >
              <div
                className={cn(
                  "h-1 w-16 rounded-full",
                  step === "old" ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-bold tracking-[0.22em]",
                  step === "old" ? "text-primary" : "text-muted-foreground/40"
                )}
              >
                Old
              </span>
            </button>

            <button
              type="button"
              aria-pressed={step === "new"}
              onClick={() => setStep("new")}
              className="flex flex-col items-center gap-2 px-2 py-1"
            >
              <div
                className={cn(
                  "h-1 w-16 rounded-full",
                  step === "new" ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-bold tracking-[0.22em]",
                  step === "new" ? "text-primary" : "text-muted-foreground/40"
                )}
              >
                New
              </span>
            </button>
          </div>

          <Button
            type="button"
            variant="invisible"
            size="icon"
            shape="circle"
            aria-label="Close"
            className="absolute right-0 top-0 bg-muted/30 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            onClick={() => {}}
          >
            <SystemIcon icon={XIcon} />
          </Button>
        </div>

        <div className="mt-10 flex min-h-0 flex-1 flex-col items-center">
          <h1 className="text-center text-[42px] leading-[1.05] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 max-w-[22rem] text-center text-base text-muted-foreground">
            {description}
          </p>

          <div className="mt-10">
            <PinEntry
              title={title}
              description={description}
              length={4}
              value={value}
              onChange={setValue}
              onComplete={() => {
                if (step === "old") setStep("new")
              }}
              showHandle={false}
              showTitle={false}
              showDescription={false}
              showCancelKey={false}
              pinDisplayVariant="circles"
              visible={step === "new"}
              className="p-0"
            />
          </div>

          {step === "new" ? (
            <div className="mt-auto w-full max-w-[420px] pt-6">
              <Button
                type="button"
                className="h-14 w-full rounded-[18px] text-base font-semibold"
                disabled={newPin.length !== 4}
                onClick={() => {}}
              >
                Confirm new PIN
              </Button>
            </div>
          ) : (
            <div className="mt-auto" />
          )}
        </div>
      </div>
    </div>
  )
}

