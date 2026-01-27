import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BottomSlidingModal,
  BottomSlidingModalClose,
  BottomSlidingModalContent,
} from "@/components/ui/bottom-sliding-modal"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MediaUpload } from "@/components/ui/media-upload"
import { SectionTitle } from "@/components/ui/section-title"
import { SystemIcon } from "@/components/ui/icon"
import { Textarea } from "@/components/ui/textarea"

export const designOS = {
  presentation: "mobile" as const,
}

export interface SuggestFeatureProps {
  title?: string
  featureTitleLabel?: string
  featureTitlePlaceholder?: string
  featureDescriptionLabel?: string
  featureDescriptionPlaceholder?: string
  uploadScreenshotLabel?: string
  chooseFromFilesLabel?: string
  takePhotoLabel?: string
  submitLabel?: string

  defaultFeatureTitle?: string
  defaultFeatureDescription?: string

  onSubmit?: (payload: { title: string; description: string }) => void
  onChooseFromFiles?: () => void
  onTakePhoto?: () => void
  onClose?: () => void
}

export default function SuggestFeature({
  title = "Suggest feature",
  featureTitleLabel = "Feature title",
  featureTitlePlaceholder = "Short, descriptive name",
  featureDescriptionLabel = "Feature description",
  featureDescriptionPlaceholder = "What should this feature do?",
  uploadScreenshotLabel = "Upload screenshot (optional)",
  chooseFromFilesLabel = "Choose from files",
  takePhotoLabel = "Take photo",
  submitLabel = "Send suggestion",
  defaultFeatureTitle = "",
  defaultFeatureDescription = "",
  onSubmit,
  onChooseFromFiles,
  onTakePhoto,
  onClose,
}: SuggestFeatureProps) {
  const [featureTitle, setFeatureTitle] = React.useState(defaultFeatureTitle)
  const [featureDescription, setFeatureDescription] = React.useState(defaultFeatureDescription)

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
        }
        footer={
          <Button
            size="lg"
            className="w-full"
            onClick={() => onSubmit?.({ title: featureTitle.trim(), description: featureDescription.trim() })}
          >
            {submitLabel}
          </Button>
        }
      >
        <div className="px-4 pb-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="suggest-feature-title">{featureTitleLabel}</Label>
              <Input
                id="suggest-feature-title"
                placeholder={featureTitlePlaceholder}
                value={featureTitle}
                onChange={(e) => setFeatureTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="suggest-feature-description">{featureDescriptionLabel}</Label>
              <Textarea
                id="suggest-feature-description"
                placeholder={featureDescriptionPlaceholder}
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>{uploadScreenshotLabel}</Label>
              <MediaUpload
                chooseFromFilesLabel={chooseFromFilesLabel}
                takePhotoLabel={takePhotoLabel}
                onChooseFromFiles={onChooseFromFiles}
                onTakePhoto={onTakePhoto}
              />
            </div>
          </div>
        </div>
      </BottomSlidingModalContent>
    </BottomSlidingModal>
  )
}

