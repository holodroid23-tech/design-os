import * as React from "react"
import { Play, Square, ChevronDown, Eraser, Timer, TimerOff } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { OrderTabs } from "@/components/ui/order-tabs"
import { OrderProductTile } from "@/components/ui/order-product-tile"
import { SlidingSelector } from "@/components/ui/sliding-selector"
import { FloatingBottomBar } from "@/components/ui/floating-bottom-bar"
import { cn } from "@/lib/utils"

const MUSIC_STYLES = [
    { id: "hip-hop", label: "Hip Hop" },
    { id: "dnb", label: "Drum & Bass" },
    { id: "techno", label: "Techno" },
    { id: "house", label: "House" },
]

const STYLE_DEFAULTS: Record<string, number> = {
    "hip-hop": 90,
    "dnb": 175,
    "techno": 128,
    "house": 120,
}

const BPM_OPTIONS = [
    { value: 90, label: "90 BPM" },
    { value: 110, label: "110 BPM" },
    { value: 120, label: "120 BPM" },
    { value: 128, label: "128 BPM" },
    { value: 140, label: "140 BPM" },
    { value: 160, label: "160 BPM" },
    { value: 175, label: "175 BPM" },
]

// Advanced Synth Engine
class PrecisionSynth {
    public ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private limiter: DynamicsCompressorNode | null = null;

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.limiter = this.ctx.createDynamicsCompressor();
            this.limiter.threshold.setValueAtTime(-12, this.ctx.currentTime);
            this.limiter.knee.setValueAtTime(40, this.ctx.currentTime);
            this.limiter.ratio.setValueAtTime(12, this.ctx.currentTime);
            this.limiter.attack.setValueAtTime(0, this.ctx.currentTime);
            this.limiter.release.setValueAtTime(0.25, this.ctx.currentTime);

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

            this.limiter.connect(this.ctx.destination);
            this.masterGain.connect(this.limiter);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playMetronome(time: number, isDownbeat: boolean) {
        if (!this.ctx || !this.masterGain) return;
        // Metronome as a classic "Hi-Hat" click
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isDownbeat ? 12000 : 8000, time);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(isDownbeat ? 6000 : 4000, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.setTargetAtTime(0.2, time, 0.001);
        gain.gain.setTargetAtTime(0, time + 0.02, 0.01);

        osc.start(time);
        osc.stop(time + 0.1);
    }

    play(style: string, type: string, time?: number) {
        if (!this.ctx || !this.masterGain) return;
        const playTime = time ?? this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        gain.gain.setValueAtTime(0, playTime);
        gain.gain.setTargetAtTime(1, playTime, 0.002);

        if (type === 'kick') {
            const freq = style === 'hip-hop' ? 120 : style === 'techno' ? 180 : 150;
            osc.frequency.setValueAtTime(freq, playTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, playTime + 0.35);
            gain.gain.setTargetAtTime(0.01, playTime + 0.15, 0.05);
            if (style === 'techno') {
                osc.type = 'square';
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(400, playTime);
            }
            osc.start(playTime);
            osc.stop(playTime + 0.4);
        } else if (type === 'snare') {
            osc.type = style === 'techno' ? 'sawtooth' : 'square';
            osc.frequency.setValueAtTime(style === 'dnb' ? 220 : 180, playTime);
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, playTime);
            gain.gain.setTargetAtTime(0.01, playTime + 0.08, 0.03);
            osc.start(playTime);
            osc.stop(playTime + 0.2);
        } else if (type === 'hat') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(8000, playTime);
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(4000, playTime);
            gain.gain.setTargetAtTime(0.01, playTime + 0.03, 0.01);
            osc.start(playTime);
            osc.stop(playTime + 0.1);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, playTime);
            if (style === 'hip-hop') osc.frequency.exponentialRampToValueAtTime(300, playTime + 0.1);
            gain.gain.setTargetAtTime(0.01, playTime + 0.05, 0.02);
            osc.start(playTime);
            osc.stop(playTime + 0.15);
        }
    }
}

const synth = new PrecisionSynth();

