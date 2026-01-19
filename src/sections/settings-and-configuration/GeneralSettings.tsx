import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { ChevronLeft } from "lucide-react"

export function GeneralSettings() {
    return (
        <div className="flex flex-col h-full">
            {/* Block 1: Header */}
            <div className="flex items-center gap-3 px-6 py-4">
                <Button variant="ghost" size="icon">
                    <ChevronLeft />
                </Button>
                <SectionTitle size="page">General</SectionTitle>
            </div>

            {/* Blocks 2-7 will be implemented incrementally */}
        </div>
    )
}
