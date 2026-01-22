"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { BottomSheetScaffold, type BottomSheetScaffoldProps } from "@/components/ui/bottom-sheet"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

/**
 * Canonical bottom sliding modal (Design System)
 *
 * - Uses Radix Dialog for accessibility + focus management
 * - Slides up from the bottom (mobile-first)
 * - Uses BottomSheetScaffold for the standard header/body/footer layout behavior
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
  /**
   * Optional BottomSheetScaffold header slot (usually a SectionTitle).
   */
  header?: React.ReactNode
  /**
   * Optional BottomSheetScaffold footer slot (usually primary action).
   */
  footer?: React.ReactNode
  /**
   * Props forwarded to BottomSheetScaffold (layout only).
   */
  scaffoldProps?: Omit<BottomSheetScaffoldProps, "header" | "footer" | "children">
  /**
   * Whether to occupy the full height (e.g. for search-heavy summary views).
   */
  fullHeight?: boolean
  /**
   * Bottom sheet body content.
   */
  children?: React.ReactNode
}

function BottomSlidingModalContent({
  className,
  header,
  footer,
  scaffoldProps,
  fullHeight,
  children,
  ...props
}: BottomSlidingModalContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="bottom-sliding-modal-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          "overflow-hidden flex flex-col min-h-0 duration-300 outline-none",
          // Base defaults can now be overridden by incoming `className`
          fullHeight
            ? "inset-x-0 bottom-0 top-10 rounded-t-[24px] shadow-2xl"
            : "inset-x-0 bottom-0 max-h-[85%] rounded-t-[18px] shadow-2xl",
          className
        )}
        {...props}
      >
        <BottomSheetScaffold
          header={header}
          footer={footer}
          className={cn(
            "dark flex-1",
            fullHeight ? "rounded-none border-none" : "rounded-t-[18px]",
            scaffoldProps?.className // Allow scaffoldProps to also influence internal structure if needed
          )}
          {...scaffoldProps}
        >
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

