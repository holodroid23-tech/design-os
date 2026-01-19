import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconTile, SystemIcon } from '@/components/atoms/icon'
import { ImageTile } from '@/components/ui/image-tile'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SectionTitle } from '@/components/ui/section-title'
import { ChevronDown, ChevronLeft, Settings, Star, User } from 'lucide-react'

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

