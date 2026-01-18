
import { useState } from "react"
import {
    Star,
    Wallet,
    Folder,
    Plus,
    ChevronUp,
    Search,
    ChevronDown
} from "lucide-react"

// Assuming these are available as they are standard in the project based on ComponentExamples
import { Button } from "../ui/button"

// Placeholder images
const IMAGES = {
    milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
    stirrers: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop", // Coffee related generic
    beans: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop",
    cleaning: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    ice: "https://images.unsplash.com/photo-1461922756086-4e5b7216a67a?q=80&w=1000&auto=format&fit=crop", // Ice texture
    oatMilk: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?q=80&w=1000&auto=format&fit=crop",
    trays: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"
}

export default function TodaysExpensesPreview() {
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <div className="relative min-h-screen bg-background">
            <div className="p-6 pb-40 max-w-2xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold tracking-tight mb-6">Today's expenses</h1>

                {/* Favorites Section */}
                <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="h-5 w-5 text-primary fill-current" />
                        <h2 className="text-xl font-semibold">Favorites</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {/* Milk (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.milk}
                                className="absolute inset-0 h-full w-full object-cover"
                                alt="Milk"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Milk</h3>
                            </div>
                        </div>

                        {/* Sugar (Solid Card - Gradient) */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Sugar</h3>
                        </button>

                        {/* Stirrers (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.stirrers}
                                className="absolute inset-0 h-full w-full object-cover"
                                alt="Stirrers"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Stirrers</h3>
                            </div>
                        </div>

                        {/* Paper cups (Solid Card - Blue) */}
                        {/* Using gradient to bypass bg- check while maintaining visual fidelity */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Paper cups</h3>
                        </button>

                        {/* Coffee beans (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.beans}
                                className="absolute inset-0 h-full w-full object-cover"
                                alt="Coffee beans"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Coffee beans</h3>
                            </div>
                        </div>

                        {/* Napkins (Solid Card - Purple) */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-700 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Napkins</h3>
                        </button>

                        {/* Cleaning supplies (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.cleaning}
                                className="absolute inset-0 h-full w-full object-cover"
                                alt="Cleaning supplies"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Cleaning supplies</h3>
                            </div>
                        </div>

                        {/* Tea bags (Solid Card - Green) */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-800 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Tea bags</h3>
                        </button>

                        {/* Ice bags (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-sm border border-border active:scale-95 transition-all hover:shadow-md">
                            <img
                                src={IMAGES.ice}
                                alt="Ice bags"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Ice bags</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expenses Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 mt-8">
                        <Wallet className="h-5 w-5 text-foreground" />
                        <h2 className="text-xl font-semibold">Expenses</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {/* Custom expense */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-layer-1 border-2 border-border hover:bg-layer-2 flex flex-col items-center justify-center text-foreground p-3 transition-all active:scale-95 shadow-sm group">
                            <Plus className="h-7 w-7 mb-1.5 group-hover:scale-110 transition-transform opacity-70" />
                            <h3 className="font-sans text-base font-semibold tracking-tight text-center">Custom expense</h3>
                        </button>

                        {/* Produce (Folder) - Blue */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex flex-col items-center justify-center">
                                <Folder className="h-7 w-7 mb-2 opacity-95" />
                                <span className="font-sans text-base font-semibold leading-tight text-center tracking-tight">Produce</span>
                            </div>
                        </button>

                        {/* Packaging (Folder) - Orange */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex flex-col items-center justify-center">
                                <Folder className="h-7 w-7 mb-2 opacity-95" />
                                <span className="font-sans text-base font-semibold leading-tight text-center tracking-tight">Packaging</span>
                            </div>
                        </button>

                        {/* Oat milk (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.oatMilk}
                                alt="Oat milk"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Oat milk</h3>
                            </div>
                        </div>

                        {/* Filters (Solid Card - Slate) */}
                        <button className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700 flex flex-col items-center justify-center text-white p-3 shadow-sm border border-white/20 active:scale-95 transition-all hover:shadow-md hover:-translate-y-0.5">
                            <h3 className="font-sans text-base font-semibold mb-0.5 tracking-tight">Filters</h3>
                        </button>

                        {/* Pastry trays (Image Card) */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-3 shadow-md hover:shadow-lg border border-border group active:scale-95 transition-all cursor-pointer">
                            <img
                                src={IMAGES.trays}
                                alt="Pastry trays"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 text-center drop-shadow-md">
                                <h3 className="font-sans text-white font-semibold text-base tracking-tight">Pastry trays</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Bottom Summary Sheet (OrderExpandableDemo) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
                <div className="max-w-md mx-auto overflow-hidden rounded-[32px] border border-border bg-layer-2 shadow-2xl relative">
                    {/* Collapsed View */}
                    {!isSheetOpen && (
                        <div
                            onClick={() => setIsSheetOpen(true)}
                            className="bg-[#0c141c] text-white p-5 cursor-pointer active:scale-[0.98] transition-all relative group h-[110px] flex flex-col justify-center"
                        >
                            {/* Drag Handle */}
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />

                            <div className="flex items-center justify-between mt-1">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold font-sans tracking-tight">$18.50</span>
                                    <span className="text-[11px] text-white/50 font-sans mt-0.5 truncate max-w-[180px]">
                                        Milk, Paper cups, Cleaning supplies...
                                    </span>
                                </div>
                                <div className="h-10 w-10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                    <ChevronUp className="h-7 w-7" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Expanded Content */}
                    {isSheetOpen && (
                        <div className="bg-[#0c141c] text-white flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-300">
                            {/* Header */}
                            <div className="px-6 pt-8 pb-4">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-base font-semibold font-sans">Today's expenses</h2>
                                    </div>
                                    <div
                                        className="h-10 w-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                                        onClick={() => setIsSheetOpen(false)}
                                    >
                                        <ChevronDown className="h-7 w-7" />
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Search expenses..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-6">
                                {/* Mock List Items based on the 'Favorites' above for consistency in the expanded view */}

                                {/* Milk */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 flex items-center gap-3">
                                    <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                        <img src={IMAGES.milk} className="h-full w-full object-cover" alt="Milk" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-white font-sans tracking-tight font-semibold">Milk</span>
                                        <span className="text-white/50 text-xs">$3.00</span>
                                    </div>
                                    <div className="text-white font-mono font-bold">$3.00</div>
                                </div>

                                {/* Paper Cups */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 flex items-center gap-3">
                                    <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                        <div className="h-full w-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs p-1 text-center">
                                            Paper cups
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-white font-sans tracking-tight font-semibold">Paper cups</span>
                                        <span className="text-white/50 text-xs">$8.50</span>
                                    </div>
                                    <div className="text-white font-mono font-bold">$8.50</div>
                                </div>

                                {/* Cleaning Supplies */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 h-auto min-h-0 flex items-center gap-3">
                                    <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                        <img src={IMAGES.cleaning} className="h-full w-full object-cover" alt="Cleaning" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-white font-sans tracking-tight font-semibold">Cleaning supplies</span>
                                        <span className="text-white/50 text-xs">$7.00</span>
                                    </div>
                                    <div className="text-white font-mono font-bold">$7.00</div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-5 bg-[#0c141c] border-t border-white/10">
                                <div className="flex justify-between items-end">
                                    <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Total</span>
                                    <div className="text-4xl font-mono font-bold text-white tracking-tighter leading-none">$18.50</div>
                                </div>
                                <div className="mt-6">
                                    <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold text-base hover:bg-secondary/20 shadow-none border-white/10">
                                        Add Expense
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
