/**
 * UserProfilePreview - Replicated design
 * 
 * This component replicates the user-profile.png mockup using the Compost design system.
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ChevronRight, Key, Lock } from 'lucide-react'
import {
    SettingsItem,
    SettingsItemAction,
    SettingsItemContent,
    SettingsItemIcon,
    SettingsItemTitle
} from '@/components/settings/settings-item'

export const designOS = { presentation: 'page' as const }

interface UserProfileProps {
    onBack?: () => void
}

export default function UserProfilePreview({ onBack }: UserProfileProps) {
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
                <h1 className="text-xl font-semibold">User Profile</h1>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Full Name
                    </Label>
                    <Badge
                        variant="secondary"
                        className="bg-layer-info/20 text-on-layer-info hover:bg-layer-info/20 rounded-[6px] text-[10px] px-2 h-5 font-bold tracking-wide border-0"
                    >
                        ADMIN
                    </Badge>
                </div>
                <Input
                    defaultValue="Ghhh"
                    readOnly
                    className="bg-layer-1 border-border rounded-[12px] h-14 font-medium"
                />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                    Email Address
                </Label>
                <Input
                    defaultValue="holodroid23@gmail.com"
                    readOnly
                    className="bg-layer-1 border-border rounded-[12px] h-14 font-medium"
                />
            </div>

            {/* Security */}
            <div className="space-y-3 pt-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                    Security
                </Label>
                <div className="space-y-3">
                    <SettingsItem className="bg-layer-1 border border-border rounded-[18px] h-16 px-4">
                        <SettingsItemIcon>
                            <Lock className="h-5 w-5 text-muted-foreground" />
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="font-semibold text-base">Change PIN</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem className="bg-layer-1 border border-border rounded-[18px] h-16 px-4">
                        <SettingsItemIcon>
                            <Key className="h-5 w-5 text-muted-foreground" />
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="font-semibold text-base">Change Password</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </SettingsItemAction>
                    </SettingsItem>
                </div>
            </div>
        </div>
    )
}
