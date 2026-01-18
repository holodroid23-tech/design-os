import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconTile, SystemIcon } from '@/components/atoms/icon'
import { ImageTile } from '@/components/ui/image-tile'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import { ChevronDown, ChevronLeft, Settings, Star } from 'lucide-react'

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
          <div className="space-y-6 p-6 bg-layer-2 border border-border rounded-xl">
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
          <div className="p-6 bg-layer-2 border border-border rounded-xl">
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
          <div className="p-6 bg-layer-2 border border-border rounded-xl">
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
        <SettingsItem className="bg-layer-2 border border-border rounded-xl">
          <SettingsItemContent>
            <SettingsItemTitle>Simple text item</SettingsItemTitle>
          </SettingsItemContent>
        </SettingsItem>

        <SettingsItem className="bg-layer-2 border border-border rounded-xl">
          <SettingsItemContent>
            <SettingsItemTitle>Toggle option</SettingsItemTitle>
            <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
          </SettingsItemContent>
          <SettingsItemAction>
            <Switch />
          </SettingsItemAction>
        </SettingsItem>

        <SettingsItem className="bg-layer-2 border border-border rounded-xl">
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
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <span className="sr-only">More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </SettingsItemAction>
        </SettingsItem>
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
        <div className="p-4 bg-layer-2 rounded-xl border border-border">
          <h2 className="text-xl font-semibold text-foreground">Today's expenses</h2>
        </div>

        <div className="p-4 bg-layer-2 rounded-xl border border-border">
          <div className="flex items-center justify-between cursor-pointer group">
            <h2 className="text-xl font-semibold text-foreground">Today expenses</h2>
            <ChevronDown className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>

        <div className="p-4 bg-layer-2 rounded-xl border border-border">
          <div className="flex items-center gap-3 cursor-pointer group">
            <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            <h2 className="text-xl font-semibold text-foreground">Monthly utilities</h2>
          </div>
        </div>

        <div className="p-4 bg-layer-2 rounded-xl border border-border">
          <div className="flex items-center gap-3">
            <Star className="h-[18px] w-[18px] text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Favorites</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

