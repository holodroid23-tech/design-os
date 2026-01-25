import * as React from 'react'
import { CreditCard, Loader2, RotateCw, Smartphone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hardwareService } from '@/lib/hardware-service'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SectionTitle } from '@/components/ui/section-title'
import { IconTile, SystemIcon } from '@/components/atoms/icon'

export interface StripePaymentModalProps {
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

type PaymentStep = 'initializing' | 'discovering' | 'connecting' | 'processing' | 'success' | 'error'

export function StripePaymentModal({ amount, onSuccess, onCancel }: StripePaymentModalProps) {
    const [step, setStep] = React.useState<PaymentStep>('initializing')
    const [statusMessage, setStatusMessage] = React.useState('Initializing Tap to Pay...')
    const { currency } = useSettingsStore()

    React.useEffect(() => {
        startPaymentFlow()
    }, [])

    const startPaymentFlow = async () => {
        try {
            // Ensure backend URL is set (from ngrok)
            // Note: If you have a settings UI for this, it should be read from there.
            const currentBackend = hardwareService.getStripeBackendUrl();
            console.log('🔗 Stripe Terminal using backend:', currentBackend);

            setStep('initializing')
            setStatusMessage('Starting terminal...')

            // Step 1: Initialize & Discover
            const readers = await hardwareService.discoverDevices('terminal')

            if (readers.length === 0) {
                throw new Error('No NFC reader found. Ensure NFC is enabled.')
            }

            // Step 2: Connect
            setStep('connecting')
            setStatusMessage('Connecting to NFC hardware...')
            await hardwareService.connectToTerminal(readers[0].id)

            // Step 3: Collect payment
            setStep('processing')
            setStatusMessage('Ready to tap')

            const _paymentResult = await hardwareService.collectTerminalPayment(
                amount,
                (_status, message) => {
                    setStatusMessage(message)
                }
            )

            // Success!
            setStep('success')
            setStatusMessage('Payment complete')

            setTimeout(() => {
                onSuccess()
            }, 1500)

        } catch (error: any) {
            console.error('❌ Tap to Pay Error:', error)
            setStep('error')
            setStatusMessage(error?.message || 'Transaction failed')
        }
    }

    const renderContent = () => {
        const displayAmount = `${amount.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`

        switch (step) {
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
                        <IconTile icon={CreditCard} size="large" tone="success" />
                        <div className="space-y-2">
                            <SectionTitle titleAs="h1">Payment Success</SectionTitle>
                            <p className="text-muted-foreground">Transaction completed successfully</p>
                        </div>
                        <SectionTitle titleAs="div" size="page" className="mt-4">
                            {displayAmount}
                        </SectionTitle>
                    </div>
                )

            case 'error':
                return (
                    <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                        <IconTile icon={X} size="large" tone="danger" />
                        <div className="space-y-2">
                            <SectionTitle titleAs="h1">Failed</SectionTitle>
                            <p className="text-destructive font-medium">{statusMessage}</p>
                        </div>

                        <SectionTitle titleAs="div" size="page" className="my-2">
                            {displayAmount}
                        </SectionTitle>

                        <div className="grid grid-cols-2 gap-3 w-full mt-4">
                            <Button variant="secondary" size="lg" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button variant="default" size="lg" onClick={startPaymentFlow}>
                                <RotateCw className="mr-2 h-4 w-4" />
                                Retry
                            </Button>
                        </div>
                    </div>
                )

            case 'processing':
                return (
                    <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
                        <div className="relative">
                            <IconTile icon={Smartphone} size="large" tone="neutral" className="bg-primary/10 animate-pulse scale-110" />
                            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-25" />
                        </div>

                        <div className="space-y-2">
                            <SectionTitle titleAs="h1">Tap to pay</SectionTitle>
                            <p className="text-xl font-medium animate-pulse">{statusMessage}</p>
                        </div>

                        <SectionTitle titleAs="div" size="page" className="mt-6">
                            {displayAmount}
                        </SectionTitle>

                        <div className="flex items-center gap-2 text-muted-foreground mt-4">
                            <SystemIcon icon={CreditCard} size="regular" />
                            <span className="text-sm font-medium">Hold card to back of phone</span>
                        </div>
                    </div>
                )

            default: // Initializing / Connecting
                return (
                    <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
                        <Loader2 className="h-16 w-16 animate-spin text-primary opacity-50" />
                        <div className="space-y-2">
                            <SectionTitle titleAs="h1">Initializing</SectionTitle>
                            <p className="text-muted-foreground">{statusMessage}</p>
                        </div>
                        <SectionTitle titleAs="div" size="page" className="opacity-50">
                            {displayAmount}
                        </SectionTitle>
                    </div>
                )
        }
    }

    return (
        <Dialog open onOpenChange={(open) => { if (!open) onCancel() }}>
            <DialogContent className="sm:max-w-[420px] max-h-[90vh] overflow-hidden" showCloseButton={false}>
                <div className="relative">
                    {/* Header close button */}
                    <div className="absolute right-0 top-0 z-10">
                        <Button
                            variant="invisible"
                            size="icon-lg"
                            className="rounded-full bg-muted/50"
                            onClick={onCancel}
                        >
                            <SystemIcon icon={X} />
                        </Button>
                    </div>

                    {renderContent()}
                </div>
            </DialogContent>
        </Dialog>
    )
}
