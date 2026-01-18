import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'

export function MediaUploadExamplesCard() {
  return (
    <Card id="media-upload" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Media upload</CardTitle>
        <CardDescription>Upload component with multiple actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full max-w-[320px] rounded-[32px] border-2 border-dashed border-border p-8 flex flex-col items-center justify-center gap-8 bg-layer-2/50 hover:bg-layer-2 transition-all duration-300 group mx-auto text-center">
          <div className="h-20 w-20 rounded-[24px] bg-layer-info text-on-layer-info flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Camera className="h-10 w-10" />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <Button variant="ghost">Choose from files</Button>
            <Button variant="ghost">Take photo</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
