"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { BottomSheetScaffold, type BottomSheetScaffoldProps } from "./bottom-sheet"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./dialog"
import { cn } from "../../lib/utils"

/**
 * Canonical bottom sliding modal (Design System Export)
 *
 * IMPORTANT:
 * - Keep centered modals using `DialogContent` (this component is only for bottom sliding modals).
 * - Do not use `SheetContent side="bottom"`; use this component instead.
 */

function BottomSlidingModal(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <Dialog {...props} />
}

function BottomSlidingModalTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogTrigger data-slot="bottom-sliding-modal-trigger" {...props} />
}

function BottomSlidingModalClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogClose data-slot="bottom-sliding-modal-close" {...props} />
}

type BottomSlidingModalContentProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  "children"
> & {
  header?: React.ReactNode
  footer?: React.ReactNode
  scaffoldProps?: Omit<BottomSheetScaffoldProps, "header" | "footer" | "children">
  children?: React.ReactNode
}

function BottomSlidingModalContent({
  className,
  header,
  footer,
  scaffoldProps,
  children,
  ...props
}: BottomSlidingModalContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="bottom-sliding-modal-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-x-0 bottom-0 z-50",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          // Cap height relative to the containing block (viewport or preview frame),
          // so the header/close button never scrolls off-screen.
          "max-h-[85%] overflow-hidden flex flex-col min-h-0 duration-300 outline-none",
          className
        )}
        {...props}
      >
        <BottomSheetScaffold header={header} footer={footer} {...scaffoldProps}>
          {children}
        </BottomSheetScaffold>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
  BottomSlidingModalTrigger,
}

