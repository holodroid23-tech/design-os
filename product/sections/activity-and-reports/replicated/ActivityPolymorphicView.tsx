import { useAuthStore } from '@/stores/useAuthStore'
import ActivityCashierView from './ActivityCashierView'
import ActivityAndReportsManagerAdminView from './ActivityAndReportsManagerAdminView'

export default function ActivityPolymorphicView() {
    const { currentUser } = useAuthStore()

    if (currentUser?.role === 'Cashier') {
        return <ActivityCashierView />
    }

    return <ActivityAndReportsManagerAdminView />
}
