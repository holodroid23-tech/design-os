/**
 * NewExpenseModalPreview - Replicated design
 * 
 * This component replicates the new-expense-modal.png mockup using the Compost design system.
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Camera, ChevronDown, Image as ImageIcon, Star, X } from 'lucide-react'

export const designOS = { presentation: 'modal' as const }

interface NewExpenseModalProps {
    onClose?: () => void
}

export default function NewExpenseModalPreview({ onClose }: NewExpenseModalProps) {
    return (
        <div className="bg-background min-h-screen text-foreground font-sans pt-4 pb-8 px-4 space-y-5 rounded-t-[18px]">
            {/* Handle */}
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto opacity-50" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">New Expense</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-muted-foreground -mr-2"
                >
                    <X className="h-6 w-6" />
                </Button>
            </div>

            {/* Name */}
            <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Name
                </Label>
                <div className="flex gap-3">
                    <Input
                        placeholder="e.g. Monthly Rent"
                        className="flex-1 bg-layer-1 border-border rounded-[12px] h-12 text-base"
                    />
                    <Button
                        variant="secondary"
                        className="h-12 w-12 rounded-[12px] bg-layer-1 border border-border text-muted-foreground hover:text-foreground p-0"
                    >
                        <Star className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Category
                </Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between bg-layer-1 border-border rounded-[12px] h-12 px-3 font-normal text-foreground hover:bg-layer-2 hover:text-foreground text-base"
                        >
                            Operations
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
                        <DropdownMenuItem>Operations</DropdownMenuItem>
                        <DropdownMenuItem>Inventory</DropdownMenuItem>
                        <DropdownMenuItem>Staff</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Tax */}
            <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Tax
                </Label>
                <div className="grid grid-cols-3 gap-3">
                    <Button
                        variant="outline"
                        className="rounded-[12px] h-11 bg-layer-1 border-border text-foreground/80 hover:bg-layer-2"
                    >
                        0%
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-[12px] h-11 bg-layer-1 border-border text-foreground/80 hover:bg-layer-2"
                    >
                        10%
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-[12px] h-11 bg-primary/10 border-primary text-primary font-bold hover:bg-primary/20"
                    >
                        21%
                    </Button>
                </div>
            </div>

            {/* Appearance */}
            <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Appearance
                </Label>
                <Tabs defaultValue="image" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 bg-layer-1 h-12 rounded-[12px] p-1">
                        <TabsTrigger
                            value="color"
                            className="rounded-[6px] h-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        >
                            Color
                        </TabsTrigger>
                        <TabsTrigger
                            value="image"
                            className="rounded-[6px] h-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        >
                            Image
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="image" className="mt-4">
                        <div className="border-2 border-dashed border-border rounded-[18px] p-8 flex flex-col items-center gap-6 bg-layer-1/30">
                            <div className="h-14 w-14 bg-layer-2 rounded-full flex items-center justify-center text-muted-foreground">
                                <Camera className="h-6 w-6" />
                            </div>
                            <div className="space-y-3 w-full max-w-xs">
                                <Button
                                    variant="secondary"
                                    className="w-full rounded-[12px] h-11 bg-layer-2 border-transparent hover:bg-layer-3 font-medium flex items-center justify-center gap-2"
                                >
                                    <ImageIcon className="h-4 w-4" />
                                    Choose from library
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full rounded-[12px] h-11 bg-layer-2 border-transparent hover:bg-layer-3 font-medium flex items-center justify-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Take photo
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Footer */}
            <div className="pt-2">
                <Button
                    className="w-full h-14 rounded-[12px] bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-sm"
                >
                    Save Expense
                </Button>
            </div>
        </div>
    )
}
