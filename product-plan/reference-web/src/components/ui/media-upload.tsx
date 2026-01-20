"use client"

import * as React from "react"
import { Camera } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface MediaUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  chooseFromFilesLabel?: string
  takePhotoLabel?: string
  onChooseFromFiles?: () => void
  onTakePhoto?: () => void
}

export function MediaUpload({
  className,
  chooseFromFilesLabel = "Choose from files",
  takePhotoLabel = "Take photo",
  onChooseFromFiles,
  onTakePhoto,
  ...props
}: MediaUploadProps) {
  return (
    <div
      className={cn(
        "aspect-square w-full max-w-[320px] rounded-[12px] border border-dashed border-border p-8 flex flex-col items-center justify-center gap-8 bg-layer-2/50 hover:bg-layer-2 transition-all duration-300 group mx-auto text-center",
        className
      )}
      {...props}
    >
      <div className="h-20 w-20 rounded-[12px] bg-layer-info text-on-layer-info flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Camera className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <Button variant="ghost" onClick={onChooseFromFiles}>
          {chooseFromFilesLabel}
        </Button>
        <Button variant="ghost" onClick={onTakePhoto}>
          {takePhotoLabel}
        </Button>
      </div>
    </div>
  )
}

