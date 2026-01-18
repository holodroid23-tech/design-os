import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { SettingsItem, SettingsItemAction, SettingsItemContent, SettingsItemTitle } from '@/components/settings/settings-item'
import { ChevronDown, Pencil } from 'lucide-react'

export function ElevationsExamplesCard() {
  return (
    <Card id="elevations" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Elevations & shadows</CardTitle>
        <CardDescription>Multi-layered shadow patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-sm flex items-center justify-center">
              <span className="text-xs font-medium">Shadow 100</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">sm: Default Containers</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-md flex items-center justify-center">
              <span className="text-xs font-medium">Shadow 200</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">md: Hover States</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-lg flex items-center justify-center">
              <span className="text-xs font-medium">Shadow 300</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">lg: Popovers & Menus</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-xl bg-layer-2 border border-border shadow-xl flex items-center justify-center">
              <span className="text-xs font-medium">Shadow 400</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">xl: Floating Elements</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
          <div className="flex flex-col gap-2">
            <div className="h-20 w-full rounded-xl bg-layer-2 border border-border shadow-inner flex items-center justify-center">
              <span className="text-xs font-medium italic opacity-50">shadow-inner</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">Pressed/Inset states</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-20 w-full rounded-xl bg-primary text-primary-foreground border border-border shadow-sm flex items-center justify-center">
              <span className="text-xs font-medium">Primary surface</span>
            </div>
            <span className="text-[10px] text-muted-foreground text-center">Tactile emphasis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AccordionsExamplesCard() {
  return (
    <Card id="accordions" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Complex accordions</CardTitle>
        <CardDescription>Expandable lists with rich content (example)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expenses</h3>
            <Collapsible defaultOpen className="bg-layer-2 rounded-xl border border-border overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-layer-1/50 transition-colors group">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">Yesterday</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                    </div>
                    <span className="text-xs text-muted-foreground">2 expenses</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium text-sm">$1,304.50</div>
                    <Badge variant="destructive">4 edits</Badge>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="divide-y divide-border/50 border-t border-border">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <SettingsItem className="pl-6 cursor-pointer bg-layer-2 transition-colors rounded-none h-auto min-h-0 py-3">
                        <SettingsItemContent>
                          <div className="flex items-center gap-2">
                            <SettingsItemTitle className="text-base font-semibold">Whole Milk</SettingsItemTitle>
                            <ChevronDown className="h-3 w-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                          </div>
                        </SettingsItemContent>
                        <SettingsItemAction>
                          <span className="font-mono text-sm">$4.50</span>
                        </SettingsItemAction>
                      </SettingsItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-layer-1/30 px-6 py-4 space-y-3 text-sm border-t border-border/50">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Created by:</span>
                          <span className="text-foreground">Sarah Jackson</span>
                        </div>
                        <div className="flex justify-end pt-2">
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <SettingsItem className="pl-6 bg-layer-2 rounded-none h-auto min-h-0 py-3">
                    <SettingsItemContent>
                      <SettingsItemTitle className="text-base font-semibold">Rent</SettingsItemTitle>
                    </SettingsItemContent>
                    <SettingsItemAction>
                      <span className="font-mono text-sm">$1,250.00</span>
                    </SettingsItemAction>
                  </SettingsItem>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Orders</h3>
            <div className="bg-layer-2 rounded-xl border border-border p-4">
              <div className="text-sm text-muted-foreground">
                Use the `order-*` examples for the full order-tab and expandable flows.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DividersExamplesCard() {
  return (
    <Card id="dividers" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Dividers</CardTitle>
        <CardDescription>Visual separators for organizing content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm font-medium">Horizontal</div>
          <div className="bg-layer-2 border border-border rounded-xl p-6 space-y-4">
            <div className="text-sm text-muted-foreground">Content above the separator</div>
            <Separator />
            <div className="text-sm text-muted-foreground">Content below the separator</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium">Vertical</div>
          <div className="bg-layer-2 border border-border rounded-xl p-6 flex items-center h-16 space-x-4 text-sm text-muted-foreground">
            <div>Item One</div>
            <Separator orientation="vertical" />
            <div>Item Two</div>
            <Separator orientation="vertical" />
            <div>Item Three</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
