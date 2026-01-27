import * as React from 'react'
import { ChevronLeft, Printer, Usb, Bluetooth } from 'lucide-react'

import { SettingsGroup } from '@/components/settings/settings-group'
import {
    SettingsItem,
    SettingsItemAction,
    SettingsItemContent,
    SettingsItemDescription,
    SettingsItemIcon,
    SettingsItemTitle,
} from '@/components/settings/settings-item'
import { Button } from '@/components/ui/button'
import { IconTile, SystemIcon } from '@/components/ui/icon'
import { Label } from '@/components/ui/label'
import { SectionTitle } from '@/components/ui/section-title'
import { hardwareService, type BaseDevice } from '@/lib/hardware-service'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { receiptService } from '@/lib/receipt-service'

export interface PrinterSettingsProps {
    onBack?: () => void
}

export default function PrinterSettings({ onBack }: PrinterSettingsProps) {
    const { printerSettings, receiptConfig, logoImage, setConnectedPrinter, disconnectPrinter, setPrinterStatus } = useSettingsStore()
    const [isSearching, setIsSearching] = React.useState(false)
    const [isConnecting, setIsConnecting] = React.useState(false)
    const [isPrinting, setIsPrinting] = React.useState(false)
    const [statusMessage, setStatusMessage] = React.useState<string | null>(null)
    const [discoveredPrinters, setDiscoveredPrinters] = React.useState<BaseDevice[]>([])
    const [connectionMethods] = React.useState(() => hardwareService.getAvailableConnectionMethods())

    const handleSearchBluetooth = async () => {
        setIsSearching(true)
        setStatusMessage('Searching for Bluetooth devices...')
        setPrinterStatus('SEARCHING')
        try {
            console.log('Starting Bluetooth printer discovery...')
            const printers = await hardwareService.discoverBlePrinters()
            setDiscoveredPrinters(printers)
            if (printers.length === 0) {
                setStatusMessage('No devices found or cancelled')
            } else {
                setStatusMessage(`Found ${printers.length} device(s)`)
            }
        } catch (error) {
            console.error('Failed to discover Bluetooth printers:', error)
            setStatusMessage('Discovery failed')
            setPrinterStatus('ERROR')
        } finally {
            setIsSearching(false)
        }
    }

    const handleSearchUsb = async () => {
        setIsSearching(true)
        setStatusMessage('Searching for USB devices...')
        setPrinterStatus('SEARCHING')
        try {
            console.log('Starting USB printer discovery...')
            const printers = await hardwareService.discoverUsbPrinters()
            setDiscoveredPrinters(printers)
            if (printers.length === 0) {
                setStatusMessage('No devices found or cancelled')
            } else {
                setStatusMessage(`Found ${printers.length} device(s)`)
            }
        } catch (error) {
            console.error('Failed to discover USB printers:', error)
            setStatusMessage('Discovery failed')
            setPrinterStatus('ERROR')
        } finally {
            setIsSearching(false)
        }
    }

    const handlePairPrinter = async (printer: BaseDevice) => {
        setIsConnecting(true)
        setStatusMessage(`Connecting to ${printer.name}...`)
        setPrinterStatus('SEARCHING')
        try {
            console.log('Connecting to:', printer.name, `(${printer.connectionType})`)

            const success = await hardwareService.connectDevice(printer)
            if (success) {
                setStatusMessage('✅ Connected!')
                setConnectedPrinter(printer.id, printer.name)
                setDiscoveredPrinters([])
            } else {
                setStatusMessage('❌ Connection failed - check console for details')
                if (printer.connectionType === 'bluetooth') {
                    alert('Connection failed!\n\nThis printer may not support BLE printing.\nThe PTP-II uses Classic Bluetooth SPP which is not supported by Web Bluetooth.\n\nTry connecting via USB instead.')
                }
                setPrinterStatus('ERROR')
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error)
            setStatusMessage(`❌ Error: ${msg}`)
            alert(`Connection error: ${msg}`)
            setPrinterStatus('ERROR')
        } finally {
            setIsConnecting(false)
        }
    }

    /**
     * Print via Android's system print dialog (for RawBT bridge)
     * Navigates to a dedicated print page
     */
    const handlePrintViaSystem = () => {
        // Navigate to print receipt page
        window.open('/print-receipt', '_blank')
    }

    const handleTestPrint = async () => {
        if (!printerSettings.connectedPrinterId) {
            console.error('No printer connected')
            return
        }

        try {
            console.log('Generating test receipt...')
            const receiptData = await receiptService.generateTestReceipt(receiptConfig, logoImage || undefined)
            console.log(`Receipt generated (${receiptData.length} bytes). Sending to printer...`)

            const success = await hardwareService.printReceipt(printerSettings.connectedPrinterId, receiptData)

            if (success) {
                console.log('✅ Test print sent successfully! Check your printer.')
            } else {
                console.error('❌ Test print failed - printer not responding')
            }
        } catch (error) {
            console.error('Error during test print:', error)
        }
    }

    const handleDisconnect = async () => {
        if (!printerSettings.connectedPrinterId) return

        try {
            await hardwareService.disconnectDevice(printerSettings.connectedPrinterId)
            disconnectPrinter()
            console.log('Printer disconnected')
        } catch (error) {
            console.error('Error disconnecting printer:', error)
        }
    }

    const isConnected = printerSettings.printerStatus === 'CONNECTED'
    const hasUsb = connectionMethods.includes('usb')
    const hasBluetooth = connectionMethods.includes('bluetooth')

    return (
        <div className="flex h-full min-h-full flex-col bg-background relative">
            {/* Printing Overlay */}
            {isPrinting && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-xl shadow-lg border">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="text-lg font-medium">Printing...</p>
                    </div>
                </div>
            )}

            {/* Block 1: Header */}
            <div className="sticky top-0 z-10 border-b bg-background px-4 py-4 min-h-[100px]">
                <Button
                    type="button"
                    variant="invisible"
                    className="group w-full h-auto p-0 justify-start text-left"
                    onClick={onBack}
                >
                    <SectionTitle
                        interactive
                        titleAs="h2"
                        leading={
                            <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
                        }
                    >
                        Printer
                    </SectionTitle>
                </Button>
            </div>

            {/* Block 2: Printer status */}
            {isConnected && (
                <div className="px-4 py-4">
                    <div className="flex flex-col gap-4">
                        <Label>Printer status</Label>

                        <SettingsGroup>
                            <SettingsItem element="div">
                                <SettingsItemIcon>
                                    <IconTile icon={Printer} size="medium" variant="tile" tone="success" />
                                </SettingsItemIcon>
                                <SettingsItemContent>
                                    <SettingsItemTitle>{printerSettings.connectedPrinterName || 'Unknown Printer'}</SettingsItemTitle>
                                    <SettingsItemDescription size="tiny" tone="success">
                                        Connected
                                    </SettingsItemDescription>
                                </SettingsItemContent>
                                <SettingsItemAction />
                            </SettingsItem>

                            <SettingsItem element="div">
                                <SettingsItemContent>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <Button type="button" variant="ghost" size="lg" className="w-full" onClick={handleTestPrint}>
                                                Test print
                                            </Button>
                                        </div>
                                        <div className="flex-1">
                                            <Button type="button" variant="destructive" size="lg" className="w-full" onClick={handleDisconnect}>
                                                Disconnect
                                            </Button>
                                        </div>
                                    </div>
                                </SettingsItemContent>
                                <SettingsItemAction />
                            </SettingsItem>
                        </SettingsGroup>
                    </div>
                </div>
            )}

            {/* Block 3: Hardware discovery */}
            <div className="px-4 py-4">
                <div className="flex flex-col gap-4">
                    <Label>Connect a printer</Label>

                    <div className="flex flex-col gap-2">
                        {hasUsb && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="lg"
                                className="w-full justify-center"
                                onClick={handleSearchUsb}
                                disabled={isSearching}
                            >
                                <SystemIcon icon={Usb} />
                                {isSearching ? 'Searching...' : 'Connect via USB'}
                            </Button>
                        )}

                        {hasBluetooth && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="lg"
                                className="w-full justify-center"
                                onClick={handleSearchBluetooth}
                                disabled={isSearching}
                            >
                                <SystemIcon icon={Bluetooth} />
                                {isSearching ? 'Searching...' : 'Connect via Bluetooth'}
                            </Button>
                        )}

                        {!hasUsb && !hasBluetooth && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No connection methods available. Use a browser that supports Web Serial or Web Bluetooth.
                            </p>
                        )}

                        {/* RawBT bridge options */}
                        <div className="border-t border-muted pt-3 mt-2">
                            <p className="text-xs text-muted-foreground mb-2 font-medium">
                                RawBT (Install from Play Store, then pair your printer in RawBT first)
                            </p>

                            {/* Silent print - no dialog */}
                            <Button
                                type="button"
                                variant="default"
                                size="lg"
                                className="w-full justify-center mb-2"
                                disabled={isPrinting}
                                onClick={() => {
                                    setIsPrinting(true);

                                    const text = `
================================
      ComPOSt Demo Store
================================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
================================

Latte (Large)         $6.50
Croissant x2          $8.00
Avocado Toast        $12.00

================================
TOTAL                $24.30
================================

  Thank you for your order!

`.trim();

                                    // Hardware service will handle simple text
                                    hardwareService.printTextViaRawBT(text);

                                    setTimeout(() => setIsPrinting(false), 2000);
                                }}
                            >
                                <SystemIcon icon={Printer} />
                                {isPrinting ? 'Sent!' : '🚀 Silent Print (No Dialog)'}
                            </Button>

                            {/* With print preview */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="lg"
                                className="w-full justify-center"
                                onClick={handlePrintViaSystem}
                            >
                                <SystemIcon icon={Printer} />
                                Print with Preview
                            </Button>
                        </div>
                    </div>

                    {/* Bluetooth warning */}
                    {hasBluetooth && (
                        <p className="text-xs text-muted-foreground">
                            ⚠️ For Bluetooth: Select "Unnamed Device" entries, not named devices like "PTP-II".
                            USB is more reliable for printing.
                        </p>
                    )}

                    {/* Status message */}
                    {statusMessage && (
                        <div className="p-3 rounded-lg bg-muted/50 text-sm text-foreground">
                            {statusMessage}
                        </div>
                    )}

                    {discoveredPrinters.length > 0 && (
                        <SettingsGroup>
                            {discoveredPrinters.map((printer) => (
                                <SettingsItem key={printer.id} element="div">
                                    <SettingsItemIcon>
                                        <SystemIcon icon={printer.connectionType === 'usb' ? Usb : Bluetooth} />
                                    </SettingsItemIcon>
                                    <SettingsItemContent>
                                        <SettingsItemTitle>{printer.name}</SettingsItemTitle>
                                        <SettingsItemDescription size="tiny">
                                            {printer.connectionType === 'usb' ? 'USB' : 'Bluetooth'}
                                        </SettingsItemDescription>
                                    </SettingsItemContent>
                                    <SettingsItemAction tone="default" className="relative z-10">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            disabled={isConnecting}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePairPrinter(printer)
                                            }}
                                        >
                                            {isConnecting ? 'Connecting...' : 'Connect'}
                                        </Button>
                                    </SettingsItemAction>
                                </SettingsItem>
                            ))}
                        </SettingsGroup>
                    )}
                </div>
            </div>
        </div>
    )
}
