import * as React from "react"
import { ChevronLeft, Play, Square, Repeat, Trash2, Mic, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { OrderTabs } from "@/components/ui/order-tabs"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MUSIC_STYLES = [
    { id: "hip-hop", label: "Hip Hop" },
    { id: "dnb", label: "Drum & Bass" },
    { id: "techno", label: "Techno" },
    { id: "house", label: "House" },
]

// Virtual Synth Engine
class SimpleSynth {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
    }

    play(type: 'kick' | 'snare' | 'hat' | 'perc') {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        if (type === 'kick') {
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.3);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'snare') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(120, now);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'hat') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(10000, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else {
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        }
    }
}

const synth = new SimpleSynth();

const SAMPLE_GROUPS: Record<string, { id: string; name: string; type: any; tone: any; colorClass: string; activeColor: string }[]> = {
    "hip-hop": [
        { id: "hh-k1", name: "Kick 808", type: 'kick', tone: 'indigo', colorClass: 'bg-indigo-500/20', activeColor: 'bg-indigo-500' },
        { id: "hh-k2", name: "Deep Kick", type: 'kick', tone: 'indigo', colorClass: 'bg-indigo-500/20', activeColor: 'bg-indigo-500' },
        { id: "hh-s1", name: "Snare Soft", type: 'snare', tone: 'purple', colorClass: 'bg-purple-500/20', activeColor: 'bg-purple-500' },
        { id: "hh-s2", name: "Clap Snare", type: 'snare', tone: 'purple', colorClass: 'bg-purple-500/20', activeColor: 'bg-purple-500' },
        { id: "hh-h1", name: "T Hat", type: 'hat', tone: 'sky', colorClass: 'bg-sky-400/20', activeColor: 'bg-sky-400' },
        { id: "hh-h2", name: "O Hat", type: 'hat', tone: 'sky', colorClass: 'bg-sky-400/20', activeColor: 'bg-sky-400' },
        { id: "hh-p1", name: "Scratch", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
        { id: "hh-p2", name: "Vinyl", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
        { id: "hh-p3", name: "Shaker", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
    ],
    "dnb": [
        { id: "dnb-k1", name: "BD 1", type: 'kick', tone: 'rose', colorClass: 'bg-rose-500/20', activeColor: 'bg-rose-500' },
        { id: "dnb-s1", name: "SD 1", type: 'snare', tone: 'orange', colorClass: 'bg-orange-500/20', activeColor: 'bg-orange-500' },
        { id: "dnb-s2", name: "SD 2", type: 'snare', tone: 'orange', colorClass: 'bg-orange-500/20', activeColor: 'bg-orange-500' },
        { id: "dnb-h1", name: "Hat 1", type: 'hat', tone: 'amber', colorClass: 'bg-amber-400/20', activeColor: 'bg-amber-400' },
        { id: "dnb-h2", name: "Hat 2", type: 'hat', tone: 'amber', colorClass: 'bg-amber-400/20', activeColor: 'bg-amber-400' },
        { id: "dnb-p1", name: "Bongo 1", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "dnb-p2", name: "Bongo 2", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "dnb-p3", name: "Ting", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "dnb-p4", name: "Snap", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
    ],
    "techno": [
        { id: "t-k1", name: "BD 909", type: 'kick', tone: 'slate', colorClass: 'bg-slate-500/20', activeColor: 'bg-slate-500' },
        { id: "t-k2", name: "BD HARD", type: 'kick', tone: 'slate', colorClass: 'bg-slate-500/20', activeColor: 'bg-slate-500' },
        { id: "t-s1", name: "RIM", type: 'snare', tone: 'blue', colorClass: 'bg-blue-500/20', activeColor: 'bg-blue-500' },
        { id: "t-h1", name: "Hat CL", type: 'hat', tone: 'sky', colorClass: 'bg-sky-500/20', activeColor: 'bg-sky-500' },
        { id: "t-h2", name: "Hat OP", type: 'hat', tone: 'sky', colorClass: 'bg-sky-500/20', activeColor: 'bg-sky-500' },
        { id: "t-p1", name: "Clang", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
        { id: "t-p2", name: "Zap", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
        { id: "t-p3", name: "Metal", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
        { id: "t-p4", name: "Click", type: 'perc', tone: 'teal', colorClass: 'bg-teal-500/20', activeColor: 'bg-teal-500' },
    ],
    "house": [
        { id: "h-k1", name: "K 1", type: 'kick', tone: 'amber', colorClass: 'bg-amber-500/20', activeColor: 'bg-amber-500' },
        { id: "h-s1", name: "Clap", type: 'snare', tone: 'orange', colorClass: 'bg-orange-500/20', activeColor: 'bg-orange-500' },
        { id: "h-s2", name: "Snap", type: 'snare', tone: 'orange', colorClass: 'bg-orange-500/20', activeColor: 'bg-orange-500' },
        { id: "h-h1", name: "Hat", type: 'hat', tone: 'yellow', colorClass: 'bg-yellow-400/20', activeColor: 'bg-yellow-400' },
        { id: "h-h2", name: "Ride", type: 'hat', tone: 'yellow', colorClass: 'bg-yellow-400/20', activeColor: 'bg-yellow-400' },
        { id: "h-p1", name: "Bell", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "h-p2", name: "Tom", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "h-p3", name: "Wood", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
        { id: "h-p4", name: "Shaker", type: 'perc', tone: 'lime', colorClass: 'bg-lime-500/20', activeColor: 'bg-lime-500' },
    ],
}

const createEmptyGrid = () => {
    const grid: Record<string, boolean[]> = {}
    Object.values(SAMPLE_GROUPS).flat().forEach(s => {
        grid[s.id] = new Array(64).fill(false)
    })
    return grid
}

export default function BeatMachine({ onBack }: { onBack?: () => void }) {
    const [activeStyle, setActiveStyle] = React.useState("hip-hop")
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [seqLength, setSeqLength] = React.useState(16)
    const [currentStep, setCurrentStep] = React.useState(0)
    const [sequenceGrid, setSequenceGrid] = React.useState<Record<string, boolean[]>>(createEmptyGrid())

    const currentStyleSamples = SAMPLE_GROUPS[activeStyle] || []

    React.useEffect(() => {
        if (!isPlaying) {
            setCurrentStep(0)
            return
        }
        synth.init()
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const nextStep = (prev + 1) % seqLength
                currentStyleSamples.forEach(s => {
                    if (sequenceGrid[s.id][nextStep]) {
                        synth.play(s.type)
                    }
                })
                return nextStep
            })
        }, 125)
        return () => clearInterval(interval)
    }, [isPlaying, seqLength, sequenceGrid, currentStyleSamples])

    const toggleNote = (sampleId: string, stepIndex: number) => {
        setSequenceGrid(prev => {
            const newGrid = { ...prev }
            const newSteps = [...newGrid[sampleId]]
            newSteps[stepIndex] = !newSteps[stepIndex]
            newGrid[sampleId] = newSteps
            return newGrid
        })
        if (!isPlaying) {
            const s = currentStyleSamples.find(x => x.id === sampleId)
            if (s) synth.play(s.type)
        }
    }

    const handlePadTap = (id: string) => {
        synth.init()
        const s = currentStyleSamples.find(x => x.id === id)
        if (s) synth.play(s.type)
        if (isPlaying) {
            toggleNote(id, currentStep)
        }
    }

    return (
        <div className="flex h-full min-h-full flex-col bg-background text-foreground overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-10 pb-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-xl shrink-0">
                <button onClick={onBack} className="flex items-center gap-2 group">
                    <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <SectionTitle interactive>Beat Machine</SectionTitle>
                </button>
                <div className="flex items-center gap-2">
                    <Button
                        variant={isPlaying ? "destructive" : "default"}
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                {/* Styles */}
                <div className="px-6 pt-4">
                    <OrderTabs
                        tabs={MUSIC_STYLES.map(s => ({
                            id: s.id,
                            label: s.label,
                            count: SAMPLE_GROUPS[s.id]?.reduce((acc, sample) => acc + (sequenceGrid[sample.id]?.filter(Boolean).length || 0), 0) || undefined
                        }))}
                        value={activeStyle}
                        onValueChange={setActiveStyle}
                        showAddButton={false}
                    />
                </div>

                {/* Resolution Bar - Moved here */}
                <div className="px-6 pt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">Sequence Resolution</span>
                    <div className="flex gap-4">
                        {[16, 32, 64].map(l => (
                            <button
                                key={l}
                                onClick={() => {
                                    setSeqLength(l)
                                    setCurrentStep(0)
                                }}
                                className={cn("text-[11px] font-bold transition-colors", seqLength === l ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                            >
                                {l} STPS
                            </button>
                        ))}
                    </div>
                </div>

                {/* HORIZONTALLY SCROLLABLE MULTI-TRACK GRID */}
                <div className="px-4 pt-6">
                    <div className="bg-muted/20 rounded-[28px] border border-white/5 p-4 flex flex-col gap-3 shadow-inner overflow-x-auto no-scrollbar">
                        <div className="min-w-fit flex flex-col gap-3">
                            {currentStyleSamples.map((sample) => (
                                <div key={sample.id} className="flex items-center gap-3">
                                    <div className={cn("h-6 w-1 rounded-full shrink-0", sample.activeColor)} />
                                    <div className="flex items-center gap-1.5">
                                        {Array.from({ length: seqLength }).map((_, stepIdx) => {
                                            const isNoteActive = sequenceGrid[sample.id][stepIdx]
                                            const isCurrentStep = currentStep === stepIdx && isPlaying
                                            return (
                                                <button
                                                    key={stepIdx}
                                                    onClick={() => toggleNote(sample.id, stepIdx)}
                                                    className={cn(
                                                        "w-5 h-5 rounded-full transition-all duration-150 flex-shrink-0",
                                                        isNoteActive ? sample.activeColor : "bg-white/5",
                                                        isCurrentStep ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 z-10" : ""
                                                    )}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 text-[8px] text-center text-muted-foreground/40 uppercase tracking-[0.2em]">← Scroll for more steps →</div>
                </div>

                {/* SAMPLE PADS - 3x3 GRID */}
                <div className="px-4 pt-8 grid grid-cols-3 gap-3">
                    {currentStyleSamples.map((sample) => {
                        const notesCount = sequenceGrid[sample.id]?.filter(Boolean).length || 0
                        return (
                            <OrderProductTile
                                key={sample.id}
                                name={sample.name}
                                // price removed for clean look
                                tone={notesCount > 0 ? sample.tone : "neutral"}
                                interactive
                                count={notesCount || undefined}
                                onPress={() => handlePadTap(sample.id)}
                                className="aspect-square"
                            />
                        )
                    })}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="fixed bottom-8 left-6 right-6 p-4 rounded-[32px] bg-background/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-between z-50">
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">
                        <span>Playback Progress</span>
                        <span className="text-primary">{currentStep + 1} / {seqLength}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary shadow-[0_0_10px_primary] transition-all duration-300"
                            style={{ width: `${(currentStep / (seqLength - 1)) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 ml-6 pl-4">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground/50 hover:text-destructive" onClick={() => setSequenceGrid(createEmptyGrid())}>
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    )
}
