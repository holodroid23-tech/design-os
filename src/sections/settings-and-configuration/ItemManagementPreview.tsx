/**
 * ItemManagementPreview - Replicated design
 * 
 * This component replicates the item-management.png mockup using the Compost design system.
 */

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Folder } from 'lucide-react'
import { IconTile } from '@/components/ui/icon'
import {
    SettingsItem,
    SettingsItemIcon,
    SettingsItemContent,
    SettingsItemTitle,
    SettingsItemDescription,
    SettingsItemAction
} from '@/components/settings/settings-item'

export const designOS = { presentation: 'page' as const }

interface ItemManagementProps {
    onBack?: () => void
}

export default function ItemManagementPreview({ onBack }: ItemManagementProps) {
    const folders = [
        { id: 1, name: 'Monthly Utilities', count: '12 items', enabled: true },
        { id: 2, name: 'Suppliers', count: '8 items', enabled: true },
    ]

    const items = [
        { id: 1, name: 'Electricity Bill', price: '$120.00', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop&q=80' },
        { id: 2, name: 'Water Supply', price: '$45.00', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=100&h=100&fit=crop&q=80' },
        { id: 3, name: 'Store Rent', price: '$2,400.00', image: 'https://images.unsplash.com/photo-1582035306269-65008d5d9c24?w=100&h=100&fit=crop&q=80' },
        { id: 4, name: 'Internet Services', price: '$89.00', image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=100&h=100&fit=crop&q=80' },
        { id: 5, name: 'Equipment Maintenance', price: '$150.00', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=100&h=100&fit=crop&q=80' },
    ]

    return (
        <div className="p-4 space-y-4 bg-background min-h-screen text-foreground font-sans relative pb-24 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="text-muted-foreground w-10 h-10 -ml-2"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold">Item management</h1>
            </div>

            {/* List */}
            <div className="space-y-2">
                {/* Folders */}
                {folders.map((folder) => (
                    <SettingsItem key={folder.id} className="bg-layer-1 border border-border rounded-[12px] px-4 py-3">
                        <SettingsItemIcon>
                            <div className="h-10 w-10 bg-layer-info/10 rounded-[12px] flex items-center justify-center text-on-layer-info">
                                <Folder className="h-5 w-5 fill-current" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-sm font-semibold text-foreground">
                                {folder.name}
                            </SettingsItemTitle>
                            <SettingsItemDescription className="text-xs text-muted-foreground">
                                {folder.count}
                            </SettingsItemDescription>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <Switch defaultChecked={folder.enabled} />
                        </SettingsItemAction>
                    </SettingsItem>
                ))}

                {/* Items */}
                {items.map((item) => (
                    <SettingsItem key={item.id} className="bg-layer-1 border border-border rounded-[12px] px-4 py-3">
                        <SettingsItemIcon>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-10 w-10 rounded-full object-cover border border-border"
                            />
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-sm font-semibold text-foreground">
                                {item.name}
                            </SettingsItemTitle>
                            <SettingsItemDescription className="text-xs text-muted-foreground">
                                {item.price}
                            </SettingsItemDescription>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <Switch defaultChecked />
                        </SettingsItemAction>
                    </SettingsItem>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent pointer-events-none">
                <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3 pointer-events-auto">
                    <Button
                        variant="outline"
                        className="rounded-[12px] h-12 border-border bg-layer-1 text-foreground hover:bg-layer-2 font-medium"
                    >
                        Add folder
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-[12px] h-12 border-border bg-layer-1 text-foreground hover:bg-layer-2 font-medium"
                    >
                        Add item
                    </Button>
                </div>
            </div>
        </div>
    )
}
