import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ColorPicker } from '@/components/ui/color-picker'
import { ColorSelector, ColorSelectorItem } from '@/components/ui/color-selector'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SearchInputWithSuggestions } from '@/components/ui/search-input-with-suggestions'
import { Heart, Search, Share2 } from 'lucide-react'

export function InputsExamplesCard() {
  const [inputValue, setInputValue] = useState('')

  return (
    <Card id="inputs" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Inputs</CardTitle>
        <CardDescription>Form input components (min 48px height)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[48px] sm:min-h-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" className="min-h-[48px] sm:min-h-0" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search..." className="pl-10 min-h-[48px] sm:min-h-0" />
          </div>
          <div className="space-y-2">
            <Label>Search with suggestions (whisperer)</Label>
            <div className="relative z-10 space-y-4">
              <SearchInputWithSuggestions placeholder="Search items..." />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled input</Label>
          <Input id="disabled" placeholder="Disabled" disabled className="min-h-[48px] sm:min-h-0" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SwitchesExamplesCard() {
  return (
    <Card id="switches" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Switches</CardTitle>
        <CardDescription>Toggle controls for boolean states - with and without text labels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Variant 1: Without Text */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Without text</Label>
          <div className="flex items-center gap-4 flex-wrap">
            <Switch id="switch-no-text-1" />
            <Switch id="switch-no-text-2" defaultChecked />
            <Switch id="switch-no-text-3" disabled />
            <Switch id="switch-no-text-4" disabled defaultChecked />
          </div>
        </div>

        <Separator />

        {/* Variant 2: With Text on Left */}
        <div className="space-y-3">
          <Label className="text-base font-medium">With text (left side)</Label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Label htmlFor="airplane-mode" className="cursor-pointer">
                Airplane mode
              </Label>
              <Switch id="airplane-mode" />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="notifications" className="cursor-pointer">
                Notifications
              </Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="disabled-switch" className="cursor-pointer opacity-50">
                Disabled
              </Label>
              <Switch id="disabled-switch" disabled />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="disabled-checked" className="cursor-pointer opacity-50">
                Disabled checked
              </Label>
              <Switch id="disabled-checked" disabled defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DatePickerExamplesCard() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <Card id="date-picker" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Date picker</CardTitle>
        <CardDescription>Select dates with calendar popup</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select date</Label>
          <DatePicker date={selectedDate} onDateChange={setSelectedDate} placeholder="Pick a date" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ColorPickerExamplesCard() {
  const [selectedColor, setSelectedColor] = useState<string>()

  return (
    <Card id="color-picker" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Color picker</CardTitle>
        <CardDescription>Select colors with presets and custom picker</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select color</Label>
          <ColorPicker color={selectedColor} onColorChange={setSelectedColor} />
        </div>
        <div className="pt-2 border-t border">
          <p className="text-xs text-muted-foreground">
            Selected: <span className="font-mono font-medium text-foreground">{selectedColor || '(none yet)'}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function ColorSelectorExamplesCard() {
  const [selectedToken, setSelectedToken] = useState<string>('layer-1')

  const options: Array<{ value: string; gradient: string; label: string }> = [
    { value: 'layer-1', gradient: 'bg-layer-1', label: 'Layer 1' },
    { value: 'layer-info', gradient: 'bg-layer-info', label: 'Info' },
    { value: 'layer-success', gradient: 'bg-layer-success', label: 'Success' },
    { value: 'layer-warning', gradient: 'bg-layer-warning', label: 'Warning' },
    { value: 'layer-danger', gradient: 'bg-layer-danger', label: 'Danger' },
    { value: 'layer-recent', gradient: 'bg-layer-recent', label: 'Recent' },
    { value: 'primary', gradient: 'bg-primary', label: 'Primary' },
    { value: 'secondary', gradient: 'bg-secondary', label: 'Secondary' },
    { value: 'muted', gradient: 'bg-muted', label: 'Muted' },
    { value: 'accent', gradient: 'bg-accent', label: 'Accent' },
    { value: 'card', gradient: 'bg-card', label: 'Card' },
    { value: 'background', gradient: 'bg-background', label: 'Background' },
  ]

  return (
    <Card id="color-selector" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Color selector (grid alternative)</CardTitle>
        <CardDescription>High-premium circular grid for quick color selection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Select theme token</Label>
          <ColorSelector value={selectedToken} onValueChange={setSelectedToken}>
            {options.map((item) => (
              <ColorSelectorItem
                key={item.value}
                value={item.value}
                gradient={item.gradient}
                aria-label={`Select ${item.label}`}
              />
            ))}
          </ColorSelector>
        </div>
        <div className="pt-2 border-t border">
          <p className="text-xs text-muted-foreground">
            Selected token: <span className="font-mono font-medium text-primary">{selectedToken}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function BadgesExamplesCard() {
  return (
    <Card id="badges-examples" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Badges</CardTitle>
        <CardDescription>Status indicators and labels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export function TabsExamplesCard() {
  return (
    <Card id="tabs" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tabs</CardTitle>
        <CardDescription>Tabbed content navigation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="min-h-[48px] sm:min-h-0">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="min-h-[48px] sm:min-h-0">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="min-h-[48px] sm:min-h-0">
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Overview content</h3>
              <p className="text-sm text-muted-foreground">
                This is the overview tab content. You can display summary information here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Analytics content</h3>
              <p className="text-sm text-muted-foreground">Analytics data and charts would be displayed here.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Settings content</h3>
              <p className="text-sm text-muted-foreground">
                Application settings and preferences would be shown here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function CardsExamplesCard() {
  return (
    <Card id="cards" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cards</CardTitle>
        <CardDescription>Different card usages and layouts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Card Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Card selection</Label>
          <RadioGroup defaultValue="card1" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <RadioGroupItem value="card1" id="card1" className="peer sr-only" />
              <Label
                htmlFor="card1"
                className="flex flex-col gap-2 rounded-[18px] border border-foreground/20 bg-transparent p-4 hover:bg-accent/40 peer-data-[state=checked]:border-transparent peer-data-[state=checked]:bg-secondary cursor-pointer transition-all"
              >
                <span className="font-semibold text-base text-foreground peer-data-[state=checked]:opacity-70">
                  Pro plan
                </span>
                <span className="text-sm text-muted-foreground peer-data-[state=checked]:opacity-50">
                  Advanced features for power users
                </span>
                <span className="font-bold mt-2 text-foreground peer-data-[state=checked]:opacity-70">$29/mo</span>
              </Label>
            </div>
            <div className="relative">
              <RadioGroupItem value="card2" id="card2" className="peer sr-only" />
              <Label
                htmlFor="card2"
                className="flex flex-col gap-2 rounded-[18px] border border-foreground/20 bg-transparent p-4 hover:bg-accent/40 peer-data-[state=checked]:border-transparent peer-data-[state=checked]:bg-secondary cursor-pointer transition-all"
              >
                <span className="font-semibold text-base text-foreground peer-data-[state=checked]:opacity-70">
                  Team plan
                </span>
                <span className="text-sm text-muted-foreground peer-data-[state=checked]:opacity-50">
                  Collaboration tools for teams
                </span>
                <span className="font-bold mt-2 text-foreground peer-data-[state=checked]:opacity-70">$99/mo</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <div className="flex flex-col gap-1 mb-3">
            <Label className="text-base font-medium">Card variations</Label>
            <p className="text-sm text-muted-foreground">Different card layouts and content</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-base">Simple card</CardTitle>
                <CardDescription>Basic card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This is a simple card component with minimal content.</p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Card with actions</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="invisible"
                      size="icon-sm"
                      className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="invisible"
                      size="icon-sm"
                      className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card with action buttons in the header.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

