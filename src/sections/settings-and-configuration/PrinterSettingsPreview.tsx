/**
 * PrinterSettingsPreview - Replicated design
 * 
 * This component replicates the printer-settings.png mockup using the Compost design system.
 */

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Printer, Search } from 'lucide-react'

export const designOS = { presentation: 'page' as const }

interface PrinterSettingsProps {
    onBack?: () => void
}

export default function PrinterSettingsPreview({ onBack }: PrinterSettingsProps) {
    return (
        <div className="p-4 space-y-6 max-w-2xl mx-auto bg-background min-h-screen text-foreground font-sans">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="text-muted-foreground w-10 h-10 rounded-[12px] -ml-2"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold">Printer</h1>
            </div>

            {/* Printer Status */}
            <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Printer Status
                </Label>
                <Card className="bg-layer-1 border-border rounded-[18px] p-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-layer-success rounded-[12px] flex items-center justify-center text-on-layer-success">
                            <Printer className="h-6 w-6 fill-current" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">mPOP Printer</h3>
                            <p className="text-xs font-bold text-on-layer-success uppercase tracking-wide mt-0.5">Connected</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="rounded-[12px] h-11 font-semibold border-border bg-transparent text-foreground hover:bg-layer-2"
                        >
                            Test Print
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-[12px] h-11 font-semibold border-destructive text-destructive bg-transparent hover:bg-destructive/10"
                        >
                            Disconnect
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Paper Size */}
            <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Paper Size
                </Label>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="rounded-[18px] h-14 font-bold border-border-info text-border-info bg-layer-info/10 hover:bg-layer-info/20"
                    >
                        58mm
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-[18px] h-14 font-bold border-border bg-layer-1 text-muted-foreground hover:bg-layer-2 hover:text-foreground"
                    >
                        80mm
                    </Button>
                </div>
            </div>

            {/* Hardware Discovery */}
            <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Hardware Discovery
                </Label>
                <Card className="bg-layer-1 border-border rounded-[18px] overflow-hidden">
                    <div className="p-4 border-b border-border border-dashed">
                        <Button
                            variant="outline"
                            className="w-full rounded-[12px] h-11 border-border bg-transparent text-foreground hover:bg-layer-2 justify-center gap-2 font-medium"
                        >
                            <Search className="h-4 w-4" />
                            Search for Printers
                        </Button>
                    </div>
                    <div className="divide-y divide-border border-dashed">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Printer className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-foreground">mPOP Printer</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-[6px] h-8 px-4 font-semibold border-border bg-transparent hover:bg-layer-2"
                            >
                                Pair
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Printer className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-foreground">TM-T88VI Printer</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-[6px] h-8 px-4 font-semibold border-border bg-transparent hover:bg-layer-2"
                            >
                                Pair
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
