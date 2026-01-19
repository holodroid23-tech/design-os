import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconToggleButton } from '@/components/ui/icon-toggle-button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Stepper } from '@/components/ui/stepper'
import { Bell, Download, Mail, MoreVertical, Search, Settings, Star, Trash2 } from 'lucide-react'

export function ButtonsExamplesCard() {
  const [settingsPinned, setSettingsPinned] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [settingsPinnedGhost, setSettingsPinnedGhost] = useState(false)
  const [isFavoriteGhost, setIsFavoriteGhost] = useState(false)

  return (
    <Card id="buttons" className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Buttons</CardTitle>
        <CardDescription>Various button styles and sizes (min 48px touch target)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">Primary CTA button</Label>
            <Button className="min-h-[48px] sm:min-h-0 hover:opacity-90">Primary action</Button>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Button variants</Label>
            <div className="flex flex-wrap gap-3">
              <Button className="min-h-[48px] sm:min-h-0">Default</Button>
              <Button variant="secondary" className="min-h-[48px] sm:min-h-0">
                Secondary
              </Button>
              <Button variant="destructive" className="min-h-[48px] sm:min-h-0">
                Destructive
              </Button>
              <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                Ghost
              </Button>
              <Button variant="invisible" className="min-h-[48px] sm:min-h-0">
                Invisible
              </Button>
              <Button variant="link" className="min-h-[48px] sm:min-h-0">
                Link
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Button sizes</Label>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="min-h-[48px] sm:min-h-0">
                Small
              </Button>
              <Button size="default" className="min-h-[48px] sm:min-h-0">
                Default
              </Button>
              <Button size="lg" className="min-h-[48px] sm:min-h-0">
                Large
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Buttons with icons</Label>
            <div className="flex flex-wrap gap-3">
              <Button className="min-h-[48px] sm:min-h-0">
                <Download className="h-4 w-4" />
                With icon
              </Button>
              <Button variant="secondary" className="min-h-[48px] sm:min-h-0">
                <Mail className="h-4 w-4" />
                Send email
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Disabled state</Label>
            <div className="flex flex-wrap gap-3">
              <Button disabled className="min-h-[48px] sm:min-h-0">
                Disabled
              </Button>
              <Button disabled variant="secondary" className="min-h-[48px] sm:min-h-0">
                Disabled secondary
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Icon-only buttons (all variants)</Label>
            <div className="flex flex-wrap gap-3">
              <Button size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
              <Button
                variant="invisible"
                size="icon"
                className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Icon button pressed state (active)</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Systemized pressed state for icon buttons (favorite is the only filled icon exception)
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <IconToggleButton
                  pressed={settingsPinned}
                  onPressedChange={setSettingsPinned}
                  icon={Settings}
                  label={settingsPinned ? 'Unpin settings' : 'Pin settings'}
                  className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                />
                <span className="text-sm text-muted-foreground">Active background</span>
              </div>

              <div className="flex items-center gap-2">
                <IconToggleButton
                  pressed={isFavorite}
                  onPressedChange={setIsFavorite}
                  icon={Star}
                  label={isFavorite ? 'Unfavorite' : 'Favorite'}
                  fillIconWhenPressed
                  pressedIconClassName="text-amber-400 fill-amber-400"
                  className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                />
                <span className="text-sm text-muted-foreground">Favorite: filled star</span>
              </div>

              <div className="flex items-center gap-2">
                <IconToggleButton
                  variant="ghost"
                  pressed={settingsPinnedGhost}
                  onPressedChange={setSettingsPinnedGhost}
                  icon={Settings}
                  label={settingsPinnedGhost ? 'Unpin settings (ghost)' : 'Pin settings (ghost)'}
                  className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                  unpressedIconClassName="text-foreground"
                />
                <span className="text-sm text-muted-foreground">Ghost variant</span>
              </div>

              <div className="flex items-center gap-2">
                <IconToggleButton
                  variant="ghost"
                  pressed={isFavoriteGhost}
                  onPressedChange={setIsFavoriteGhost}
                  icon={Star}
                  label={isFavoriteGhost ? 'Unfavorite (ghost)' : 'Favorite (ghost)'}
                  fillIconWhenPressed
                  pressedIconClassName="text-amber-400 fill-amber-400"
                  className="min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0"
                  unpressedIconClassName="text-foreground"
                />
                <span className="text-sm text-muted-foreground">Ghost favorite</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SteppersExamplesCard() {
  return (
    <Card id="steppers" className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Steppers</CardTitle>
        <CardDescription>Segmented progress indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Primary variant</Label>
          <Stepper value={2} max={4} variant="primary" />
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-medium">Success variant</Label>
          <Stepper value={4} max={4} variant="success" />
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-medium">Destructive variant</Label>
          <Stepper value={0} max={4} variant="destructive" />
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-medium">Custom label</Label>
          <Stepper value={3} max={5} variant="warning" labelSuffix="stages completed" />
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-medium">Continuous mode</Label>
          <Stepper value={3} max={5} variant="primary" mode="continuous" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SlidersExamplesCard() {
  const [sliderValue, setSliderValue] = useState([50])

  return (
    <Card id="sliders" className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sliders</CardTitle>
        <CardDescription>Adjustable values</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Opacity</Label>
            <span className="text-sm text-muted-foreground font-mono">{sliderValue[0]}%</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} value={sliderValue} onValueChange={setSliderValue} />
        </div>
      </CardContent>
    </Card>
  )
}

