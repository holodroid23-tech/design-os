import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaUpload } from '@/components/ui/media-upload'
import { StrokeStyleSelector } from '@/components/ui/stroke-style-selector'
import { useState } from 'react'

export function MediaUploadExamplesCard() {
  return (
    <Card id="media-upload" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Media upload</CardTitle>
        <CardDescription>Upload component with multiple actions</CardDescription>
      </CardHeader>
      <CardContent>
        <MediaUpload />
      </CardContent>
    </Card>
  )
}

export function StrokeStyleSelectorExamplesCard() {
  const [value, setValue] = useState<'none' | 'common' | 'dashed'>('common')

  return (
    <Card id="stroke-style-selector" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Stroke style selector</CardTitle>
        <CardDescription>Card-style single selection control</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-[420px] mx-auto space-y-3">
          <StrokeStyleSelector value={value} onValueChange={setValue} />
          <div className="text-sm text-muted-foreground">Selected: {value}</div>
        </div>
      </CardContent>
    </Card>
  )
}
