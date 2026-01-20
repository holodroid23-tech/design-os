import { Monitor } from "lucide-react"
import { IconTile } from "../../components/atoms/icon"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"

export default function DeviceModeSwitchRegister() {
    return (
        <Dialog open={true}>
            <DialogContent>
                {/* Block 1: Alert Content */}
                <DialogHeader className="items-center sm:text-center">
                    <IconTile icon={Monitor} tone="neutral" size="large" className="mb-4" />
                    <DialogTitle>Switch to Register?</DialogTitle>
                    <DialogDescription>
                        Switching to Register mode will activate this device as the primary POS to process orders and payments.
                    </DialogDescription>
                </DialogHeader>

                {/* Block 2: Action Footer */}
                <DialogFooter className="sm:justify-center">
                    <Button variant="secondary" className="w-full sm:w-auto">Cancel</Button>
                    <Button variant="default" className="w-full sm:w-auto">Switch Mode</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
