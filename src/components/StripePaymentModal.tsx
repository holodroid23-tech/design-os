import * as React from 'react'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hardwareService } from '@/lib/hardware-service'

export interface StripePaymentModalProps {
    amount: number
    onSuccess: () => void
    onCancel: () => void
}

type PaymentStep = 'initializing' | 'discovering' | 'connecting' | 'processing' | 'success' | 'error'

export function StripePaymentModal({ amount, onSuccess, onCancel }: StripePaymentModalProps) {
    const [step, setStep] = React.useState<PaymentStep>('initializing')
    const [statusMessage, setStatusMessage] = React.useState('Initializing Stripe Terminal...')

    React.useEffect(() => {
        startPaymentFlow()
    }, [])

    const startPaymentFlow = async () => {
        try {
            // Step 0: Configure backend URL (ngrok)
            // TODO: Move this to app settings once testing is complete
            const STRIPE_BACKEND_URL = 'https://beatris-unhating-emmaline.ngrok-free.dev';
            console.log('🔗 Setting backend URL:', STRIPE_BACKEND_URL);
            await hardwareService.setStripeBackendUrl(STRIPE_BACKEND_URL);

            // Step 1: Initialize Terminal
            setStep('initializing')
            setStatusMessage('Initializing Stripe Terminal...')
            console.log('🎯 Starting payment flow...')
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 2: Prepare internal NFC (Tap to Pay on Android)
            setStep('discovering')
            setStatusMessage('Preparing NFC for Tap to Pay...')
            console.log('🔍 Preparing Tap to Pay on Android (internal NFC)...')

            const readers = await hardwareService.discoverDevices('terminal')
            console.log('📱 Readers found:', readers.length, readers)

            if (readers.length === 0) {
                setStep('error')
                setStatusMessage('Failed to initialize phone NFC reader. Please check permissions.')
                console.error('❌ Failed to initialize internal NFC reader')
                return
            }

            setStatusMessage('Phone NFC ready')
            console.log('✅ Phone NFC reader ready, connecting...')

            // Auto-connect to first reader after a moment
            setTimeout(() => connectToReader(readers[0]), 1500)

        } catch (error) {
            console.error('❌ Payment flow error:', error)
            setStep('error')
            setStatusMessage(error instanceof Error ? error.message : 'Payment failed')
        }
    }

    const connectToReader = async (reader: any) => {
        try {
            // Step 3: Connect to phone's NFC reader
            setStep('connecting')
            setStatusMessage('Activating NFC reader...')
            console.log('🔌 Connecting to reader:', reader.id)

            const connectResult = await hardwareService.connectToTerminal(reader.id)
            console.log('✅ Connected to reader:', connectResult)

            // Step 4: Collect payment with status callback for real-time updates
            setStep('processing')
            setStatusMessage('Waiting for card tap...')
            console.log('💳 Starting payment collection for $' + amount)

            const paymentResult = await hardwareService.collectTerminalPayment(
                amount,
                (status, message) => {
                    // Update UI based on SDK events
                    console.log('📊 Payment status update:', status, message)
                    setStatusMessage(message)
                }
            )
            console.log('✅ Payment collected:', paymentResult)

            // Success!
            setStep('success')
            setStatusMessage(`Payment successful!${paymentResult.simulated ? ' (simulated)' : ''}`)

            // Auto-close after success
            setTimeout(() => {
                onSuccess()
            }, 1500)

        } catch (error) {
            console.error('❌ Connection/payment error:', error)
            setStep('error')
            setStatusMessage(error instanceof Error ? error.message : 'Payment failed')
        }
    }

    const getStepIcon = () => {
        switch (step) {
            case 'success':
                return (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                        <svg
                            className="h-8 w-8 text-success"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                )
            case 'error':
                return (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
                        <X className="h-8 w-8 text-destructive" />
                    </div>
                )
            case 'processing':
                return (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 animate-pulse">
                        <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )
            default:
                return (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4">
                <div className="rounded-xl border bg-card p-8 shadow-lg">
                    <div className="flex flex-col items-center gap-6 text-center">
                        {getStepIcon()}

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">
                                {step === 'success' ? 'Payment Successful!' : `$${amount.toFixed(2)}`}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {statusMessage}
                            </p>
                        </div>

                        {step === 'error' && (
                            <div className="flex gap-3 w-full">
                                <Button
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={startPaymentFlow}
                                >
                                    Retry
                                </Button>
                            </div>
                        )}

                        {(step === 'initializing' || step === 'discovering' || step === 'connecting') && (
                            <Button
                                variant="ghost"
                                onClick={onCancel}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
