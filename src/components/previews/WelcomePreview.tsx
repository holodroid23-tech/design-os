
import {
    SettingsItem,
    SettingsItemIcon,
    SettingsItemContent,
    SettingsItemTitle,
    SettingsItemDescription,
    SettingsItemAction,
} from '../components/ui/settings-item'
import { Button } from '../components/ui/button'
import { Lock, Package, ChevronRight, ExternalLink } from 'lucide-react'

export default function WelcomePreview() {
    return (
        <div className="w-full h-full bg-background relative overflow-hidden flex flex-col">
            {/* Hero Display */}
            <div className="relative">
                <img
                    src="/mockups/WelcomePreview.png"
                    className="w-full h-[300px] object-cover mask-gradient-bottom"
                    alt="Welcome Hero"
                />
            </div>

            {/* Main Content Area */}
            <div className="px-6 space-y-8 -mt-12 relative z-10">
                {/* Welcome Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">
                        Welcome to comPOSt
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Thanks for choosing our POS system. We're excited to help you manage your business more efficiently.
                    </p>
                </div>

                {/* Action Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Your Next Steps</h2>
                    <div className="space-y-3">
                        {/* Item 1: Admin PIN */}
                        <SettingsItem className="bg-layer-2 border-border hover:bg-layer-3 transition-colors cursor-pointer">
                            <SettingsItemIcon>
                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Lock className="h-5 w-5 text-blue-500" />
                                </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                                <SettingsItemTitle>Set Admin PIN</SettingsItemTitle>
                                <SettingsItemDescription>Secure your manager access</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </SettingsItemAction>
                        </SettingsItem>

                        {/* Item 2: Inventory */}
                        <SettingsItem className="bg-layer-2 border-border hover:bg-layer-3 transition-colors cursor-pointer">
                            <SettingsItemIcon>
                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Package className="h-5 w-5 text-blue-500" />
                                </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                                <SettingsItemTitle>Add Inventory</SettingsItemTitle>
                                <SettingsItemDescription>Create your first product</SettingsItemDescription>
                            </SettingsItemContent>
                            <SettingsItemAction>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </SettingsItemAction>
                        </SettingsItem>
                    </div>
                </div>

                {/* Launch Button */}
                <Button className="w-full h-12 text-base font-semibold" variant="default">
                    Launch App
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                {/* Footer Disclaimer */}
                <p className="text-xs text-center text-muted-foreground/50 px-8">
                    You received this email because you signed up for comPOSt POS.
                </p>
            </div>
        </div>
    )
}
