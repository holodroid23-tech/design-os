import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { ChevronLeft } from "lucide-react"

export default function ReceiptPreview() {
  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header / app bar */}
      <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
        <SectionTitle
          size="page"
          leading={
            <Button variant="invisible" size="icon" aria-label="Back">
              <ChevronLeft className="size-4" />
            </Button>
          }
        >
          Receipt settings
        </SectionTitle>
      </div>

      {/* Blocks 2–5 pending */}
      <div className="flex-1 px-6 py-4" />
    </div>
  )
}

