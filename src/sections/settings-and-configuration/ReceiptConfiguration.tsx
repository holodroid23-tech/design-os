import * as React from 'react'

import { SettingsGroup } from '@/components/settings/settings-group'
import {
    SettingsItem,
    SettingsItemAction,
    SettingsItemContent,
    SettingsItemIcon,
    SettingsItemTitle,
} from '@/components/settings/settings-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioButtonGroup, RadioButtonGroupItem } from '@/components/ui/radio-button-group'
import { SectionTitle } from '@/components/ui/section-title'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, ChevronLeft, Clock, Hash, QrCode, User, X } from 'lucide-react'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { hardwareService } from '@/lib/hardware-service'
import { receiptService } from '@/lib/receipt-service'
import { MediaUpload } from '@/components/ui/media-upload'

export interface ReceiptConfigurationProps {
    onBack?: () => void
}

export default function ReceiptConfiguration({ onBack }: ReceiptConfigurationProps) {
    const {
        receiptConfig,
        logoImage,
        qrCodeImage,
        printerSettings,
        updateReceiptConfig,
        setLogoImage,
        setQrCodeImage,
        setPaperSize
    } = useSettingsStore()

    const [showTopControls, setShowTopControls] = React.useState(true)
    const lastScrollTopRef = React.useRef(0)
    const [tab, setTab] = React.useState<'design' | 'preview'>('design')

    const hasIncludedDetails =
        receiptConfig.showDate || receiptConfig.showTime || receiptConfig.showOrderId || receiptConfig.showCashier

    const receiptWidthClass = printerSettings.paperSize === '58mm' ? 'max-w-[260px]' : 'max-w-[340px]'
    const receiptFontClass = receiptConfig.fontFamily === 'Monospace' ? 'font-mono' : 'font-sans'
    const receiptTextSizeClass = receiptConfig.fontSize === 'S' ? 'text-xs' : receiptConfig.fontSize === 'L' ? 'text-sm' : 'text-sm'
    const separatorBorderClass =
        receiptConfig.separatorStyle === 'Dashed'
            ? 'border-dashed'
            : receiptConfig.separatorStyle === 'Dotted'
                ? 'border-dotted'
                : 'border-solid'

    const handleFileUpload = (updater: (data: string | null) => void) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const base64 = e.target?.result as string
                    updater(base64)
                }
                reader.readAsDataURL(file)
            }
        }
        input.click()
    }

    const handleTestPrint = async () => {
        try {
            // Generate test receipt with current config
            const receiptData = await receiptService.generateTestReceipt(
                receiptConfig,
                logoImage || undefined,
                qrCodeImage || undefined,
                printerSettings.paperSize
            )

            if (printerSettings.connectedPrinterId) {
                alert('Tiskárna připojena, tisknu test... (' + printerSettings.connectedPrinterName + ')');
                const success = await hardwareService.printReceipt(printerSettings.connectedPrinterId, receiptData)
                if (success) {
                    console.log('Test print sent successfully')
                } else {
                    console.error('Test print failed')
                    alert('Chyba testovacího tisku.')
                }
            } else {
                // Try RawBT fallback (Android)
                if (hardwareService.isRawBTAvailable()) {
                    console.log('No printer connected, attempting RawBT...')
                    const success = hardwareService.printViaRawBT(receiptData)
                    if (success) {
                        console.log('Test odeslán do RawBT')
                    } else {
                        alert('Test se nepodařilo odeslat do RawBT')
                    }
                } else {
                    alert('Není připojena tiskárna a RawBT není k dispozici.')
                }
            }
        } catch (error) {
            console.error('Error during test print:', error)
        }
    }

    return (
        <div className="flex h-full min-h-full flex-col bg-background">
            {/* Block 1: Header */}
            <div className="sticky top-0 z-10 bg-background px-6 py-4 min-h-[100px]">
                <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left" onClick={onBack}>
                    <SectionTitle
                        interactive
                        leading={
                            <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
                        }
                    >
                        Receipt
                    </SectionTitle>
                </Button>
            </div>

            {/* Block 2: View mode */}
            <div
                className="flex-1 overflow-y-auto px-6 py-4"
                onScroll={(e) => {
                    const scrollTop = e.currentTarget.scrollTop
                    const prev = lastScrollTopRef.current
                    const delta = scrollTop - prev

                    if (scrollTop < 8) {
                        setShowTopControls(true)
                    } else if (delta > 10) {
                        setShowTopControls(false)
                    } else if (delta < -10) {
                        setShowTopControls(true)
                    }

                    lastScrollTopRef.current = scrollTop
                }}
            >
                <Tabs value={tab} onValueChange={(v) => setTab(v as 'design' | 'preview')} className="h-full">
                    <div
                        className={`sticky top-0 z-10 bg-background transition-transform duration-200 ${showTopControls ? 'translate-y-0' : '-translate-y-[calc(100%+30px)]'
                            }`}
                    >
                        <TabsList className="w-full">
                            <TabsTrigger value="design" className="flex-1">
                                Design
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="flex-1">
                                Preview
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="design" className="mt-6">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <Label className="text-muted-foreground">Logo</Label>
                                {logoImage ? (
                                    <div className="relative group w-fit mx-auto">
                                        <div className="rounded-xl border border-border p-4 bg-white">
                                            <img src={logoImage} alt="Receipt Logo" className="max-h-32 object-contain mx-auto" />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
                                            onClick={() => setLogoImage(null)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <MediaUpload
                                        onChooseFromFiles={() => handleFileUpload(setLogoImage)}
                                        onTakePhoto={() => handleFileUpload(setLogoImage)} // Fallback for now, could act same
                                        chooseFromFilesLabel="Upload logo"
                                        takePhotoLabel="Take photo"
                                    />
                                )}
                            </div>

                            {/* Block 3: Included details */}
                            <div className="flex flex-col gap-3">
                                <Label className="text-muted-foreground">Included details</Label>
                                <SettingsGroup>
                                    {/* Keep existing Checkboxes/Switches */}
                                    <SettingsItem element="div">
                                        <SettingsItemIcon>
                                            <Calendar className="size-5" aria-hidden="true" />
                                        </SettingsItemIcon>
                                        <SettingsItemContent>
                                            <SettingsItemTitle>Date</SettingsItemTitle>
                                        </SettingsItemContent>
                                        <SettingsItemAction>
                                            <Switch
                                                checked={receiptConfig.showDate}
                                                onCheckedChange={(checked) =>
                                                    updateReceiptConfig({ showDate: Boolean(checked) })
                                                }
                                                aria-label="Date"
                                            />
                                        </SettingsItemAction>
                                    </SettingsItem>

                                    <SettingsItem element="div">
                                        <SettingsItemIcon>
                                            <Clock className="size-5" aria-hidden="true" />
                                        </SettingsItemIcon>
                                        <SettingsItemContent>
                                            <SettingsItemTitle>Time</SettingsItemTitle>
                                        </SettingsItemContent>
                                        <SettingsItemAction>
                                            <Switch
                                                checked={receiptConfig.showTime}
                                                onCheckedChange={(checked) =>
                                                    updateReceiptConfig({ showTime: Boolean(checked) })
                                                }
                                                aria-label="Time"
                                            />
                                        </SettingsItemAction>
                                    </SettingsItem>

                                    <SettingsItem element="div">
                                        <SettingsItemIcon>
                                            <Hash className="size-5" aria-hidden="true" />
                                        </SettingsItemIcon>
                                        <SettingsItemContent>
                                            <SettingsItemTitle>Order ID</SettingsItemTitle>
                                        </SettingsItemContent>
                                        <SettingsItemAction>
                                            <Switch
                                                checked={receiptConfig.showOrderId}
                                                onCheckedChange={(checked) =>
                                                    updateReceiptConfig({ showOrderId: Boolean(checked) })
                                                }
                                                aria-label="Order ID"
                                            />
                                        </SettingsItemAction>
                                    </SettingsItem>

                                    <SettingsItem element="div">
                                        <SettingsItemIcon>
                                            <User className="size-5" aria-hidden="true" />
                                        </SettingsItemIcon>
                                        <SettingsItemContent>
                                            <SettingsItemTitle>Cashier name</SettingsItemTitle>
                                        </SettingsItemContent>
                                        <SettingsItemAction>
                                            <Switch
                                                checked={receiptConfig.showCashier}
                                                onCheckedChange={(checked) =>
                                                    updateReceiptConfig({ showCashier: Boolean(checked) })
                                                }
                                                aria-label="Cashier name"
                                            />
                                        </SettingsItemAction>
                                    </SettingsItem>
                                </SettingsGroup>
                            </div>

                            {/* Block 4: Paper size + upload */}
                            <div className="flex flex-col gap-3">
                                <Label className="text-muted-foreground">Paper size</Label>
                                <RadioButtonGroup
                                    value={printerSettings.paperSize}
                                    onValueChange={(v) => setPaperSize(v as '58mm' | '80mm')}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <RadioButtonGroupItem value="58mm" variant="default" size="default">
                                        58mm
                                    </RadioButtonGroupItem>
                                    <RadioButtonGroupItem value="80mm" variant="default" size="default">
                                        80mm
                                    </RadioButtonGroupItem>
                                </RadioButtonGroup>
                            </div>

                            {/* Block 5: Typography controls */}
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <Label className="text-muted-foreground">Typography family</Label>
                                    <RadioButtonGroup
                                        value={receiptConfig.fontFamily}
                                        onValueChange={(v) => updateReceiptConfig({ fontFamily: v as 'Monospace' | 'Sans Serif' })}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        <RadioButtonGroupItem value="Monospace" variant="default" size="default">
                                            <span className="font-mono">Monospace</span>
                                        </RadioButtonGroupItem>
                                        <RadioButtonGroupItem value="Sans Serif" variant="default" size="default">
                                            <span className="font-sans">Sans serif</span>
                                        </RadioButtonGroupItem>
                                    </RadioButtonGroup>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label className="text-muted-foreground">Font size</Label>
                                    <RadioButtonGroup
                                        value={receiptConfig.fontSize}
                                        onValueChange={(v) => updateReceiptConfig({ fontSize: v as 'S' | 'M' | 'L' })}
                                        className="grid grid-cols-3 gap-3"
                                    >
                                        <RadioButtonGroupItem value="S" variant="default" size="default">
                                            Small
                                        </RadioButtonGroupItem>
                                        <RadioButtonGroupItem value="M" variant="default" size="default">
                                            Medium
                                        </RadioButtonGroupItem>
                                        <RadioButtonGroupItem value="L" variant="default" size="default">
                                            Large
                                        </RadioButtonGroupItem>
                                    </RadioButtonGroup>
                                </div>
                            </div>

                            {/* Block 6: Separator style */}
                            <div className="flex flex-col gap-3">
                                <Label className="text-muted-foreground">Separator style</Label>
                                <RadioButtonGroup
                                    value={receiptConfig.separatorStyle}
                                    onValueChange={(v) => updateReceiptConfig({ separatorStyle: v as 'Dashed' | 'Dotted' | 'Solid' })}
                                    className="grid grid-cols-3 gap-3"
                                >
                                    <RadioButtonGroupItem value="Dashed" variant="card" size="card">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                                                <div className="w-8 border-t-2 border-border border-dashed" aria-hidden="true" />
                                            </div>
                                            <div className="text-sm">Dashed</div>
                                        </div>
                                    </RadioButtonGroupItem>
                                    <RadioButtonGroupItem value="Dotted" variant="card" size="card">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                                                <div className="w-8 border-t-2 border-border border-dotted" aria-hidden="true" />
                                            </div>
                                            <div className="text-sm">Dotted</div>
                                        </div>
                                    </RadioButtonGroupItem>
                                    <RadioButtonGroupItem value="Solid" variant="card" size="card">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                                                <div className="w-8 border-t-2 border-border" aria-hidden="true" />
                                            </div>
                                            <div className="text-sm">Solid</div>
                                        </div>
                                    </RadioButtonGroupItem>
                                </RadioButtonGroup>
                            </div>

                            {/* Block 7: Footer details */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="footer-message">Footer message</Label>
                                    <Input
                                        id="footer-message"
                                        value={receiptConfig.footerMessage}
                                        onChange={(e) => updateReceiptConfig({ footerMessage: e.target.value })}
                                        placeholder="Thank you for visiting!"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Label htmlFor="show-qr-code">Show QR code</Label>
                                    <Switch
                                        id="show-qr-code"
                                        checked={receiptConfig.showQrCode}
                                        onCheckedChange={(checked) => updateReceiptConfig({ showQrCode: Boolean(checked) })}
                                        aria-label="Show QR code"
                                    />
                                </div>

                                {receiptConfig.showQrCode ? (
                                    <div className="pb-6">
                                        {qrCodeImage ? (
                                            <div className="relative group w-fit mx-auto">
                                                <div className="rounded-xl border border-border p-4 bg-white">
                                                    <img src={qrCodeImage} alt="Receipt QR Code" className="max-h-32 object-contain mx-auto" />
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
                                                    onClick={() => setQrCodeImage(null)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <MediaUpload
                                                onChooseFromFiles={() => handleFileUpload(setQrCodeImage)}
                                                onTakePhoto={() => handleFileUpload(setQrCodeImage)}
                                                chooseFromFilesLabel="Upload QR code"
                                                takePhotoLabel="Take photo"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="pb-6" />
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="mt-6">
                        <div className="flex flex-col gap-6">
                            <Button className="w-full" type="button" onClick={handleTestPrint}>
                                Test print
                            </Button>

                            <div className="flex justify-center">
                                <div
                                    className={[
                                        'w-full rounded-[12px] border border-black/10 bg-white p-6 text-black',
                                        receiptWidthClass,
                                        receiptFontClass,
                                        receiptTextSizeClass,
                                    ].join(' ')}
                                >
                                    <div className="text-center">
                                        {logoImage ? (
                                            <div className="mb-2 flex justify-center">
                                                <img src={logoImage} alt="Logo" className="max-h-16" />
                                            </div>
                                        ) : (
                                            <div className="text-lg font-semibold leading-tight">ComPOSt Demo</div>
                                        )}
                                        <div className="mt-2 space-y-0.5 text-xs text-black/60">
                                            <div>123 Espresso Lane</div>
                                            <div>Seattle, WA 98101</div>
                                            <div>Tel: (206) 555-0123</div>
                                        </div>
                                    </div>

                                    {hasIncludedDetails ? (
                                        <div className="mt-4 space-y-3">
                                            <div className={['border-t border-black/20', separatorBorderClass].join(' ')} />

                                            <div className="space-y-1 text-black/70">
                                                {receiptConfig.showOrderId ? (
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span>Receipt #</span>
                                                        <span className="text-black">ORD-2024-001</span>
                                                    </div>
                                                ) : null}
                                                {receiptConfig.showDate || receiptConfig.showTime ? (
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span>Date</span>
                                                        <span className="text-black">
                                                            {receiptConfig.showDate ? 'Jan 22, 2026' : null}
                                                            {receiptConfig.showDate && receiptConfig.showTime ? ' · ' : null}
                                                            {receiptConfig.showTime ? '4:29 PM' : null}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {receiptConfig.showCashier ? (
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span>Cashier</span>
                                                        <span className="text-black">Test User</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className={['my-4 border-t border-black/20', separatorBorderClass].join(' ')} />

                                    <div className="space-y-2">
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span className="text-black">Latte (Large)</span>
                                            <span className="text-black">$6.50</span>
                                        </div>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span className="text-black">Croissant x2</span>
                                            <span className="text-black">$8.00</span>
                                        </div>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span className="text-black">Avocado toast</span>
                                            <span className="text-black">$12.00</span>
                                        </div>
                                    </div>

                                    <div className={['my-4 border-t border-black/20', separatorBorderClass].join(' ')} />

                                    <div className="space-y-1 text-black/70">
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span>Subtotal</span>
                                            <span className="text-black">$22.50</span>
                                        </div>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span>Tax (8.0%)</span>
                                            <span className="text-black">$1.80</span>
                                        </div>
                                        <div className="mt-3 flex items-baseline justify-between gap-4">
                                            <span className="text-black font-semibold">Total</span>
                                            <span className="text-black font-semibold">$24.30</span>
                                        </div>
                                    </div>

                                    <div className={['my-4 border-t border-black/20', separatorBorderClass].join(' ')} />

                                    <div className="space-y-2 text-center">
                                        <div className="text-black">{receiptConfig.footerMessage || ' '}</div>
                                    </div>

                                    {receiptConfig.showQrCode ? (
                                        <div className="mt-5 flex flex-col items-center gap-2">
                                            {qrCodeImage ? (
                                                <img src={qrCodeImage} alt="QR Code" className="size-28" />
                                            ) : (
                                                <div className="grid size-28 place-items-center rounded-[12px] border border-black/20 bg-white">
                                                    <QrCode className="size-12 text-black/60" aria-hidden="true" />
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
