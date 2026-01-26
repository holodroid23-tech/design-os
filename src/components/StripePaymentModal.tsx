import * as React from 'react'
import { CreditCard, Loader2, RotateCw, Smartphone, X, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hardwareService } from '@/lib/hardware-service'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SectionTitle } from '@/components/ui/section-title'
import { IconTile } from '@/components/atoms/icon'

export interface StripePaymentModalProps {
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

type PaymentStep = 'initializing' | 'discovering' | 'connecting' | 'processing' | 'success' | 'error'

export function StripePaymentModal({ amount, onSuccess, onCancel }: StripePaymentModalProps) {
    const [step, setStep] = React.useState<PaymentStep>('initializing')
    const [statusMessage, setStatusMessage] = React.useState('Initializing Tap to Pay...')
    const { currency, useSimulatedTapToPay } = useSettingsStore()

    React.useEffect(() => {
        startPaymentFlow()
    }, [])

    const startPaymentFlow = async () => {
        try {
            const currentBackend = hardwareService.getStripeBackendUrl();
            console.log('🔗 Stripe Terminal using backend:', currentBackend);
            console.log('🔧 Simulated mode:', useSimulatedTapToPay);

            setStep('initializing')
            setStatusMessage(useSimulatedTapToPay ? 'Starting simulated terminal...' : 'Starting terminal...')

            // Apply simulated mode setting before discovery
            await hardwareService.setStripeSimulatedMode(useSimulatedTapToPay);

            const readers = await hardwareService.discoverDevices('terminal')

            if (readers.length === 0) {
                throw new Error('No NFC reader detected. Ensure NFC/Location are enabled.')
            }

            setStep('connecting')
            setStatusMessage('System connecting...')
            await hardwareService.connectToTerminal(readers[0].id)

            setStep('processing')
            setStatusMessage('Ready for card tap')

            await hardwareService.collectTerminalPayment(
                amount,
                (_status, message) => {
                    setStatusMessage(message)
                }
            )

            setStep('success')
            setStatusMessage('Payment successful')

            setTimeout(() => {
                onSuccess()
            }, 2000)

        } catch (error: any) {
            console.error('❌ Tap to Pay Error:', error)
            setStep('error')

            // Handle the specific debug build error from SDK
            let msg = error?.message || 'Transaction failed'
            if (msg.includes('Debuggable applications are prohibited')) {
                msg = 'Real NFC requires a production-signed build. Use simulated mode for testing.'
            }
            setStatusMessage(msg)
        }
    }

    const displayAmount = amount.toLocaleString('cs-CZ', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ` ${currency}`

    const renderHeader = () => (
        <div className="flex justify-end p-2 pointer-events-none sticky top-0 z-50">
            <Button
                variant="invisible"
                size="icon"
                className="rounded-full bg-muted/40 pointer-events-auto"
                onClick={onCancel}
            >
                <X className="size-5" />
            </Button>
        </div>
    )

    const renderContent = () => {
        switch (step) {
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center gap-6 px-6 py-10 text-center animate-in fade-in zoom-in-95 duration-300">
                        <IconTile icon={CreditCard} size="large" tone="success" />
                        <div className="space-y-2">
                            <SectionTitle titleAs="h1" className="justify-center">Success</SectionTitle>
                            <p className="text-muted-foreground font-medium">Transaction completed</p>
                        </div>
                        <div className="text-4xl font-bold tracking-tight font-mono mt-2">
                            {displayAmount}
                        </div>
                    </div>
                )

            case 'error':
                return (
                    <div className="flex flex-col items-center justify-center gap-10 px-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <IconTile icon={XCircle} size="large" tone="danger" className="scale-110 shadow-xl shadow-danger/20" />

                        <div className="space-y-4">
                            <SectionTitle
                                titleAs="h1"
                                size="page"
                                className="justify-center"
                                titleClassName="text-onLayer-danger"
                            >
                                Failed
                            </SectionTitle>
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-[0.1em] text-[10px]">
                                    Technical Error
                                </p>
                                <p className="text-foreground text-sm font-semibold max-w-[320px] leading-relaxed mx-auto">
                                    {statusMessage}
                                </p>
                            </div>
                        </div>

                        <div className="text-4xl font-bold font-mono tracking-tighter text-foreground/40 py-2">
                            {displayAmount}
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full mt-4">
                            <Button variant="ghost" size="lg" className="w-full h-14 rounded-2xl" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button variant="default" size="lg" className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20" onClick={startPaymentFlow}>
                                <RotateCw className="mr-2 size-4" />
                                Retry
                            </Button>
                        </div>
                    </div>
                )

            case 'processing':
                return (
                    <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 text-center">
                        <div className="relative isolate">
                            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 animate-ping duration-1000" />
                            <IconTile icon={Smartphone} size="large" tone="neutral" className="bg-primary/10 text-primary scale-110 shadow-lg shadow-primary/20" />
                        </div>

                        <div className="space-y-3">
                            <SectionTitle titleAs="h1" className="justify-center">Tap to pay</SectionTitle>
                            <p className="text-xl font-bold tracking-tight animate-pulse text-foreground">
                                {statusMessage}
                            </p>
                        </div>

                        <div className="text-3xl font-bold font-mono tracking-tight mt-4">
                            {displayAmount}
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground mt-4 text-sm font-semibold uppercase tracking-wider">
                            <CreditCard className="size-4" />
                            <span>Hold card to back</span>
                        </div>
                    </div>
                )

            default: // Initializing / Connecting
                return (
                    <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 text-center animate-in fade-in duration-500">
                        <div className="h-16 w-16 relative flex items-center justify-center">
                            <Loader2 className="h-full w-full animate-spin text-primary/30" strokeWidth={3} />
                            <Loader2 className="absolute h-full w-full animate-spin text-primary duration-1000" strokeWidth={3} style={{ animationDirection: 'reverse' }} />
                        </div>
                        <div className="space-y-2">
                            <SectionTitle titleAs="h1" className="justify-center">Initializing</SectionTitle>
                            <p className="text-muted-foreground font-medium">{statusMessage}</p>
                        </div>
                        <div className="text-2xl font-bold font-mono opacity-40">
                            {displayAmount}
                        </div>
                    </div>
                )
        }
    }

    return (
        <Dialog open onOpenChange={(open) => { if (!open) onCancel() }}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-border/40 shadow-2xl rounded-3xl" showCloseButton={false}>
                {renderHeader()}
                <div className="relative -mt-12">
                    {renderContent()}
                </div>
            </DialogContent>
        </Dialog>
    )
}
