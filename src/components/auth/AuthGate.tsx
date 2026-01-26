import * as React from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import SettingsSecurityAccesWithPinToEnterSection from '@product/sections/settings-and-configuration/replicated/SettingsSecurityAccesWithPinToEnterSection'

interface AuthGateProps {
    children: React.ReactNode
    section: 'activity' | 'settings' | 'expenses'
}

export function AuthGate({ children, section }: AuthGateProps) {
    const { currentUser, isVerified, unlock } = useAuthStore()
    const [showPinEntry, setShowPinEntry] = React.useState(false)

    // Auto-lock logic could be added here based on verifiedAt

    React.useEffect(() => {
        if (!isVerified && (section === 'activity' || section === 'settings')) {
            setShowPinEntry(true)
        } else {
            setShowPinEntry(false)
        }
    }, [isVerified, section])

    if (showPinEntry) {
        return (
            <SettingsSecurityAccesWithPinToEnterSection
                onClose={() => setShowPinEntry(false)}
                onConfirmPin={(pin) => {
                    const result = unlock(pin)
                    if (result.success) {
                        // Success
                        if (section === 'settings' && result.role === 'Cashier') {
                            alert('Insufficient Permission: Admin authorization required for Settings.')
                            // Keep pin entry or go back
                            return
                        }
                        setShowPinEntry(false)
                    } else {
                        alert('Invalid PIN')
                    }
                }}
            />
        )
    }

    // Final check for section permissions
    if (section === 'settings' && currentUser?.role === 'Cashier') {
        return (
            <div className="flex h-full items-center justify-center p-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">Cashier role does not have permission to access Settings.</p>
                </div>
            </div>
        )
    }

    if (section === 'expenses' && currentUser?.role === 'Cashier') {
        return (
            <div className="flex h-full items-center justify-center p-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">Cashier role does not have permission to access Expenses.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
