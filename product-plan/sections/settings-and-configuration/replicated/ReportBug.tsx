import * as React from "react"
import { XIcon } from "lucide-react"

import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MediaUpload } from "@/components/ui/media-upload"
import { SectionTitle } from "@/components/ui/section-title"
import { SystemIcon } from "@/components/ui/icon"
import { Textarea } from "@/components/ui/textarea"

export const designOS = {
  presentation: "mobile" as const,
}

export interface ReportBugProps {
  title?: string
  issueDetailsLabel?: string
  issueDetailsPlaceholder?: string
  attachmentsLabel?: string
  chooseFromFilesLabel?: string
  takePhotoLabel?: string
  submitLabel?: string

  defaultIssueDetails?: string

  onChooseFromFiles?: () => void
  onTakePhoto?: () => void
  onSubmit?: (payload: { issueDetails: string }) => void
  onClose?: () => void
}

export default function ReportBug({
  title = "Report bug",
  issueDetailsLabel = "Issue details",
  issueDetailsPlaceholder = "Describe the bug and how to reproduce it...",
  attachmentsLabel = "Attachments",
  chooseFromFilesLabel = "Upload screenshots",
  takePhotoLabel = "Take photo",
  submitLabel = "Report bug",
  defaultIssueDetails = "",
  onChooseFromFiles,
  onTakePhoto,
  onSubmit,
  onClose,
}: ReportBugProps) {
  const [issueDetails, setIssueDetails] = React.useState(defaultIssueDetails)

  return (
    <BottomSlidingModal
      defaultOpen
      onOpenChange={(open) => {
        if (!open) onClose?.()
      }}
    >
      <BottomSlidingModalContent
        header={
          <div className="flex flex-col">
            <SectionTitle
              titleAs="h1"
              trailing={
                <BottomSlidingModalClose asChild>
                  <Button variant="invisible" size="icon" aria-label="Close">
                    <SystemIcon icon={XIcon} />
                  </Button>
                </BottomSlidingModalClose>
              }
            >
              {title}
            </SectionTitle>
          </div>
        }
        footer={
          <Button
            size="lg"
            className="w-full"
            onClick={() => onSubmit?.({ issueDetails: issueDetails.trim() })}
          >
            {submitLabel}
          </Button>
        }
      >
        <div className="px-6 pb-6">
          {/* Block 2: Header controls */}
          {/* Block 3: Issue details input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="report-bug-issue-details">{issueDetailsLabel}</Label>
            <Textarea
              id="report-bug-issue-details"
              placeholder={issueDetailsPlaceholder}
              value={issueDetails}
              onChange={(e) => setIssueDetails(e.target.value)}
            />
          </div>

          {/* Block 4: Attachments */}
          <div className="mt-6 flex flex-col gap-3">
            <Label>{attachmentsLabel}</Label>
            <MediaUpload
              chooseFromFilesLabel={chooseFromFilesLabel}
              takePhotoLabel={takePhotoLabel}
              onChooseFromFiles={onChooseFromFiles}
              onTakePhoto={onTakePhoto}
            />
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

