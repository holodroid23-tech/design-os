export type UserRole = 'Admin' | 'Manager' | 'Cashier'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    pinHash: string // In a real app, this would be hashed
}

export interface AuthSession {
    currentUser: User | null
    isVerified: boolean // Global Verification (Activity/Settings)
    isAdminPinVerified: boolean // Action-level Admin PIN Verification
    verifiedAt: number | null
}
