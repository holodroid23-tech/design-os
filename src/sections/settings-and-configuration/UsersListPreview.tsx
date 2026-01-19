/**
 * UsersListPreview - Replicated design
 * 
 * This component replicates the users-list.png mockup using the Compost design system.
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ChevronRight, Plus, ShieldCheck, User, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'

export const designOS = { presentation: 'page' as const }

interface UsersListProps {
    onBack?: () => void
}

export default function UsersListPreview({ onBack }: UsersListProps) {
    const users = [
        {
            id: 1,
            name: 'Sarah Jenkins',
            role: 'Administrator',
            roleColor: 'recent', // Purple
            icon: ShieldCheck,
            initials: 'SJ'
        },
        {
            id: 2,
            name: 'Mike Ross',
            role: 'Manager',
            roleColor: 'info', // Blue
            icon: Users,
            initials: 'MR'
        },
        {
            id: 3,
            name: 'Anna Lee',
            role: 'Cashier',
            roleColor: 'success', // Green
            icon: User,
            initials: 'AL'
        },
        {
            id: 4,
            name: 'John Doe',
            role: 'Cashier',
            roleColor: 'secondary', // Gray
            icon: User,
            initials: 'JD'
        },
        {
            id: 5,
            name: 'David Smith',
            role: 'Cashier',
            roleColor: 'secondary',
            icon: User,
            initials: 'DS',
            pending: true
        },
    ]

    // Helper to map semantic role colors to utility classes
    const getRoleColors = (color: string) => {
        switch (color) {
            case 'recent': return 'text-on-layer-recent'
            case 'info': return 'text-on-layer-info'
            case 'success': return 'text-on-layer-success'
            default: return 'text-muted-foreground'
        }
    }

    const getAvatarBg = (color: string) => {
        switch (color) {
            case 'recent': return 'bg-layer-recent text-on-layer-recent'
            case 'info': return 'bg-layer-info text-on-layer-info'
            case 'success': return 'bg-layer-success text-on-layer-success'
            default: return 'bg-layer-2 text-muted-foreground'
        }
    }

    return (
        <div className="p-4 space-y-4 bg-background min-h-screen text-foreground font-sans max-w-2xl mx-auto">
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
                <h1 className="text-xl font-semibold">User Management</h1>
            </div>

            {/* Add Button */}
            {/* 
        Using primary (green) to adhere to design system, though mock shows blue. 
        If blue is strictly required, we'd need a 'brand-blue' button variant 
        or use 'bg-brand-royal-blue' if it was a utility class.
        Sticking to 'bg-primary' for system consistency.
      */}
            <Button
                className="w-full h-12 rounded-[12px] bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-sm"
            >
                <Plus className="h-5 w-5 mr-2" />
                Add New User
            </Button>

            {/* User List */}
            <div className="space-y-2 pt-2">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="bg-layer-1 border border-border rounded-[18px] p-3 flex items-center justify-between hover:bg-layer-2 transition-colors cursor-pointer shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarBg(user.roleColor)}`}>
                                {user.initials}
                            </div>
                            <div>
                                <div className="font-semibold text-foreground text-sm">{user.name}</div>
                                <div className={`text-xs font-semibold flex items-center gap-1.5 mt-0.5 ${getRoleColors(user.roleColor)}`}>
                                    <user.icon className="h-3.5 w-3.5" />
                                    {user.role}
                                    {user.pending && (
                                        <Badge variant="outline" className="border-onLayer-warning text-onLayer-warning h-5 px-1.5 text-[10px] ml-1">
                                            PENDING
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {user.pending ? (
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-[6px] h-8 text-xs font-medium border-border"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Resend logic
                                }}
                            >
                                Resend
                            </Button>
                        ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}
