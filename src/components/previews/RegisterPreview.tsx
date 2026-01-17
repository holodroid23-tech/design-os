import { Plus, Hand } from 'lucide-react'

export default function RegisterPreview() {
    return (
        <div className="flex flex-col h-full w-full bg-background p-6 space-y-6">
            {/* Header Area */}
            <div className="flex items-center gap-3 w-full">
                {/* Add Order Button */}
                <button className="h-10 w-10 rounded-full bg-layer-3 border border-border flex items-center justify-center">
                    <Plus className="h-[18px] w-[18px]" />
                </button>
                {/* Active Order Tab */}
                <button className="bg-primary text-primary-foreground h-10 px-4 rounded-full font-medium text-sm">
                    Order 1
                </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-3 gap-3 p-4">
                {/* Custom Item Card */}
                <button className="aspect-square rounded-2xl bg-layer-1 border-2 border-border flex flex-col items-center justify-center text-foreground hover:bg-layer-2">
                    <Plus className="h-7 w-7 mb-1.5 text-primary" />
                    <span className="font-semibold text-sm">Custom item</span>
                </button>

                {/* Cappuccino Card */}
                <button className="aspect-square rounded-2xl bg-blue-500 flex flex-col items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <span className="font-semibold">Cappuccino</span>
                    <span className="font-mono text-sm opacity-90">$4.50</span>
                </button>

                {/* Latte Card */}
                <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1588483977959-12c81da0d015?q=80&w=1000&auto=format&fit=crop"
                        alt="Latte"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="bg-black/40 absolute inset-0" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <span className="font-semibold">Latte</span>
                        <span className="font-mono text-sm opacity-90">$4.75</span>
                    </div>
                </div>

                {/* Espresso Card */}
                <button className="aspect-square rounded-2xl bg-orange-500 flex flex-col items-center justify-center text-white hover:bg-orange-600 transition-colors">
                    <span className="font-semibold">Espresso</span>
                    <span className="font-mono text-sm opacity-90">$3.00</span>
                </button>

                {/* Taro Latte Card */}
                <button className="aspect-square rounded-2xl bg-purple-500 flex flex-col items-center justify-center text-white hover:bg-purple-600 transition-colors">
                    <span className="font-semibold">Taro Latte</span>
                    <span className="font-mono text-sm opacity-90">$5.50</span>
                </button>

                {/* Americano Card */}
                <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1514432324607-a09d72479db1?q=80&w=1000&auto=format&fit=crop"
                        alt="Americano"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="bg-black/40 absolute inset-0" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <span className="font-semibold">Americano</span>
                        <span className="font-mono text-sm opacity-90">$3.50</span>
                    </div>
                </div>

                {/* Mocha Card */}
                <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop"
                        alt="Mocha"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="bg-black/40 absolute inset-0" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <span className="font-semibold">Mocha</span>
                        <span className="font-mono text-sm opacity-90">$5.00</span>
                    </div>
                </div>

                {/* Flat White Card */}
                <button className="aspect-square rounded-2xl bg-amber-600 flex flex-col items-center justify-center text-white hover:bg-amber-700 transition-colors">
                    <span className="font-semibold">Flat White</span>
                    <span className="font-mono text-sm opacity-90">$4.25</span>
                </button>

                {/* Iced Latte Card */}
                <button className="aspect-square rounded-2xl bg-cyan-500 flex flex-col items-center justify-center text-white hover:bg-cyan-600 transition-colors">
                    <span className="font-semibold">Iced Latte</span>
                    <span className="font-mono text-sm opacity-90">$4.75</span>
                </button>
            </div>

            {/* Welcome State */}
            <div className="flex flex-col items-center mt-12 px-8 text-center">
                <div className="h-16 w-16 bg-layer-2 rounded-full flex items-center justify-center mb-6">
                    <Hand className="h-8 w-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">Welcome to your new shop!</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Tap any item to start your first order or go to Settings to{" "}
                    <span className="text-blue-400 cursor-pointer hover:underline">manage your inventory.</span>
                </p>
            </div>
        </div>
    )
}
