import * as React from "react"
import { SectionTitle } from "../../components/ui/section-title"
import { RadioButtonGroup, RadioButtonGroupItem } from "../../components/ui/radio-button-group"
import { ChevronLeft, Store, LayoutDashboard } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

export default function DeviceMode() {
    const [mode, setMode] = React.useState("register")

    return (
        <div className="flex h-full min-h-full flex-col bg-background">
            {/* Block 1: Header Section */}
            <div className="px-6 py-4 sticky top-0 bg-background z-10 border-b">
                <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left">
                    <SectionTitle
                        interactive
                        leading={
                            <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
                        }
                    >
                        Device mode
                    </SectionTitle>
                </Button>
            </div>

            {/* Block 2: Mode Selection */}
            <div className="px-6 py-4">
                <RadioButtonGroup value={mode} onValueChange={setMode} className="flex flex-col gap-3">
                    <RadioButtonGroupItem
                        value="register"
                        variant="card"
                        size="card"
                        className="w-full items-start text-left min-h-[100px] flex flex-col"
                    >
                        <div className="flex w-full items-start justify-between mb-4">
                            <Store className="h-6 w-6 opacity-70" />
                            {mode === "register" ? (
                                <Badge variant="success">
                                    Selected
                                </Badge>
                            ) : (
                                <Button variant="ghost" size="sm" className="h-7 text-muted-foreground">
                                    Switch
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground text-lg leading-tight">Register</span>
                            <span className="text-sm text-muted-foreground leading-snug">Process sales and refunds</span>
                        </div>
                    </RadioButtonGroupItem>

                    <RadioButtonGroupItem
                        value="back-office"
                        variant="card"
                        size="card"
                        className="w-full items-start text-left min-h-[100px] flex flex-col"
                    >
                        <div className="flex w-full items-start justify-between mb-4">
                            <LayoutDashboard className="h-6 w-6 opacity-70" />
                            {mode === "back-office" ? (
                                <Badge variant="success">
                                    Selected
                                </Badge>
                            ) : (
                                <Button variant="ghost" size="sm" className="h-7 text-muted-foreground">
                                    Switch
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground text-lg leading-tight">Back office</span>
                            <span className="text-sm text-muted-foreground leading-snug">Manage inventory and settings</span>
                        </div>
                    </RadioButtonGroupItem>
                </RadioButtonGroup>
            </div>
        </div>
    )
}
