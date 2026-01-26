import * as React from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FlaskConical, Lock, Shield, User, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function DevTools() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { currentUser, devSwitchRole, devSkipPin, isPinSkipped, lock, isVerified } = useAuthStore()

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 z-[9999] size-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
                <FlaskConical className="size-6 text-primary-foreground" />
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FlaskConical className="size-5" />
                        Developer Tools
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="size-5" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Role Switcher */}
                    <div className="space-y-3">
                        <div className="text-sm font-medium flex items-center gap-2">
                            <User className="size-4" />
                            Role Switcher
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(['Admin', 'Manager', 'Cashier'] as const).map(role => (
                                <Button
                                    key={role}
                                    variant={currentUser?.role === role ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => devSwitchRole(role)}
                                >
                                    {role}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Security Controls */}
                    <div className="space-y-3">
                        <div className="text-sm font-medium flex items-center gap-2">
                            <Shield className="size-4" />
                            Security Controls
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={isPinSkipped ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => devSkipPin(!isPinSkipped)}
                            >
                                {isPinSkipped ? 'PIN Skipping: ON' : 'PIN Skipping: OFF'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={lock}
                                disabled={!isVerified}
                            >
                                <Lock className="size-4 mr-2" />
                                Lock Session
                            </Button>
                        </div>
                    </div>

                    {/* Current Context */}
                    <div className="pt-4 border-t space-y-2">
                        <div className="text-xs text-muted-foreground uppercase tracking-widest">Current Context</div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">User: {currentUser?.name || 'None'}</span>
                            {currentUser && <Badge>{currentUser.role}</Badge>}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Session Status:</span>
                            <span className={isVerified ? 'text-green-500' : 'text-yellow-500'}>
                                {isVerified ? 'Verified' : 'Locked'}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
