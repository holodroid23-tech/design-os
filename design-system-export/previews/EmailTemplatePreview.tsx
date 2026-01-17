import { Button } from "../components/ui/button"
import { Lock, Package, ChevronRight } from "lucide-react"

export function EmailTemplatePreview() {
    return (
        <div className="w-full bg-[#0c141c] text-white font-sans flex items-center justify-center p-4 rounded-xl">
            <div className="w-full max-w-[600px] bg-[#0c141c] overflow-hidden">
                {/* Header Image */}
                <div className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c141c] via-transparent to-transparent z-10" />
                    {/* Placeholder for the pig image - using a colored placeholder if actual image not available, 
                       but since user provided an image in the prompt context (visual), I will use a placeholder 
                       that represents it or a similar emotional image if I can't access the blob directly. 
                       I'll use a commercially free unsplash image of a pig if possible, or a generic placeholder.
                   */}
                    <img
                        src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1000&auto=format&fit=crop"
                        alt="Pig with tablet"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="px-8 pb-12 text-center">
                    <h1 className="text-3xl font-bold mb-4 tracking-tight">Welcome to comPOSt</h1>

                    <p className="text-white/70 leading-relaxed mb-12 text-[15px] max-w-md mx-auto">
                        Thanks for choosing our POS system to power your daily grind. We're excited to help you serve the best coffee in town. Here is everything you need to get your shop running efficiently.
                    </p>

                    {/* Next Steps Section */}
                    <div className="text-left mb-8">
                        <h2 className="text-lg font-bold mb-4">Your Next Steps</h2>

                        <div className="space-y-3">
                            {/* Step 1: Set Admin PIN */}
                            <div className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors cursor-pointer">
                                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Lock className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white truncate">Set Admin PIN</h3>
                                    <p className="text-sm text-white/50 truncate">Secure your manager access</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-white transition-colors" />
                            </div>

                            {/* Step 2: Add Inventory */}
                            <div className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors cursor-pointer">
                                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Package className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white truncate">Add Inventory</h3>
                                    <p className="text-sm text-white/50 truncate">Create your first product</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full mb-12" size="lg">
                        Launch App
                    </Button>

                    {/* Footer */}
                    <p className="text-xs text-white/30 max-w-xs mx-auto">
                        You received this email because you signed up for comPOSt POS.
                    </p>
                </div>
            </div>
        </div>
    )
}
