"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconTile, SystemIcon, type SystemIconProps } from "@/components/ui/icon"
import { PinEntry } from "@/components/ui/pin-entry"

type IconComponent = SystemIconProps["icon"]
type IconTone = React.ComponentProps<typeof IconTile>["tone"]
type IconSize = React.ComponentProps<typeof IconTile>["size"]

export interface PinEntryScreenProps {
  /**
   * Layout mode.
   * - `screen`: full-screen layout (fills parent height)
   * - `embedded`: fits content (usable inside modals/sheets)
   */
  layout?: "screen" | "embedded"

  icon: IconComponent
  iconTone?: IconTone
  iconSize?: IconSize

  title: string
  description?: string

  length?: number
  visible?: boolean

  value: string
  onChange: (value: string) => void

  /**
   * Close action (top-right).
   */
  onClose?: () => void

  /**
   * Primary action (bottom).
   * If not provided, no primary CTA is rendered.
   */
  primaryLabel?: string
  onPrimary?: (pin: string) => void
  /**
   * Message shown when the user presses the primary action before completing the PIN.
   */
  incompleteMessage?: string
  /**
   * When false, suppresses the incomplete PIN message entirely.
   * (Primary action will still no-op until the PIN is complete.)
   */
  showIncompleteMessage?: boolean

  /**
   * Optional content rendered between header and PIN entry.
   * Use this for step indicators or helper content. Avoid custom typography.
   */
  headerAccessory?: React.ReactNode
  /**
   * Placement of `headerAccessory` relative to the title/description block.
   */
  headerAccessoryPlacement?: "beforeTitle" | "afterTitle"

  /**
   * Size of the primary CTA button.
   */
  primarySize?: React.ComponentProps<typeof Button>["size"]

  className?: string
}

export function PinEntryScreen({
  layout = "screen",
  icon,
  iconTone = "neutral",
  iconSize = "large",
  title,
  description,
  length = 4,
  visible = true,
  value,
  onChange,
  onClose,
  primaryLabel = "Confirm PIN",
  onPrimary,
  incompleteMessage = "Enter your PIN to continue.",
  showIncompleteMessage = true,
  headerAccessory,
  headerAccessoryPlacement = "afterTitle",
  primarySize = "lg",
  className,
}: PinEntryScreenProps) {
  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false)
  const isComplete = value.length === length

  const shellClassName =
    layout === "screen"
      ? "flex h-full min-h-full w-full flex-col bg-background"
      : "flex w-full flex-col bg-background"

  const mainClassName =
    layout === "screen"
      ? "flex min-h-0 flex-1 flex-col items-center justify-center px-6"
      : "flex flex-col items-center justify-center px-6"

  return (
    <div className={cn(shellClassName, className)}>
      <div className="flex items-center justify-end px-4 pt-4">
        {onClose ? (
          <Button type="button" variant="invisible" size="icon" aria-label="Close" onClick={onClose}>
            <SystemIcon icon={XIcon} aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      <div className={mainClassName}>
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <IconTile icon={icon} size={iconSize} variant="tile" tone={iconTone} />

          {headerAccessory && headerAccessoryPlacement === "beforeTitle" ? headerAccessory : null}

          <div className="flex flex-col gap-2">
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>

          {headerAccessory && headerAccessoryPlacement === "afterTitle" ? headerAccessory : null}
        </div>

        <div className="mt-10">
          <PinEntry
            title={title}
            description={description ?? ""}
            length={length}
            showHandle={false}
            showTitle={false}
            showDescription={false}
            showCancelKey={false}
            pinDisplayVariant="circles"
            visible={visible}
            value={value}
            onChange={onChange}
            onCancel={onClose}
            className="p-0"
          />

          {showIncompleteMessage && attemptedSubmit && !isComplete && incompleteMessage ? (
            <p className="mt-3 text-center text-sm text-destructive">{incompleteMessage}</p>
          ) : null}
        </div>
      </div>

      {onPrimary ? (
        <div className="px-6 pb-6">
          <Button
            type="button"
            variant="default"
            size={primarySize}
            className="w-full"
            onClick={() => {
              setAttemptedSubmit(true)
              if (!isComplete) return
              onPrimary(value)
            }}
          >
            {primaryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

