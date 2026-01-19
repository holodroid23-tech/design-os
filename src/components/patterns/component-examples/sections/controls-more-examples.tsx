import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Numpad } from '@/components/ui/numpad'
import { PinEntry } from '@/components/ui/pin-entry'
import { RadioButtonGroup, RadioButtonGroupItem } from '@/components/ui/radio-button-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { StrokeStyleSelector, type StrokeStyleOption } from '@/components/ui/stroke-style-selector'
import { Switch } from '@/components/ui/switch'
import { ChevronDown, Mail, Plus, Settings, Trash2, User } from 'lucide-react'

interface TaxItem {
  id: string
  label: string
  rate: string
}

export function RadioGroupsExamplesCard() {
  const [selectedRadio, setSelectedRadio] = useState('option1')
  const [strokeStyle, setStrokeStyle] = useState<StrokeStyleOption>('common')

  const [useTaxes, setUseTaxes] = useState(true)
  const [taxes, setTaxes] = useState<TaxItem[]>([
    { id: '1', label: 'VAT standard', rate: '21%' },
    { id: '2', label: 'Service charge', rate: '10%' },
    { id: '3', label: 'Luxury tax', rate: '15%' },
    { id: '4', label: 'New tax', rate: '10%' },
  ])

  const initialSelectedTaxId = useMemo(() => (taxes.length > 1 ? taxes[0]?.id ?? null : null), [taxes])
  const [selectedTaxId, setSelectedTaxId] = useState<string | null>(initialSelectedTaxId)

  const handleRemoveTax = (id: string) => {
    const newTaxes = taxes.filter((tax) => tax.id !== id)
    setTaxes(newTaxes)
    if (newTaxes.length <= 1) {
      setSelectedTaxId(null)
    } else if (selectedTaxId === id) {
      setSelectedTaxId(newTaxes[0]?.id ?? null)
    }
  }

  const handleAddTax = () => {
    const newId = Math.random().toString(36).substring(2, 9)
    const newTaxes = [...taxes, { id: newId, label: 'New tax', rate: '10%' }]
    setTaxes(newTaxes)
    if (newTaxes.length > 1 && !selectedTaxId) {
      setSelectedTaxId(newTaxes[0]?.id ?? null)
    }
  }

  return (
    <Card id="radio-groups" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Radio button group</CardTitle>
        <CardDescription>Single selection from multiple options showing different variants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Default Vertical */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Vertical layout (default)</Label>
          <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
            <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
              <RadioGroupItem value="option1" id="radio-option1" className="h-6 w-6" />
              <Label htmlFor="radio-option1" className="flex-1 cursor-pointer py-2">
                Option 1 - Default
              </Label>
            </div>
            <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
              <RadioGroupItem value="option2" id="radio-option2" className="h-6 w-6" />
              <Label htmlFor="radio-option2" className="flex-1 cursor-pointer py-2">
                Option 2 - With Description
              </Label>
            </div>
            <div className="flex items-center space-x-2 min-h-[48px] sm:min-h-0">
              <RadioGroupItem value="option3" id="radio-option3" className="h-6 w-6" />
              <Label htmlFor="radio-option3" className="flex-1 cursor-pointer py-2">
                Option 3
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground pl-7">
            Selected: <span className="font-medium">{selectedRadio}</span>
          </p>
        </div>

        <Separator />

        {/* Horizontal */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Horizontal layout</Label>
          <RadioGroup defaultValue="h1" className="flex flex-row space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h1" id="radio-h1" className="h-6 w-6" />
              <Label htmlFor="radio-h1" className="cursor-pointer">
                Compact
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h2" id="radio-h2" className="h-6 w-6" />
              <Label htmlFor="radio-h2" className="cursor-pointer">
                Comfortable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h3" id="radio-h3" className="h-6 w-6" />
              <Label htmlFor="radio-h3" className="cursor-pointer">
                Spacious
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* States */}
        <div className="space-y-3">
          <Label className="text-base font-medium">States</Label>
          <div className="flex flex-wrap gap-6">
            <RadioGroup disabled defaultValue="d1" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="d1" id="radio-d1" className="h-6 w-6" />
                <Label htmlFor="radio-d1" className="cursor-not-allowed text-muted-foreground">
                  Disabled Selected
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="d2" id="radio-d2" className="h-6 w-6" />
                <Label htmlFor="radio-d2" className="cursor-not-allowed text-muted-foreground">
                  Disabled Unselected
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator />

        {/* Button Styled Radio Group */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Radio button group variants</Label>

            <div className="space-y-6">
              {/* Default Variant */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Default variant (with spaces)</Label>
                <RadioButtonGroup defaultValue="2m" className="gap-3">
                  {['1m', '2m', '3m', '5m'].map((time) => (
                    <RadioButtonGroupItem key={time} value={time} className="flex-1">
                      {time}
                    </RadioButtonGroupItem>
                  ))}
                </RadioButtonGroup>
              </div>

              {/* Surface Variant */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Surface variant (standard sizes)</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Small (h-8)</Label>
                    <RadioButtonGroup defaultValue="Small 1" className="gap-2">
                      {['Small 1', 'Small 2', 'Small 3'].map((val) => (
                        <RadioButtonGroupItem key={val} value={val} variant="surface" size="sm">
                          {val}
                        </RadioButtonGroupItem>
                      ))}
                    </RadioButtonGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Default (h-9)</Label>
                    <RadioButtonGroup defaultValue="Default 1" className="gap-2">
                      {['Default 1', 'Default 2', 'Default 3'].map((val) => (
                        <RadioButtonGroupItem key={val} value={val} variant="surface" size="default">
                          {val}
                        </RadioButtonGroupItem>
                      ))}
                    </RadioButtonGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Large (h-10)</Label>
                    <RadioButtonGroup defaultValue="Large 1" className="gap-2">
                      {['Large 1', 'Large 2', 'Large 3'].map((val) => (
                        <RadioButtonGroupItem key={val} value={val} variant="surface" size="lg">
                          {val}
                        </RadioButtonGroupItem>
                      ))}
                    </RadioButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Card Radio Groups */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Card radio groups</Label>
          <p className="text-sm text-muted-foreground">Radio buttons with rich content and custom layouts</p>

          <RadioButtonGroup
            defaultValue="image"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            <RadioButtonGroupItem
              value="none"
              variant="surface"
              className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0"
            >
              <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                <div className="h-12 w-12 rounded-[12px] border-2 border-dashed border-muted-foreground/30" />
                <span className="text-xs text-muted-foreground">None</span>
              </div>
            </RadioButtonGroupItem>

            <RadioButtonGroupItem
              value="common"
              variant="surface"
              className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0"
            >
              <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                <div className="h-12 w-12 rounded-[12px] border-2 border-solid border-foreground/50 relative flex items-center justify-center">
                  <div className="absolute inset-2 border border-foreground/20 rounded-[6px]" />
                </div>
                <span className="text-xs font-medium">Common</span>
              </div>
            </RadioButtonGroupItem>

            <RadioButtonGroupItem
              value="dashed"
              variant="surface"
              className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0"
            >
              <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                <div className="h-12 w-12 rounded-[12px] border-2 border-dashed border-foreground/50" />
                <span className="text-xs text-muted-foreground">Dashed</span>
              </div>
            </RadioButtonGroupItem>

            <RadioButtonGroupItem
              value="gradient"
              variant="surface"
              className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0"
            >
              <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                <div className="h-12 w-12 rounded-[12px] bg-primary/15 border shadow-sm" />
                <span className="text-xs text-muted-foreground">Gradient</span>
              </div>
            </RadioButtonGroupItem>

            <RadioButtonGroupItem
              value="image"
              variant="surface"
              className="aspect-square flex flex-col items-center justify-center text-center h-auto p-0"
            >
              <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
                <div className="h-12 w-12 rounded-[12px] overflow-hidden relative">
                  <img src="https://github.com/shadcn.png" alt="Preview" className="h-full w-full object-cover" />
                </div>
                <span className="text-xs text-muted-foreground">Image</span>
              </div>
            </RadioButtonGroupItem>
          </RadioButtonGroup>

          <div className="pt-4">
            <Label className="text-sm font-medium">Stroke style selector (DS)</Label>
            <div className="pt-2 max-w-sm">
              <StrokeStyleSelector value={strokeStyle} onValueChange={setStrokeStyle} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Tax Selection (Moved and Standardized) */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-semibold">Tax radio buttons</Label>
              <p className="text-sm text-muted-foreground">Specialized selection with badges and actions</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <Label
                htmlFor="use-taxes-section"
                className="text-sm font-medium leading-none text-foreground cursor-pointer"
              >
                Use taxes
              </Label>
              <Switch id="use-taxes-section" checked={useTaxes} onCheckedChange={setUseTaxes} />
            </div>
            <Button variant="secondary" size="icon" onClick={handleAddTax} aria-label="Add tax">
              <Plus />
            </Button>
          </div>

          {useTaxes && (
            <RadioButtonGroup
              value={selectedTaxId || ''}
              onValueChange={(val) => taxes.length > 1 && setSelectedTaxId(val)}
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
                        <span
                          className={[
                            'text-base font-normal truncate',
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
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0 ml-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveTax(tax.id)
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </RadioButtonGroupItem>
                )
              })}
            </RadioButtonGroup>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function NumpadExamplesCard() {
  const [priceValue, setPriceValue] = useState('0')

  return (
    <Card id="numpad" className="border shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Numeric entry</CardTitle>
        <CardDescription>Premium numeric pad for price entry and PIN codes - optimized for POS touch targets</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Numpad value={priceValue} onChange={setPriceValue} label="Enter price" />
      </CardContent>
    </Card>
  )
}

export function SecurityExamplesCard() {
  return (
    <Card id="security" className="border shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Security interfaces</CardTitle>
        <CardDescription>PIN entry components for authorization</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 items-center justify-center py-10 bg-muted/40">
        <div className="w-full max-w-[360px] bg-card rounded-[18px] shadow-lg border overflow-hidden">
          <PinEntry onCancel={() => {}} className="scale-90 origin-top" />
        </div>
        <div className="w-full max-w-[360px] bg-card rounded-[18px] shadow-lg border overflow-hidden">
          <PinEntry
            title="Confirm PIN"
            description="Please confirm your PIN code."
            visible
            onCancel={() => {}}
            className="scale-90 origin-top"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function CheckboxesExamplesCard() {
  return (
    <Card id="checkboxes" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Checkboxes</CardTitle>
        <CardDescription>Multiple selection options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" defaultChecked />
          <Label
            htmlFor="marketing"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Receive marketing emails
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <Label
            htmlFor="disabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled option
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <Label
            htmlFor="disabled-checked"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled checked
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}

export function DropdownMenusExamplesCard() {
  const [dropdownValue, setDropdownValue] = useState('option1')

  return (
    <Card id="dropdown-menus" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Dropdowns</CardTitle>
        <CardDescription>Menu dropdowns with various options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="select" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="min-h-[48px] sm:min-h-0">
                <Mail className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="min-h-[48px] sm:min-h-0">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="select" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                With Checkboxes
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked className="min-h-[48px] sm:min-h-0">
                Show notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="min-h-[48px] sm:min-h-0">
                Enable dark mode
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked className="min-h-[48px] sm:min-h-0">
                Auto-save
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="select" className="w-full sm:w-auto min-h-[48px] sm:min-h-0 justify-between">
                Radio Group
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={dropdownValue} onValueChange={setDropdownValue}>
                <DropdownMenuRadioItem value="option1" className="min-h-[48px] sm:min-h-0">
                  List View
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="option2" className="min-h-[48px] sm:min-h-0">
                  Grid View
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="option3" className="min-h-[48px] sm:min-h-0">
                  Compact View
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

