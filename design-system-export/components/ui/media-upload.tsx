"use client"

import * as React from "react"
import { Camera } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { IconTile } from "../atoms/icon"

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
        "w-full rounded-[12px] border border-dashed border-border p-6 flex flex-col items-center justify-center gap-4 hover:bg-layer-2 transition-all duration-300 group mx-auto text-center",
        className,
      )}
      {...props}
    >
      <IconTile
        icon={Camera}
        size="medium"
        tone="neutral"
        className="group-hover:scale-110 transition-transform duration-300"
      />

      <div className="flex flex-col gap-2 items-center">
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

