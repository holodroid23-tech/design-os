import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { IconTile, SystemIcon } from '@/components/atoms/icon'
import { SettingsItem, SettingsItemAction, SettingsItemContent, SettingsItemTitle } from '@/components/settings/settings-item'
import { ImageTile } from '@/components/ui/image-tile'
import { ChevronDown, Coffee, CupSoda, Home, Pencil, Utensils } from 'lucide-react'

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
        <CardDescription>Expandable lists with rich content (Expenses & Orders)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expenses</h3>
            <Collapsible defaultOpen className="bg-layer-2 rounded-[18px] border border-border overflow-hidden">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="group w-full flex items-center justify-between p-5 text-left hover:bg-layer-hover transition-colors"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold tracking-tight">Yesterday</span>
                      <SystemIcon
                        icon={ChevronDown}
                        size="small"
                        className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">3 expenses</span>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="font-mono font-medium text-base">$1,304.50</div>
                    <Badge variant="destructive">4 Edits</Badge>
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border/60">
                  <div className="divide-y divide-border/50">
                    {/* Whole Milk (collapsed) */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SettingsItem className="group bg-layer-2 hover:bg-layer-hover active:bg-layer-active rounded-none h-auto min-h-0 py-4 pl-6 pr-5">
                          <SettingsItemContent className="flex-row items-center gap-4">
                            <ImageTile
                              size="small"
                              src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200&auto=format&fit=crop"
                              alt="Whole Milk"
                            />
                            <div className="flex flex-col items-start text-left">
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-xl font-semibold tracking-tight">Whole Milk</SettingsItemTitle>
                                <SystemIcon
                                  icon={ChevronDown}
                                  size="small"
                                  className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </SettingsItemContent>
                          <SettingsItemAction className="text-foreground">
                            <span className="font-mono text-base">$4.50</span>
                          </SettingsItemAction>
                        </SettingsItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="bg-layer-1/20 px-5 pb-5 pt-4 space-y-3 text-sm border-t border-border/50">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created by:</span>
                              <span className="text-foreground font-medium">Sarah Jackson</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span className="text-foreground font-medium">Yesterday at 10:42 AM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Note:</span>
                              <span className="text-foreground font-medium">—</span>
                            </div>
                          </div>
                          <div className="flex justify-end pt-2">
                            <Button variant="secondary" size="icon" className="rounded-[12px]">
                              <SystemIcon icon={Pencil} size="regular" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Rent (expanded + change marker) */}
                    <Collapsible defaultOpen className="relative">
                      <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-destructive" />
                      <CollapsibleTrigger asChild>
                        <SettingsItem className="group bg-layer-2 hover:bg-layer-hover active:bg-layer-active rounded-none h-auto min-h-0 py-4 pl-6 pr-5">
                          <SettingsItemContent className="flex-row items-center gap-4">
                            <IconTile icon={Home} size="small" variant="tile" tone="neutral" />
                            <div className="flex flex-col items-start text-left">
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-xl font-semibold tracking-tight">Rent</SettingsItemTitle>
                                <SystemIcon
                                  icon={ChevronDown}
                                  size="small"
                                  className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </SettingsItemContent>
                          <SettingsItemAction className="text-foreground">
                            <span className="font-mono text-base">$1,250.00</span>
                          </SettingsItemAction>
                        </SettingsItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="bg-layer-1/20 px-5 pb-5 pt-4 space-y-4 text-sm border-t border-border/50">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created by:</span>
                              <span className="text-foreground font-medium">Freddy Gasper</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span className="text-foreground font-medium">Yesterday at 10:50 AM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Note:</span>
                              <span className="text-foreground font-medium">Monthly Office Rent</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <div className="flex gap-2 text-xs text-muted-foreground items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                              <p>Freddy Gasper changed name from "Banana" to "Rent" on Yesterday at 10:50 AM</p>
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <Button variant="secondary" size="icon" className="rounded-[12px]">
                              <SystemIcon icon={Pencil} size="regular" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Coffee Beans (expanded + deleted) */}
                    <Collapsible defaultOpen className="relative">
                      <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-destructive" />
                      <CollapsibleTrigger asChild>
                        <SettingsItem className="group bg-layer-2 hover:bg-layer-hover active:bg-layer-active rounded-none h-auto min-h-0 py-4 pl-6 pr-5">
                          <SettingsItemContent className="flex-row items-center gap-4">
                            <ImageTile
                              size="small"
                              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&auto=format&fit=crop"
                              alt="Coffee Beans"
                            />
                            <div className="flex flex-col items-start text-left">
                              <div className="flex items-center gap-2">
                                <SettingsItemTitle className="text-xl font-semibold tracking-tight line-through decoration-muted-foreground/60">
                                  Coffee Beans
                                </SettingsItemTitle>
                                <SystemIcon
                                  icon={ChevronDown}
                                  size="small"
                                  className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </SettingsItemContent>
                          <SettingsItemAction className="text-foreground">
                            <span className="font-mono text-base line-through decoration-muted-foreground/60">$50.00</span>
                          </SettingsItemAction>
                        </SettingsItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="bg-layer-1/20 px-5 pb-5 pt-4 space-y-4 text-sm border-t border-border/50">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created by:</span>
                              <span className="text-foreground font-medium">Sarah Jackson</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span className="text-foreground font-medium">Yesterday at 09:15 AM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Note:</span>
                              <span className="text-foreground font-medium">Dark Roast</span>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="flex gap-2 text-xs text-muted-foreground items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                              <p>
                                Sarah Jackson changed price from <span className="line-through decoration-muted-foreground/60">$45.00</span> to $50.00 at
                                {' '}Yesterday at 09:20 AM
                              </p>
                            </div>
                            <div className="flex gap-2 text-xs text-muted-foreground items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                              <p>Sarah Jackson changed note from "Light Roast" to "Dark Roast" at Yesterday at 09:20 AM</p>
                            </div>
                            <div className="flex gap-2 text-xs text-muted-foreground items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1 shrink-0" />
                              <p>Sarah Jackson deleted expense at Yesterday at 09:25 AM</p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Orders</h3>
            <div className="space-y-4">
              {/* Order #402 (expanded) */}
              <Collapsible defaultOpen className="bg-layer-2 rounded-[18px] border border-border overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="group w-full flex items-center justify-between p-5 text-left hover:bg-layer-hover transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold tracking-tight">Order #402</span>
                        <SystemIcon
                          icon={ChevronDown}
                          size="small"
                          className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">10:42 AM</span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="font-mono font-medium text-base">$29.90</div>
                      <Badge variant="destructive">Refunded</Badge>
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t border-border/60 px-5 pb-5 pt-4 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <IconTile icon={Coffee} size="small" variant="tile" tone="warning" />
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold tracking-tight">Cappuccino</div>
                            <div className="text-sm text-muted-foreground">Qty: 1</div>
                          </div>
                        </div>
                        <div className="font-mono text-base">$4.50</div>
                      </div>
                      <div className="h-px bg-border/50" />

                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <IconTile icon={Utensils} size="small" variant="tile" tone="success" />
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold tracking-tight">Avocado Toast</div>
                            <div className="text-sm text-muted-foreground">Qty: 1</div>
                          </div>
                        </div>
                        <div className="font-mono text-base">$12.00</div>
                      </div>
                      <div className="h-px bg-border/50" />

                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <IconTile icon={CupSoda} size="small" variant="tile" tone="info" />
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold tracking-tight">Iced Matcha</div>
                            <div className="text-sm text-muted-foreground">Qty: 1</div>
                          </div>
                        </div>
                        <div className="font-mono text-base">$11.00</div>
                      </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Created by:</span>
                        <span className="text-foreground font-medium">Sarah Jackson</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Custom name:</span>
                        <span className="text-foreground font-medium">Table 1</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Payment method:</span>
                        <span className="text-foreground font-medium">Visa •••• 4242</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Processed by:</span>
                        <span className="text-foreground font-medium">karel martinek</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Refunded by:</span>
                        <span className="text-foreground font-medium">Mike Ross</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-muted-foreground">Reason:</span>
                        <span className="text-foreground font-medium">Damaged item</span>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Order #402 (collapsed) */}
              <Collapsible className="bg-layer-2 rounded-[18px] border border-border overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="group w-full flex items-center justify-between p-5 text-left hover:bg-layer-hover transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold tracking-tight">Order #402</span>
                        <SystemIcon
                          icon={ChevronDown}
                          size="small"
                          className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">10:42 AM</span>
                    </div>
                    <div className="font-mono font-medium text-base">$29.90</div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t border-border/60 p-5 text-sm text-muted-foreground">
                    (Collapsed example) Expand to see items & details.
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
