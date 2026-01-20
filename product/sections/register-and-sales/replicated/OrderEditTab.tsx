import * as React from "react"
import { ChevronRight, RotateCcw, Trash2, XIcon } from "lucide-react"

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog"
import { IconTile, SystemIcon } from "@/components/atoms/icon"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionTitle } from "@/components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export interface OrderEditTabProps {
  title?: string
  orderNameLabel?: string
  orderName?: string
  defaultOrderName?: string
  onOrderNameChange?: (nextOrderName: string) => void

  cancelLabel?: string
  saveLabel?: string
  onCancel?: () => void
  onSave?: (payload: { orderName: string }) => void

  clearOrderLabel?: string
  deleteOrderTabLabel?: string
  onClearOrder?: () => void
  onDeleteOrderTab?: () => void

  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

export default function OrderEditTab({
  title = "Edit order",
  orderNameLabel = "Order name",
  orderName: controlledOrderName,
  defaultOrderName = "Order 1",
  onOrderNameChange,
  cancelLabel = "Cancel",
  saveLabel = "Save",
  onCancel,
  onSave,
  clearOrderLabel = "Clear order",
  deleteOrderTabLabel = "Delete order tab",
  onClearOrder,
  onDeleteOrderTab,
  open,
  defaultOpen = true,
  onOpenChange,
  onClose,
}: OrderEditTabProps) {
  const [uncontrolledOrderName, setUncontrolledOrderName] = React.useState(defaultOrderName)
  const isControlled = controlledOrderName !== undefined
  const resolvedOrderName = isControlled ? controlledOrderName : uncontrolledOrderName

  return (
    <Dialog
      {...(open === undefined ? { defaultOpen } : { open })}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        if (!nextOpen) onClose?.()
      }}
    >
      <DialogContent showCloseButton={false}>
        <SectionTitle
          titleAs="h2"
          trailing={
            <DialogClose asChild>
              <Button variant="invisible" size="icon" aria-label="Close">
                <SystemIcon icon={XIcon} />
              </Button>
            </DialogClose>
          }
        >
          {title}
        </SectionTitle>

        <div>
          {/* Block 2: Edit form */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="order-edit-tab-order-name">{orderNameLabel}</Label>
            <Input
              id="order-edit-tab-order-name"
              type="text"
              value={resolvedOrderName}
              onChange={(e) => {
                const next = e.target.value
                onOrderNameChange?.(next)
                if (!isControlled) setUncontrolledOrderName(next)
              }}
            />
          </div>

          {/* Block 4: Order actions list */}
          <div className="mt-5">
            <SettingsGroup>
              <SettingsItem onPress={onClearOrder}>
                <SettingsItemIcon>
                  <IconTile icon={RotateCcw} size="small" variant="tile" tone="neutral" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle>{clearOrderLabel}</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <ChevronRight aria-hidden className="size-5" />
                </SettingsItemAction>
              </SettingsItem>

              <SettingsItem onPress={onDeleteOrderTab}>
                <SettingsItemIcon>
                  <IconTile icon={Trash2} size="small" variant="tile" tone="danger" />
                </SettingsItemIcon>
                <SettingsItemContent>
                  <SettingsItemTitle variant="destructive">{deleteOrderTabLabel}</SettingsItemTitle>
                </SettingsItemContent>
                <SettingsItemAction>
                  <ChevronRight aria-hidden className="size-5" />
                </SettingsItemAction>
              </SettingsItem>
            </SettingsGroup>
          </div>

          {/* Block 3: Form actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  onCancel?.()
                }}
              >
                {cancelLabel}
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  onSave?.({ orderName: resolvedOrderName.trim() })
                }}
              >
                {saveLabel}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