const SAMPLE_GROUPS: Record<string, { id: string; name: string; type: string; tone: string; activeColor: string }[]> = {
    "hip-hop": [
        { id: "hh-k1", name: "Deep 808", type: 'kick', tone: 'indigo', activeColor: 'bg-indigo-500' },
        { id: "hh-k2", name: "Thump Kick", type: 'kick', tone: 'blue', activeColor: 'bg-blue-500' },
        { id: "hh-s1", name: "Dry Snare", type: 'snare', tone: 'purple', activeColor: 'bg-purple-500' },
        { id: "hh-s2", name: "Rim Snare", type: 'snare', tone: 'pink', activeColor: 'bg-pink-500' },
        { id: "hh-h1", name: "Crisp Hat", type: 'hat', tone: 'sky', activeColor: 'bg-sky-400' },
        { id: "hh-h2", name: "Vinyl Hat", type: 'hat', tone: 'teal', activeColor: 'bg-teal-500' },
        { id: "hh-p1", name: "Record Scratch", type: 'perc', tone: 'slate', activeColor: 'bg-slate-500' },
        { id: "hh-p2", name: "Clap", type: 'perc', tone: 'amber', activeColor: 'bg-amber-500' },
        { id: "hh-p3", name: "Shaker", type: 'perc', tone: 'lime', activeColor: 'bg-lime-500' },
    ],
    "dnb": [
        { id: "dnb-k1", name: "Fast Kick", type: 'kick', tone: 'red', activeColor: 'bg-red-500' },
        { id: "dnb-k2", name: "Sub Punch", type: 'kick', tone: 'orange', activeColor: 'bg-orange-500' },
        { id: "dnb-s1", name: "Amen Snare", type: 'snare', tone: 'amber', activeColor: 'bg-amber-500' },
        { id: "dnb-s2", name: "Ghost Snare", type: 'snare', tone: 'lime', activeColor: 'bg-lime-500' },
        { id: "dnb-h1", name: "Rushing Hat", type: 'hat', tone: 'green', activeColor: 'bg-green-500' },
        { id: "dnb-h2", name: "Edge Hat", type: 'hat', tone: 'teal', activeColor: 'bg-teal-500' },
        { id: "dnb-p1", name: "Break Rim", type: 'perc', tone: 'sky', activeColor: 'bg-sky-400' },
        { id: "dnb-p2", name: "Fast Click", type: 'perc', tone: 'blue', activeColor: 'bg-blue-500' },
        { id: "dnb-p3", name: "Clave Roll", type: 'perc', tone: 'purple', activeColor: 'bg-purple-500' },
    ],
    "techno": [
        { id: "t-k1", name: "Acid Kick", type: 'kick', tone: 'slate', activeColor: 'bg-slate-500' },
        { id: "t-k2", name: "Industrial", type: 'kick', tone: 'blue', activeColor: 'bg-blue-500' },
        { id: "t-s1", name: "White Snare", type: 'snare', tone: 'indigo', activeColor: 'bg-indigo-500' },
        { id: "t-s2", name: "Noise Hit", type: 'snare', tone: 'purple', activeColor: 'bg-purple-500' },
        { id: "t-h1", name: "Open Metal", type: 'hat', tone: 'pink', activeColor: 'bg-pink-500' },
        { id: "t-h2", name: "Closed Run", type: 'hat', tone: 'sky', activeColor: 'bg-sky-500' },
        { id: "t-p1", name: "Saw Perc", type: 'perc', tone: 'teal', activeColor: 'bg-teal-500' },
        { id: "t-p2", name: "Zap Box", type: 'perc', tone: 'green', activeColor: 'bg-green-500' },
        { id: "t-p3", name: "Static", type: 'perc', tone: 'lime', activeColor: 'bg-lime-500' },
    ],
    "house": [
        { id: "h-k1", name: "Club Kick", type: 'kick', tone: 'amber', activeColor: 'bg-amber-500' },
        { id: "h-k2", name: "Round Kick", type: 'kick', tone: 'orange', activeColor: 'bg-orange-500' },
        { id: "h-s1", name: "909 Clap", type: 'snare', tone: 'red', activeColor: 'bg-red-500' },
        { id: "h-s2", name: "Disco Snare", type: 'snare', tone: 'pink', activeColor: 'bg-pink-500' },
        { id: "h-h1", name: "Bright Hat", type: 'hat', tone: 'yellow', activeColor: 'bg-yellow-400' },
        { id: "h-h2", name: "Air Hat", type: 'hat', tone: 'lime', activeColor: 'bg-lime-500' },
        { id: "h-p1", name: "Agogo", type: 'perc', tone: 'green', activeColor: 'bg-green-500' },
        { id: "h-p2", name: "Woodblock", type: 'perc', tone: 'teal', activeColor: 'bg-teal-500' },
        { id: "h-p3", name: "Cowbell", type: 'perc', tone: 'sky', activeColor: 'bg-sky-400' },
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
    const [isMetronomeEnabled, setIsMetronomeEnabled] = React.useState(true)
    const [isCountingIn, setIsCountingIn] = React.useState(false)
    const [countInBeat, setCountInBeat] = React.useState(0)
    const [seqLength, setSeqLength] = React.useState(16)
    const [tempo, setTempo] = React.useState(90)
    const [hasManualTempo, setHasManualTempo] = React.useState(false)
    const [currentStep, setCurrentStep] = React.useState(0)
    const [sequenceGrid, setSequenceGrid] = React.useState<Record<string, boolean[]>>(createEmptyGrid())
    const [mutedTracks, setMutedTracks] = React.useState<Record<string, boolean>>({})
    const [isBpmOpen, setIsBpmOpen] = React.useState(false)

    const [isPainting, setIsPainting] = React.useState(false)
    const [paintValue, setPaintValue] = React.useState(true)

    const currentStyleSamples = SAMPLE_GROUPS[activeStyle] || []

    const stateRef = React.useRef({
        isPlaying,
        isCountingIn,
        seqLength,
        sequenceGrid,
        mutedTracks,
        currentStyleSamples,
        currentStep: 0,
        countInStep: 0,
        nextNoteTime: 0,
        tempo,
        activeStyle,
        isMetronomeEnabled
    })

    const syncToState = React.useCallback((p: boolean, c: boolean) => {
        setIsPlaying(p)
        setIsCountingIn(c)
    }, [])

    React.useEffect(() => {
        if (!hasManualTempo) setTempo(STYLE_DEFAULTS[activeStyle] || 120)
    }, [activeStyle, hasManualTempo])

    React.useEffect(() => {
        stateRef.current = {
            ...stateRef.current,
            isPlaying,
            isCountingIn,
            seqLength,
            sequenceGrid,
            mutedTracks,
            currentStyleSamples,
            tempo,
            activeStyle,
            isMetronomeEnabled
        }
    }, [isPlaying, isCountingIn, seqLength, sequenceGrid, mutedTracks, currentStyleSamples, tempo, activeStyle, isMetronomeEnabled])

    const scheduler = () => {
        if (!synth.ctx) return

        const scheduleAheadTime = 0.1

        while (stateRef.current.nextNoteTime < synth.ctx.currentTime + scheduleAheadTime) {
            // --- COUNT IN LOGIC ---
            if (stateRef.current.isCountingIn) {
                if (stateRef.current.countInStep % 4 === 0) {
                    synth.playMetronome(stateRef.current.nextNoteTime, stateRef.current.countInStep === 0)
                }

                stateRef.current.nextNoteTime += 60.0 / stateRef.current.tempo / 4.0
                stateRef.current.countInStep++

                if (stateRef.current.countInStep >= 16) {
                    stateRef.current.isCountingIn = false
                    stateRef.current.isPlaying = true
                    stateRef.current.currentStep = 0
                    // Bridge to sequence visually
                    setTimeout(() => syncToState(true, false), 0)
                }
            }
            // --- NORMAL PLAYBACK ---
            else if (stateRef.current.isPlaying) {
                const stepToSchedule = stateRef.current.currentStep

                if (stateRef.current.isMetronomeEnabled && stepToSchedule % 4 === 0) {
                    synth.playMetronome(stateRef.current.nextNoteTime, stepToSchedule === 0)
                }

                stateRef.current.currentStyleSamples.forEach(s => {
                    if (stateRef.current.sequenceGrid[s.id][stepToSchedule] && !stateRef.current.mutedTracks[s.id]) {
                        synth.play(stateRef.current.activeStyle, s.type, stateRef.current.nextNoteTime)
                    }
                })

                stateRef.current.nextNoteTime += 60.0 / stateRef.current.tempo / 4.0
                stateRef.current.currentStep = (stateRef.current.currentStep + 1) % stateRef.current.seqLength
            } else {
                // If stopped during loop
                return
            }
        }

        (window as any)._beatMachineTimer = setTimeout(scheduler, 25)
    }

    React.useEffect(() => {
        let rafId: number
        const updateVisuals = () => {
            if (stateRef.current.isCountingIn) {
                setIsCountingIn(true)
                setCountInBeat(Math.floor(stateRef.current.countInStep / 4))
            } else {
                setIsCountingIn(false)
                if (stateRef.current.isPlaying) {
                    setIsPlaying(true)
                    setCurrentStep(stateRef.current.currentStep)
                }
            }
            rafId = requestAnimationFrame(updateVisuals)
        }
        rafId = requestAnimationFrame(updateVisuals)
        return () => cancelAnimationFrame(rafId)
    }, [])

    const handleTogglePlay = () => {
        if (isPlaying || isCountingIn) {
            clearTimeout((window as any)._beatMachineTimer)
            setIsPlaying(false)
            setIsCountingIn(false)
            setCurrentStep(0)
            stateRef.current.currentStep = 0
            stateRef.current.isPlaying = false
            stateRef.current.isCountingIn = false
        } else {
            synth.init()
            stateRef.current.nextNoteTime = synth.ctx!.currentTime
            if (isMetronomeEnabled) {
                stateRef.current.countInStep = 0
                stateRef.current.isCountingIn = true
                setIsCountingIn(true)
            } else {
                stateRef.current.isPlaying = true
                setIsPlaying(true)
            }
            scheduler()
        }
    }

    const setNote = (sampleId: string, stepIndex: number, value: boolean) => {
        setSequenceGrid(prev => {
            const newGrid = { ...prev }
            const newSteps = [...newGrid[sampleId]]
            if (newSteps[stepIndex] === value) return prev
            newSteps[stepIndex] = value
            newGrid[sampleId] = newSteps
            return newGrid
        })
        if (!isPlaying && !isCountingIn && value) {
            synth.init()
            synth.play(activeStyle, currentStyleSamples.find(x => x.id === sampleId)!.type)
        }
    }

    const handleDotStart = (sampleId: string, stepIndex: number) => {
        const newValue = !sequenceGrid[sampleId][stepIndex]
        setIsPainting(true)
        setPaintValue(newValue)
        setNote(sampleId, stepIndex, newValue)
    }

    const handleDotEnter = (sampleId: string, stepIndex: number) => {
        if (isPainting) setNote(sampleId, stepIndex, paintValue)
    }

    const handlePadTap = (id: string) => {
        synth.init()
        synth.play(activeStyle, currentStyleSamples.find(x => x.id === id)!.type)
        if ((isPlaying || isCountingIn) && !mutedTracks[id]) setNote(id, currentStep, true)
    }

    const clearAll = () => setSequenceGrid(createEmptyGrid())

    return (
        <div
            className="flex h-full min-h-full flex-col bg-background text-foreground overflow-hidden"
            onMouseUp={() => setIsPainting(false)}
            onMouseLeave={() => setIsPainting(false)}
            onTouchEnd={() => setIsPainting(false)}
        >
            <PageHeader title="Beat Machine" onBack={onBack} />

            <div className="flex-1 overflow-y-auto no-scrollbar pb-60">
                <div className="px-4 pt-2">
                    <OrderTabs
                        tabs={MUSIC_STYLES.map(s => ({ id: s.id, label: s.label }))}
                        value={activeStyle}
                        onValueChange={setActiveStyle}
                        showAddButton={false}
                    />
                </div>

                <div className="px-4 pt-6">
                    <div className={cn(
                        "bg-muted/10 rounded-[28px] border p-4 flex flex-col gap-4 shadow-inner overflow-x-auto no-scrollbar transition-all duration-300 relative",
                        isCountingIn ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] scale-[1.01]" : "border-white/10"
                    )}>
                        {isCountingIn && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <div className="text-[64px] font-black text-primary animate-ping opacity-20">
                                    {4 - countInBeat}
                                </div>
                            </div>
                        )}
                        <div className="min-w-fit flex flex-col gap-4">
                            {currentStyleSamples.map((sample) => (
                                <div key={sample.id} className="flex items-center gap-3">
                                    <button
                                        onClick={() => setMutedTracks(prev => ({ ...prev, [sample.id]: !prev[sample.id] }))}
                                        className={cn(
                                            "h-3 w-3 rounded-full transition-all border shrink-0",
                                            mutedTracks[sample.id] ? "bg-muted-foreground/10 border-transparent shadow-none" : sample.activeColor + " border-white/10 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                                        )}
                                    />
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: seqLength }).map((_, stepIdx) => {
                                            const isNoteActive = sequenceGrid[sample.id][stepIdx]
                                            const isCurrentVisualStep = currentStep === stepIdx && isPlaying && !isCountingIn
                                            return (
                                                <button
                                                    key={stepIdx}
                                                    onMouseDown={() => handleDotStart(sample.id, stepIdx)}
                                                    onMouseEnter={() => handleDotEnter(sample.id, stepIdx)}
                                                    data-step={stepIdx}
                                                    data-sid={sample.id}
                                                    className={cn(
                                                        "w-6 h-6 rounded-full transition-all duration-75 flex-shrink-0 border touch-none",
                                                        isNoteActive ? sample.activeColor : "bg-white/5 border-transparent",
                                                        isCurrentVisualStep ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 z-10" : "border-white/5"
                                                    )}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-8 grid grid-cols-3 gap-3">
                    {currentStyleSamples.map((sample) => {
                        const notesCount = sequenceGrid[sample.id]?.filter(Boolean).length || 0
                        const isMuted = mutedTracks[sample.id]
                        const borderColor = `var(--color-tile-${sample.tone})`

                        return (
                            <OrderProductTile
                                key={sample.id}
                                name={sample.name}
                                tone="secondary"
                                interactive={!isMuted}
                                count={notesCount || undefined}
                                onPress={() => handlePadTap(sample.id)}
                                className={cn(
                                    "aspect-square !border !bg-transparent transition-all",
                                    notesCount > 0 ? "shadow-md scale-[1.02]" : "shadow-none",
                                    isMuted && "opacity-30 grayscale"
                                )}
                                style={{ borderColor }}
                            />
                        )
                    })}
                </div>
            </div>

            <FloatingBottomBar insetClassName="px-4 pb-[110px]" className="z-40">
                <div className="glass-floating-bar h-[72px] w-full rounded-[24px] flex items-center px-6 justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            {[16, 32, 64].map(l => (
                                <button key={l} onClick={() => { setSeqLength(l); stateRef.current.currentStep = 0; setCurrentStep(0); }} className={cn("text-[12px] font-black uppercase tracking-widest", seqLength === l ? "text-primary" : "text-onLayer-tertiary")}>{l}</button>
                            ))}
                        </div>
                        <div className="h-6 w-[1px] bg-white/10" />

                        <button
                            className="flex items-center gap-1 group outline-none"
                            onClick={() => setIsBpmOpen(true)}
                        >
                            <span className="text-[12px] font-black uppercase tracking-widest text-onLayer-tertiary group-hover:text-onLayer-secondary transition-colors">BPM: {tempo}</span>
                            <ChevronDown className="h-3 w-3 text-onLayer-tertiary" />
                        </button>

                        <div className="h-6 w-[1px] bg-white/10" />

                        <button
                            className={cn(
                                "p-2 transition-all outline-none",
                                isMetronomeEnabled ? "text-primary scale-110" : "text-onLayer-tertiary hover:text-onLayer-secondary"
                            )}
                            onClick={() => setIsMetronomeEnabled(!isMetronomeEnabled)}
                        >
                            {isMetronomeEnabled ? <Timer className="h-[18px] w-[18px]" /> : <TimerOff className="h-[18px] w-[18px]" />}
                        </button>

                        <button className="p-2 text-onLayer-tertiary hover:text-destructive transition-colors outline-none" onClick={clearAll}>
                            <Eraser className="h-[18px] w-[18px]" />
                        </button>
                    </div>

                    <button
                        className={cn(
                            "h-[48px] w-[48px] rounded-full flex items-center justify-center transition-all",
                            isCountingIn ? "bg-amber-500 text-white" :
                                isPlaying ? "bg-red-500 text-white" :
                                    "bg-primary text-primary-foreground"
                        )}
                        onClick={handleTogglePlay}
                    >
                        {isCountingIn ? <div className="text-sm font-black">{4 - countInBeat}</div> :
                            isPlaying ? <Square className="h-5 w-5 fill-current" /> :
                                <Play className="h-5 w-5 fill-current ml-0.5" />}
                    </button>
                </div>
            </FloatingBottomBar>

            <SlidingSelector
                open={isBpmOpen}
                onOpenChange={setIsBpmOpen}
                title="Select Tempo"
                options={BPM_OPTIONS}
                selectedValue={tempo}
                onSelect={(val) => { setTempo(Number(val)); setHasManualTempo(true); }}
                presentation="list"
                showHeader={false}
            />

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .glass-floating-bar {
                    background: rgba(30, 30, 30, 0.4);
                    backdrop-filter: blur(28px) saturate(180%);
                }
                [data-radix-portal] { z-index: 1000 !important; }
            `}</style>
        </div>
    )
}
