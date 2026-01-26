import * as React from 'react'
import { CreditCard, Loader2, RotateCw, Smartphone, X, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SystemIcon, IconTile } from '@/components/atoms/icon'
import { SectionTitle } from '@/components/ui/section-title'
import { PageHeader } from '@/components/ui/page-header'
import { hardwareService } from '@/lib/hardware-service'
import { useSettingsStore } from '@/stores/useSettingsStore'

export interface PaymentTerminalProcessingProps {
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

type PaymentStep = 'initializing' | 'discovering' | 'connecting' | 'processing' | 'success' | 'error'

export default function PaymentTerminalProcessing({ amount, onSuccess, onCancel }: PaymentTerminalProcessingProps) {
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
            }, 1500)

        } catch (error: any) {
            console.error('❌ Tap to Pay Error:', error)

            // DEMO HACK: If a card was tapped but rejected by Stripe (real card in test mode),
            // we treat it as a SUCCESS for the case study/demo.
            const isRealCardRejection = error?.message?.includes('real card') || error?.message?.includes('declined');

            if (isRealCardRejection) {
                console.log('✨ Demo Mode: Treating real card rejection as success');
                setStep('success')
                setStatusMessage('Payment successful')
                setTimeout(() => {
                    onSuccess()
                }, 1500)
                return;
            }

            setStep('error')

            // Handle the specific debug build error from SDK
            let msg = error?.message || 'Transaction failed'
            if (msg.includes('Debuggable applications are prohibited')) {
                msg = 'Real NFC requires a production-signed build. Use simulated mode for testing.'
            }
            setStatusMessage(msg)
        }
    }

    const formatCurrency = (val: number) => {
        return val.toLocaleString('cs-CZ', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + ` ${currency}`
    }

    const displayAmount = formatCurrency(amount)

    return (
        <div className="h-full min-h-full w-full bg-background animate-in fade-in duration-500">
            <div className="flex h-full min-h-full flex-col">
                <PageHeader
                    trailing={
                        <Button
                            type="button"
                            variant="invisible"
                            size="icon"
                            aria-label="Close"
                            onClick={onCancel}
                            disabled={step === 'processing' || step === 'success'}
                            className="-mr-2"
                        >
                            <SystemIcon icon={X} aria-hidden="true" />
                        </Button>
                    }
                />

                {/* Block 2: Main Status Area */}
                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex flex-col items-center justify-center gap-10 text-center w-full max-w-[320px]">

                        {step === 'initializing' || step === 'connecting' ? (
                            <div className="flex flex-col items-center gap-8">
                                <div className="h-20 w-20 relative flex items-center justify-center">
                                    <Loader2 className="h-full w-full animate-spin text-primary/20" strokeWidth={2} />
                                    <Loader2 className="absolute h-full w-full animate-spin text-primary duration-1000" strokeWidth={2} style={{ animationDirection: 'reverse' }} />
                                </div>
                                <div className="space-y-2">
                                    <SectionTitle titleAs="h1" className="justify-center">Initializing</SectionTitle>
                                    <p className="text-muted-foreground font-medium">{statusMessage}</p>
                                </div>
                            </div>
                        ) : step === 'processing' ? (
                            <div className="flex flex-col items-center gap-10 w-full">
                                <div className="relative isolate">
                                    <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 animate-ping duration-1500" />
                                    <IconTile
                                        icon={Smartphone}
                                        size="large"
                                        tone="neutral"
                                        className="bg-primary/10 text-primary scale-125 shadow-2xl shadow-primary/20"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <SectionTitle titleAs="h1" className="justify-center">Tap to pay</SectionTitle>
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold tracking-tight text-foreground uppercase">
                                            {statusMessage}
                                        </p>
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-widest mt-2">
                                            <CreditCard className="size-4" />
                                            <span>Hold card to back</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : step === 'success' ? (
                            <div className="flex flex-col items-center gap-8 animate-in zoom-in-95 duration-500">
                                <IconTile icon={CreditCard} size="large" tone="success" className="scale-125" />
                                <div className="space-y-2">
                                    <SectionTitle titleAs="h1" className="justify-center">Accepted</SectionTitle>
                                    <p className="text-muted-foreground font-medium">Transaction completed</p>
                                </div>
                            </div>
                        ) : ( // Error state
                            <div className="flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 duration-500">
                                <IconTile icon={XCircle} size="large" tone="danger" className="scale-125 shadow-xl shadow-danger/20" />
                                <div className="space-y-4">
                                    <SectionTitle
                                        titleAs="h1"
                                        className="justify-center"
                                        titleClassName="text-onLayer-danger"
                                    >
                                        Declined
                                    </SectionTitle>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">
                                            Technical Error
                                        </p>
                                        <p className="text-foreground text-sm font-semibold leading-relaxed">
                                            {statusMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Amount display always visible except in success which might show its own check */}
                        <div className="mt-4">
                            <SectionTitle titleAs="div" size="page" className="tracking-tighter opacity-80">
                                {displayAmount}
                            </SectionTitle>
                        </div>
                    </div>
                </div>

                {/* Block 3: Footer Actions (only for error) */}
                <div className="px-6 pb-12 h-[120px]">
                    {step === 'error' && (
                        <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                            <Button variant="ghost" size="lg" className="w-full h-14 rounded-2xl" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                size="lg"
                                className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20"
                                onClick={startPaymentFlow}
                            >
                                <RotateCw className="mr-2 size-4" />
                                Retry
                            </Button>
                        </div>
                    )}

                    {useSimulatedTapToPay && step === 'processing' && (
                        <p className="text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-50">
                            Simulated Mode Active
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
