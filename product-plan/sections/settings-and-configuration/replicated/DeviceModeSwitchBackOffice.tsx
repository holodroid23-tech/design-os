
import { ArrowLeftRight } from "lucide-react"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconTile } from "@/components/ui/icon"

export default function DeviceModeSwitchBackOffice() {
    return (
        <DialogContent>
            <DialogHeader className="items-center sm:text-center">
                <IconTile
                    icon={ArrowLeftRight}
                    tone="neutral"
                    size="large"
                    className="mb-4"
                />
                <DialogTitle>Switch to Back Office</DialogTitle>
                <DialogDescription>
                    You are currently in Device Mode. Switching to Back Office will log out the current session and return to the main configuration screen.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
                <Button variant="secondary">Cancel</Button>
                <Button variant="default">Switch to Back Office</Button>
            </DialogFooter>
        </DialogContent>
    )
}
