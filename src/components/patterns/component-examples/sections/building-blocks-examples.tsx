import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconTile, SystemIcon } from '@/components/atoms/icon'
import { ImageTile } from '@/components/ui/image-tile'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SettingsGroup } from '@/components/settings/settings-group'
import { SectionTitle } from '@/components/ui/section-title'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import { AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Printer, Settings, Star, User, WifiOff } from 'lucide-react'

export function BuildingBlocksExamplesCard() {
  return (
    <Card id="building-blocks" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Building blocks</CardTitle>
        <CardDescription>Atomic elements: standardized icons + avatars (6px grid)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Standardized icons</h3>
            <p className="text-xs text-muted-foreground">Icon glyph sizes + icon tiles (36px / 48px / 60px)</p>
          </div>
          <div className="space-y-6 p-6 bg-background border border-border rounded-xl">
            <div className="space-y-4">
              <div className="text-xs text-muted-foreground">Small / regular / big / huge (plain vs bg)</div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-9 flex items-center justify-center">
                    <SystemIcon icon={Settings} size="small" />
                  </div>
                  <div className="size-9 flex items-center justify-center rounded-[12px] bg-transparent text-xs text-muted-foreground">
                    —
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 flex items-center justify-center">
                    <SystemIcon icon={Settings} size="regular" />
                  </div>
                  <IconTile icon={Settings} size="small" variant="tile" tone="neutral" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-12 flex items-center justify-center">
                    <SystemIcon icon={Settings} size="big" />
                  </div>
                  <IconTile icon={Settings} size="medium" variant="tile" tone="neutral" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-[60px] flex items-center justify-center">
                    <SystemIcon icon={Settings} size="huge" />
                  </div>
                  <IconTile icon={Settings} size="large" variant="tile" tone="neutral" />
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 space-y-3">
                <div className="text-xs text-muted-foreground">Color variants (tone)</div>
                <div className="flex flex-wrap items-center gap-3">
                  <IconTile icon={Settings} size="small" variant="tile" tone="neutral" />
                  <IconTile icon={Settings} size="small" variant="tile" tone="info" />
                  <IconTile icon={Settings} size="small" variant="tile" tone="success" />
                  <IconTile icon={Settings} size="small" variant="tile" tone="warning" />
                  <IconTile icon={Settings} size="small" variant="tile" tone="danger" />
                  <IconTile icon={Settings} size="small" variant="tile" tone="recent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Image tiles</h3>
            <p className="text-xs text-muted-foreground">Square image atom (36px / 48px / 60px, radius 12px)</p>
          </div>
          <div className="p-6 bg-background border border-border rounded-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ImageTile size="small" />
                <ImageTile size="small" src="https://i.pravatar.cc/150?u=thumb-small" alt="Thumbnail" />
              </div>
              <div className="flex items-center gap-3">
                <ImageTile size="medium" />
                <ImageTile size="medium" src="https://i.pravatar.cc/150?u=thumb-medium" alt="Thumbnail" />
              </div>
              <div className="flex items-center gap-3">
                <ImageTile size="large" />
                <ImageTile size="large" src="https://i.pravatar.cc/150?u=thumb-large" alt="Thumbnail" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Avatars</h3>
            <p className="text-xs text-muted-foreground">Small / medium / large</p>
          </div>
          <div className="p-6 bg-background border border-border rounded-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Avatar size="small">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="small" online>
                  <AvatarImage src="https://i.pravatar.cc/150?u=morty" alt="Morty" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-3">
                <Avatar size="medium">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar size="medium" online>
                  <AvatarImage src="https://i.pravatar.cc/150?u=rick" alt="Rick" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-3">
                <Avatar variant="primary" size="large">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar variant="primary" size="large" online>
                  <AvatarImage src="https://i.pravatar.cc/150?u=summer" alt="Summer" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-3">
                <Avatar size="small">
                  <AvatarFallback>
                    <User aria-hidden />
                  </AvatarFallback>
                </Avatar>
                <Avatar size="medium">
                  <AvatarFallback>
                    <User aria-hidden />
                  </AvatarFallback>
                </Avatar>
                <Avatar variant="primary" size="large">
                  <AvatarFallback>
                    <User aria-hidden />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AtomicItemsExamplesCard() {
  return (
    <Card id="atomic-items" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Atomic items</CardTitle>
        <CardDescription>Examples of complex items built from atoms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <SettingsGroup>
          <SettingsItem>
            <SettingsItemContent>
              <SettingsItemTitle>Simple text item</SettingsItemTitle>
            </SettingsItemContent>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem>
            <SettingsItemContent>
              <SettingsItemTitle>Toggle option</SettingsItemTitle>
              <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Switch />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem>
            <SettingsItemIcon>
              <Avatar size="small">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>User profile</SettingsItemTitle>
              <SettingsItemDescription>Manage account settings</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Button variant="invisible" size="icon-sm" className="min-h-0 min-w-0">
                <span className="sr-only">More</span>
                <MoreVertical className="h-[18px] w-[18px]" aria-hidden="true" />
              </Button>
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem className="group">
            <SettingsItemIcon>
              <ImageTile
                size="small"
                src="https://i.pravatar.cc/150?u=thumbnail-coffee"
                alt="Coffee shop"
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Coffee shop</SettingsItemTitle>
              <SettingsItemDescription>View details and recent orders</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <ChevronRight
                aria-hidden="true"
                className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem className="group">
            <SettingsItemIcon>
              <ImageTile
                size="small"
                src="https://i.pravatar.cc/150?u=thumbnail-invoice"
                alt="Invoice logo"
              />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Invoices</SettingsItemTitle>
              <SettingsItemDescription>Billing history and receipts</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <span className="text-xs text-muted-foreground">3 new</span>
              <ChevronRight
                aria-hidden="true"
                className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem className="group">
            <SettingsItemIcon>
              <Avatar size="small">
                <AvatarImage src="https://i.pravatar.cc/150?u=owner" alt="Profile photo" />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Owner account</SettingsItemTitle>
              <SettingsItemDescription>Security and sign-in methods</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <span className="text-xs text-muted-foreground">2FA</span>
              <ChevronRight
                aria-hidden="true"
                className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        <SettingsGroup>
          <SettingsItem className="group">
            <SettingsItemIcon>
              <IconTile icon={Settings} size="small" variant="tile" tone="neutral" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>General</SettingsItemTitle>
              <SettingsItemDescription>Language, region, and preferences</SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <span className="text-xs text-muted-foreground">English</span>
              <ChevronRight
                aria-hidden="true"
                className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        {/* Right-side button (single action) */}
        <SettingsGroup>
          <SettingsItem>
            <SettingsItemIcon>
              <IconTile icon={Printer} size="small" variant="tile" tone="success" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Kitchen printer</SettingsItemTitle>
              <SettingsItemDescription tone="success" className="font-medium">
                Connected
              </SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Button variant="secondary" size="sm">
                Test
              </Button>
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>

        {/* Right-side buttons (two lines / stacked) */}
        <SettingsGroup>
          <SettingsItem className="items-start">
            <SettingsItemIcon className="pt-0.5">
              <IconTile icon={AlertTriangle} size="small" variant="tile" tone="warning" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Order alerts</SettingsItemTitle>
              <SettingsItemDescription tone="warning" className="font-medium">
                Degraded
              </SettingsItemDescription>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button variant="secondary" size="sm">
                  Details
                </Button>
                <Button variant="secondary" size="sm">
                  Fix
                </Button>
              </div>
            </SettingsItemContent>
          </SettingsItem>
        </SettingsGroup>

        {/* Status subtext tone (danger) */}
        <SettingsGroup>
          <SettingsItem>
            <SettingsItemIcon>
              <IconTile icon={WifiOff} size="small" variant="tile" tone="danger" />
            </SettingsItemIcon>
            <SettingsItemContent>
              <SettingsItemTitle>Receipt printer</SettingsItemTitle>
              <SettingsItemDescription tone="danger" className="font-medium">
                Offline
              </SettingsItemDescription>
            </SettingsItemContent>
            <SettingsItemAction>
              <Button variant="destructive" size="sm">
                Reconnect
              </Button>
            </SettingsItemAction>
          </SettingsItem>
        </SettingsGroup>
      </CardContent>
    </Card>
  )
}

export function SectionTitlesExamplesCard() {
  return (
    <Card id="section-titles" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Section titles</CardTitle>
        <CardDescription>Standardized headers (18px semibold)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SectionTitle titleAs="h2">Today's expenses</SectionTitle>

        <button type="button" className="w-full text-left group">
          <SectionTitle
            interactive
            titleAs="h2"
            trailing={
              <ChevronDown className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
          >
            Today expenses
          </SectionTitle>
        </button>

        <button type="button" className="w-full text-left group">
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
            titleAs="h2"
          >
            Monthly utilities
          </SectionTitle>
        </button>

        <SectionTitle
          leading={<Star className="h-[18px] w-[18px] text-primary" />}
          titleAs="h3"
        >
          Favorites
        </SectionTitle>
      </CardContent>
    </Card>
  )
}

