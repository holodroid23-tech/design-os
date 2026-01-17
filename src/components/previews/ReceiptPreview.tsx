import { Coffee, QrCode } from "lucide-react"

export function ReceiptPreview() {
    return (
        <div className="w-full flex justify-center p-8 bg-background rounded-xl">
            <div className="relative w-full max-w-[340px] bg-white text-black shadow-xl drop-shadow-xl filter">
                {/* Main Receipt Content */}
                <div className="p-8 pb-4 flex flex-col items-center">

                    {/* Logo Placeholder */}
                    <div className="mb-6 h-16 w-16 rounded-full bg-black flex items-center justify-center">
                        <Coffee className="h-8 w-8 text-white relative top-[-2px]" />
                        <div className="absolute w-6 h-0.5 bg-white mt-4 ml-1"></div>
                    </div>

                    {/* Shop Name */}
                    <h1 className="text-3xl font-serif font-bold tracking-tight mb-2">comPOSt</h1>

                    {/* Address Detail */}
                    <div className="text-center text-xs font-mono space-y-1 opacity-80 mb-6">
                        <p>123 Espresso Lane</p>
                        <p>Seattle, WA 98101</p>
                        <p>Tel: (206) 555-0123</p>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-b border-dashed border-black/20 mb-6"></div>

                    {/* Receipt Details */}
                    <div className="w-full text-[10px] font-mono uppercase tracking-wide space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span className="text-black/60">One Receipt #</span>
                            <span className="font-bold">ORD-2023-892</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black/60">Date</span>
                            <span className="font-bold">Oct 24, 2023 09:41 AM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black/60">Cashier</span>
                            <span className="font-bold">Sarah J.</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-b border-dashed border-black/20 mb-6"></div>

                    {/* Items */}
                    <div className="w-full font-mono text-sm space-y-3 mb-6">
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold">Latte (Large)</span>
                            <span>$6.50</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold">Croissant</span>
                            <span>$4.00</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold">Avocado Toast</span>
                            <span>$12.00</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-b border-dashed border-black/20 mb-6"></div>

                    {/* Totals */}
                    <div className="w-full font-mono space-y-2 mb-8">
                        <div className="flex justify-between text-xs">
                            <span className="text-black/60">Subtotal</span>
                            <span>$22.50</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-black/60">Tax (8.0%)</span>
                            <span>$1.80</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold mt-4">
                            <span>TOTAL</span>
                            <span>$24.30</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-b border-dashed border-black/20 mb-8"></div>

                    {/* Footer Message */}
                    <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-center mb-8">
                        Thank you for visiting!
                    </div>

                    {/* QR Placeholder */}
                    <div className="w-32 h-32 border-2 border-black p-2 mb-8">
                        {/* Custom QR-like pattern using simple blocks */}
                        <div className="w-full h-full relative flex flex-wrap gap-1 content-center justify-center bg-white p-1">
                            {/* Just a visual representation of a QR code */}
                            <div className="absolute top-0 left-0 w-7 h-7 border-4 border-black"></div>
                            <div className="absolute top-2 left-2 w-3 h-3 bg-black"></div>

                            <div className="absolute top-0 right-0 w-7 h-7 border-4 border-black"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 bg-black"></div>

                            <div className="absolute bottom-0 left-0 w-7 h-7 border-4 border-black"></div>
                            <div className="absolute bottom-2 left-2 w-3 h-3 bg-black"></div>

                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-black"></div>
                            <div className="absolute bottom-6 right-1 w-3 h-3 bg-black"></div>
                            <div className="absolute top-8 left-9 w-3 h-3 bg-black"></div>
                            <div className="absolute bottom-8 right-6 w-2 h-2 bg-black"></div>
                            <div className="absolute top-10 right-10 w-4 h-4 bg-black"></div>

                            <QrCode className="h-full w-full opacity-10" />
                        </div>
                    </div>
                </div>

                {/* Zigzag Bottom */}
                <div
                    className="absolute left-0 bottom-[-12px] w-full h-[12px] bg-[linear-gradient(-45deg,transparent_8px,white_8px),linear-gradient(45deg,transparent_8px,white_8px)] bg-[length:16px_16px] bg-repeat-x"
                />
            </div>
        </div>
    )
}
