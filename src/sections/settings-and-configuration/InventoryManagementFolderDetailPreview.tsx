/**
 * InventoryManagementFolderDetailPreview - Replicated design
 * 
 * This component replicates the inventory-management-folder-detail.png mockup using the Compost design system.
 */

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
    SettingsItem,
    SettingsItemAction,
    SettingsItemContent,
    SettingsItemIcon,
    SettingsItemTitle,
} from '@/components/settings/settings-item'

export const designOS = { presentation: 'page' as const }

interface InventoryManagementFolderDetailProps {
    onBack?: () => void
}

// Mock Data
const utilities = [
    { id: 1, name: 'Electricity Bill', price: '$120.00', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=256&auto=format&fit=crop' },
    { id: 2, name: 'Water Supply', price: '$45.00', image: 'https://images.unsplash.com/photo-1544252890-a1e018d9f497?q=80&w=256&auto=format&fit=crop' },
    { id: 3, name: 'Store Rent', price: '$2,400.00', image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=256&auto=format&fit=crop' },
    { id: 4, name: 'Internet Services', price: '$85.00', image: 'https://images.unsplash.com/photo-1517705600646-a0fe9ddc7b41?q=80&w=256&auto=format&fit=crop' },
    { id: 5, name: 'Equipment Maintenance', price: '$150.00', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=256&auto=format&fit=crop' },
]

export default function InventoryManagementFolderDetailPreview({ onBack }: InventoryManagementFolderDetailProps) {
    return (
        <div className="flex h-full w-full flex-col bg-background">
            {/* Header */}
            <div className="flex items-center gap-4 border-b p-4">
                <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-semibold">Monthly Utilities</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-md space-y-3">
                    {utilities.map((item) => (
                        <SettingsItem key={item.id} className="border border-border rounded-xl p-3 h-auto min-h-0 items-center bg-card">
                            <SettingsItemIcon>
                                <div className="overflow-hidden rounded-full h-10 w-10">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                            </SettingsItemIcon>
                            <SettingsItemContent>
                                <SettingsItemTitle className="font-semibold">{item.name}</SettingsItemTitle>
                                <p className="text-sm text-muted-foreground font-mono">{item.price}</p>
                            </SettingsItemContent>
                            <SettingsItemAction>
                                <Switch defaultChecked />
                            </SettingsItemAction>
                        </SettingsItem>
                    ))}
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t bg-background">
                <div className="mx-auto max-w-md">
                    <Button variant="outline" className="w-full h-12 text-base font-semibold bg-transparent border-border hover:bg-secondary/20">
                        Add item
                    </Button>
                </div>
            </div>
        </div>
    )
}
