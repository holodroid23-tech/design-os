import { BottomSlidingModal, BottomSlidingModalContent } from "@/components/ui/bottom-sliding-modal"
import { PinEntry } from "@/components/ui/pin-entry"

export const designOS = {
  presentation: "mobile" as const,
}

export default function SettingsSecurityAccesWithPinToEnterSection() {
  return (
    <div className="relative h-full min-h-full bg-background">
      {/* Background is intentionally abstracted; the modal/overlay is the focus of this mock. */}
      <div className="absolute inset-0 bg-background">
        <div className="h-full w-full bg-muted/30 blur-sm scale-105" />
      </div>

      <BottomSlidingModal open onOpenChange={() => {}}>
        <BottomSlidingModalContent
          scaffoldProps={{
            bodyClassName: "flex justify-center py-2",
          }}
        >
          <PinEntry
            title="Authorization Required"
            description="Manager or admin authorization is required to access settings. Please enter your 4-digit PIN."
            length={4}
            onCancel={() => {}}
          />
        </BottomSlidingModalContent>
      </BottomSlidingModal>
    </div>
  )
}

