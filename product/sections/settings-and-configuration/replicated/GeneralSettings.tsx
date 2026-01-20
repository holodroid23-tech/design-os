import * as React from "react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectWithSliding } from "@/components/ui/select-with-sliding"
import { Switch } from "@/components/ui/switch"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Trash2, Plus } from "lucide-react"

export default function GeneralSettings() {
    const [currency, setCurrency] = React.useState("usd")
    const [useTaxes, setUseTaxes] = React.useState(true)
    const [selectedTaxId, setSelectedTaxId] = React.useState("tax-1")

    const taxes = [
        { id: "tax-1", label: "VAT Standard", rate: "21%" },
        { id: "tax-2", label: "Service Charge", rate: "10%" },
        { id: "tax-3", label: "Luxury Tax", rate: "15%" },
        { id: "tax-4", label: "New Tax", rate: "10%" },
    ]

    const currencyOptions = [
        { value: "usd", label: "USD ($)" },
        { value: "eur", label: "EUR (€)" },
        { value: "gbp", label: "GBP (£)" },
    ]

    return (
        <div className="flex h-full min-h-full flex-col bg-background">
            {/* Block 1: Header */}
            <div className="px-6 py-4 sticky top-0 bg-background z-10 border-b">
                <Button type="button" variant="invisible" className="group w-full h-auto p-0 justify-start text-left">
                    <SectionTitle
                        interactive
                        leading={
                            <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
                        }
                    >
                        General
                    </SectionTitle>
                </Button>
            </div>

            {/* Block 2: Store Fields */}
            <div className="flex flex-col gap-6 px-6 py-4">
                {/* Store name field */}
                <div className="flex flex-col gap-2">
                    <Label>Store name</Label>
                    <Input defaultValue="The Brew Corner" />
                </div>

                {/* Store street field */}
                <div className="flex flex-col gap-2">
                    <Label>Store street</Label>
                    <Input defaultValue="42 Artisan Way" />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input defaultValue="contact@brewcorner.com" />
                </div>

                {/* Website field */}
                <div className="flex flex-col gap-2">
                    <Label>Website</Label>
                    <Input defaultValue="www.thebrewcorner.com" />
                </div>
            </div>

            {/* Block 3: Preferences */}
            <div className="flex flex-col gap-6 px-6 py-4">
                {/* Currency field */}
                <div className="flex flex-col gap-2">
                    <Label>Currency</Label>
                    <SelectWithSliding
                        variant="sliding"
                        value={currency}
                        onValueChange={(val) => setCurrency(val as string)}
                        options={currencyOptions}
                    />
                </div>

                {/* Display always on field */}
                <div className="flex items-center gap-4">
                    <Label className="text-base font-medium leading-none text-foreground">Display always on</Label>
                    <Switch defaultChecked />
                </div>
            </div>

            {/* Block 4: Time Format */}
            <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex flex-col gap-2">
                    <Label>Time format</Label>
                    <RadioButtonGroup defaultValue="ampm">
                        <RadioButtonGroupItem value="ampm" variant="default" size="default">AM/PM</RadioButtonGroupItem>
                        <RadioButtonGroupItem value="24h" variant="default" size="default">24h</RadioButtonGroupItem>
                    </RadioButtonGroup>
                </div>
            </div>

            {/* Block 5: Taxes */}
            <div className="flex flex-col gap-6 px-6 py-4">
                {/* Use taxes toggle */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="use-taxes-section" className="text-base font-medium leading-none text-foreground cursor-pointer">Use taxes</Label>
                        <Switch id="use-taxes-section" checked={useTaxes} onCheckedChange={setUseTaxes} />
                    </div>
                    <Button variant="secondary" size="icon" className="h-9 w-9 rounded-md">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {useTaxes && (
                    <RadioButtonGroup
                        value={selectedTaxId}
                        onValueChange={setSelectedTaxId}
                        className="flex flex-col gap-3"
                    >
                        {taxes.map((tax) => {
                            const isSelected = selectedTaxId === tax.id
                            return (
                                <RadioButtonGroupItem
                                    key={tax.id}
                                    value={tax.id}
                                    variant="default"
                                    className={[
                                        'relative w-full !flex !flex-row items-center justify-between p-4 h-auto min-h-[72px] rounded-[12px] transition-all border',
                                        isSelected
                                            ? 'bg-secondary text-secondary-foreground border-transparent shadow-sm'
                                            : 'border bg-muted/40 hover:bg-muted/60',
                                    ].join(' ')}
                                >
                                    <div className="flex-1 flex flex-col items-start gap-1 overflow-hidden">
                                        <div className="flex items-center gap-2 max-w-full">
                                            <span className={[
                                                'text-base font-normal truncate mr-2',
                                                isSelected ? 'text-secondary-foreground' : 'text-foreground',
                                            ].join(' ')}
                                            >
                                                {tax.label} {tax.rate}
                                            </span>
                                            {isSelected && (
                                                <Badge
                                                    variant="default"
                                                    className="bg-layer-success text-on-layer-success text-[10px] px-2 py-0 h-5 rounded-[9999px] font-bold tracking-wider shrink-0"
                                                >
                                                    Default
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0 ml-4 h-9 w-9"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            // Handle remove
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </RadioButtonGroupItem>
                            )
                        })}
                    </RadioButtonGroup>
                )}
            </div>

            {/* Block 6: PIN Lock Timer */}
            <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex flex-col gap-2">
                    <Label>PIN lock timer</Label>
                    <RadioButtonGroup defaultValue="2m" className="flex w-full gap-2">
                        {['1m', '2m', '3m', '5m', '10m', 'Never'].map((val) => (
                            <RadioButtonGroupItem
                                key={val}
                                value={val}
                                variant="default"
                                size="default"
                                className="flex-1 px-1 min-w-0"
                            >
                                {val}
                            </RadioButtonGroupItem>
                        ))}
                    </RadioButtonGroup>
                </div>
            </div>

            {/* Block 7: Delete Store */}
            <div className="px-6 py-8 pb-12 mt-auto">
                <Button variant="destructive" className="w-full" size="lg">
                    Delete Store
                </Button>
            </div>
        </div>
    )
}
