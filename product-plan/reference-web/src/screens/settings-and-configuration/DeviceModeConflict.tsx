
import { AlertTriangle } from "lucide-react"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { IconTile } from "../../components/ui/icon"

export default function DeviceModeConflict() {
    return (
        <DialogContent>
            <DialogHeader className="items-center sm:text-center">
                <IconTile
                    icon={AlertTriangle}
                    tone="danger"
                    size="large"
                    className="mb-4"
                />
                <DialogTitle>Active session detected</DialogTitle>
                <DialogDescription>
                    Only one device can operate as the primary POS. If you proceed, the
                    currently active device will be logged out and you will take over
                    processing orders and payments.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
                <Button variant="secondary">Cancel</Button>
                <Button variant="destructive">Switch anyway</Button>
            </DialogFooter>
        </DialogContent>
    )
}
