/**
 * GeneralSettingsPreview - Replicated design
 * 
 * This component replicates the general-settings.png mockup using the Compost design system.
 */

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SettingsGroup } from '@/components/settings/settings-group'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemTitle
} from '@/components/settings/settings-item'
import { ArrowLeft, ChevronDown, Plus, Trash } from 'lucide-react'

export const designOS = { presentation: 'page' as const }

interface GeneralSettingsProps {
  onBack?: () => void
}

export default function GeneralSettingsPreview({ onBack }: GeneralSettingsProps) {
  const [currency, setCurrency] = useState('USD ($)')
  const [taxesEnabled, setTaxesEnabled] = useState(true)

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto bg-background min-h-screen text-foreground font-sans">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-muted-foreground w-10 h-10 rounded-[12px]"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">General</h1>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Store Name */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Store Name</Label>
          <Input
            defaultValue="The Brew Corner"
            className="bg-layer-1 border-border rounded-[6px] h-12"
          />
        </div>

        {/* Store Street */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Store Street</Label>
          <Input
            defaultValue="42 Artisan Way"
            className="bg-layer-1 border-border rounded-[6px] h-12"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</Label>
          <Input
            defaultValue="contact@brewcorner.com"
            className="bg-layer-1 border-border rounded-[6px] h-12"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Website</Label>
          <Input
            defaultValue="www.thebrewcorner.com"
            className="bg-layer-1 border-border rounded-[6px] h-12"
          />
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Currency</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-layer-1 border-border rounded-[6px] h-12 px-3 font-normal text-foreground hover:bg-layer-2 hover:text-foreground"
              >
                {currency}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" align="start">
              <DropdownMenuItem onSelect={() => setCurrency('USD ($)')}>USD ($)</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrency('EUR (€)')}>EUR (€)</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrency('GBP (£)')}>GBP (£)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Display Always On */}
        <SettingsGroup>
          <SettingsItem className="px-4 py-3 bg-layer-1 border border-border rounded-[12px]">
            <SettingsItemContent>
              <SettingsItemTitle className="text-sm font-semibold uppercase tracking-wide text-foreground">
                Display Always On
              </SettingsItemTitle>
            </SettingsItemContent>
            <SettingsItemAction>
              <Switch defaultChecked />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        {/* Time Format */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time Format</Label>
          <Tabs defaultValue="am-pm" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-layer-1 rounded-[6px] p-1 h-auto">
              <TabsTrigger
                value="am-pm"
                className="rounded-[6px] data-[state=active]:bg-selection data-[state=active]:text-primary-foreground text-sm py-2"
              >
                AM/PM
              </TabsTrigger>
              <TabsTrigger
                value="24h"
                className="rounded-[6px] text-sm py-2"
              >
                24h
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Taxes Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Use Taxes</Label>
            <div className="flex items-center gap-2">
              <Switch checked={taxesEnabled} onCheckedChange={setTaxesEnabled} />
              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {taxesEnabled && (
            <div className="space-y-2">
              <Card className="border border-primary bg-primary/5 rounded-[6px] shadow-sm">
                <CardContent className="flex items-center justify-between p-3">
                  <span className="text-sm font-medium">VAT Standard 21% (defaultly use)</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border bg-layer-1 rounded-[6px] shadow-sm">
                <CardContent className="flex items-center justify-between p-3">
                  <span className="text-sm font-medium">Service Charge 10%</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Pin Lock Timer */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pin Lock Timer</Label>
          <div className="flex flex-wrap gap-2">
            {['1m', '2m', '3m', '5m', '10m', 'Never'].map((time) => (
              <Button
                key={time}
                variant={time === '2m' ? 'default' : 'outline'}
                size="sm"
                className={`
                  rounded-[18px] px-4 h-8 text-xs font-medium
                  ${time === '2m'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent border-border text-muted-foreground hover:bg-layer-2 hover:text-foreground'
                  }
                `}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 justify-start px-0 text-xs font-bold uppercase tracking-wide h-auto py-2"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
