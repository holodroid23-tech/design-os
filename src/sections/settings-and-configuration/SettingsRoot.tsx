/**
 * SettingsRoot - Replicated design
 *
 * This component replicates the `settings-root.png` mockup using the Compost design system.
 */

import {
  Banknote,
  Bug,
  ChevronRight,
  CreditCard,
  Lightbulb,
  LogOut,
  Package,
  Printer,
  Receipt,
  Settings,
  Smartphone,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'
import type { UserRole } from './types'

export const designOS = { presentation: 'mobile' as const }

export interface SettingsRootProps {
  currentUser?: { name: string; email: string; role: UserRole; initials: string; isOnline?: boolean }
  version?: string
  onNavigate?: (destination:
    | 'profile'
    | 'inventory'
    | 'expenses'
    | 'general'
    | 'users'
    | 'payment'
    | 'printer'
    | 'receipt'
    | 'device-mode'
    | 'suggest-feature'
    | 'report-bug'
    | 'log-out') => void
}

function roleLabel(role: UserRole) {
  if (role === 'ADMIN') return 'Admin'
  if (role === 'MANAGER') return 'Manager'
  return 'Cashier'
}

const sampleCurrentUser: NonNullable<SettingsRootProps['currentUser']> = {
  name: 'Ghhh',
  email: 'holodroid23@gmail.com',
  role: 'ADMIN',
  initials: 'G',
  isOnline: true,
}

export default function SettingsRoot({
  currentUser = sampleCurrentUser,
  version = '2.4.1 (BUILD 89)',
  onNavigate,
}: SettingsRootProps) {
  const groups: Array<
    Array<{
      id: Parameters<NonNullable<SettingsRootProps['onNavigate']>>[0]
      label: string
      icon: ComponentType<{ className?: string }>
      variant?: 'default' | 'destructive'
    }>
  > = [
    [
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'expenses', label: 'Expenses', icon: Banknote },
    ],
    [
      { id: 'general', label: 'General', icon: Settings },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'payment', label: 'Payment', icon: CreditCard },
      { id: 'printer', label: 'Printer', icon: Printer },
      { id: 'receipt', label: 'Receipt', icon: Receipt },
      { id: 'device-mode', label: 'Device mode', icon: Smartphone },
    ],
    [
      { id: 'suggest-feature', label: 'Suggest feature', icon: Lightbulb },
      { id: 'report-bug', label: 'Report bug', icon: Bug },
    ],
    [{ id: 'log-out', label: 'Log out', icon: LogOut, variant: 'destructive' }],
  ]

  return (
    <div className="min-h-full bg-layer-level-0 text-onLayer-primary">
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-[28px] leading-[36px] font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="px-4 pb-10 space-y-6">
        {/* Profile */}
        <div className="overflow-hidden rounded-[18px] border border-border-secondary bg-layer-level-1">
          <button
            type="button"
            onClick={() => onNavigate?.('profile')}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-layer-hover active:bg-layer-active"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-[9999px] bg-layer-level-2 border border-border-secondary flex items-center justify-center text-regular-semibold">
                  {currentUser.initials}
                </div>
                {currentUser.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-[9999px] bg-onLayer-success border-2 border-layer-level-1" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-regular-semibold truncate">{currentUser.name}</span>
                  <span className="shrink-0 rounded-[9999px] bg-border-info px-2 py-0.5 text-[10px] font-semibold text-onLayer-inverse">
                    {roleLabel(currentUser.role)}
                  </span>
                </div>
                <div className="text-small text-onLayer-secondary truncate">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-onLayer-tertiary shrink-0" />
          </button>
        </div>

        {groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="overflow-hidden rounded-[18px] border border-border-secondary bg-layer-level-1"
          >
            {group.map((item, itemIndex) => {
              const Icon = item.icon
              const isLast = itemIndex === group.length - 1
              const isDestructive = item.variant === 'destructive'

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate?.(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-layer-hover active:bg-layer-active',
                    !isLast && 'border-b border-border-secondary',
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={cn(
                        'h-11 w-11 rounded-[12px] bg-layer-level-2 border border-border-secondary flex items-center justify-center shrink-0',
                        isDestructive && 'bg-layer-danger border-border-danger',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isDestructive ? 'text-onLayer-danger' : 'text-onLayer-primary',
                        )}
                      />
                    </div>

                    <span className={cn('text-regular-semibold truncate', isDestructive && 'text-onLayer-danger')}>
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isDestructive ? 'text-onLayer-danger' : 'text-onLayer-tertiary',
                    )}
                  />
                </button>
              )
            })}
          </div>
        ))}

        <div className="pt-2 pb-4">
          <div className="text-center text-support-small tracking-widest text-onLayer-tertiary">
            Version {version}
          </div>
        </div>
      </div>
    </div>
  )
}

