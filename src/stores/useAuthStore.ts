import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, UserRole, AuthSession } from '@/types/auth'

interface AuthState extends AuthSession {
    // Current Staff list (mocked for now)
    staff: User[]

    // Actions
    unlock: (pin: string) => { success: boolean, role?: UserRole }
    verifyAdminAction: (pin: string) => boolean
    lock: () => void
    logout: () => void

    // Dev/Debug Actions
    devSwitchRole: (role: UserRole) => void
    devSkipPin: (skip: boolean) => void
    isPinSkipped: boolean
}

const MOCK_STAFF: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@compostos.com', role: 'Admin', pinHash: '1111' },
    { id: '2', name: 'Manager User', email: 'manager@compostos.com', role: 'Manager', pinHash: '2222' },
    { id: '3', name: 'Cashier User', email: 'cashier@compostos.com', role: 'Cashier', pinHash: '3333' },
]

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            currentUser: null,
            isVerified: false,
            isAdminPinVerified: false,
            verifiedAt: null,
            staff: MOCK_STAFF,
            isPinSkipped: false,

            unlock: (pin) => {
                if (get().isPinSkipped) {
                    const defaultUser = get().staff[0] // Default to Admin
                    set({
                        currentUser: defaultUser,
                        isVerified: true,
                        verifiedAt: Date.now()
                    })
                    return { success: true, role: defaultUser.role }
                }

                const user = get().staff.find(u => u.pinHash === pin)
                if (user) {
                    set({
                        currentUser: user,
                        isVerified: true,
                        verifiedAt: Date.now()
                    })
                    return { success: true, role: user.role }
                }
                return { success: false }
            },

            verifyAdminAction: (pin) => {
                if (get().isPinSkipped) {
                    set({ isAdminPinVerified: true })
                    return true
                }

                const admin = get().staff.find(u => u.role === 'Admin' && u.pinHash === pin)
                const isSuccess = !!admin
                set({ isAdminPinVerified: isSuccess })
                return isSuccess
            },

            lock: () => set({
                isVerified: false,
                isAdminPinVerified: false,
                verifiedAt: null
            }),

            logout: () => set({
                currentUser: null,
                isVerified: false,
                isAdminPinVerified: false,
                verifiedAt: null
            }),

            devSwitchRole: (role) => {
                const user = get().staff.find(u => u.role === role) || get().staff[0]
                set({
                    currentUser: user,
                    isVerified: true,
                    verifiedAt: Date.now()
                })
            },

            devSkipPin: (skip) => set({ isPinSkipped: skip })
        }),
        {
            name: 'compost-auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
