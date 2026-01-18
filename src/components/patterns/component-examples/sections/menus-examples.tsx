import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  BottomMenu,
  BottomMenuContent,
  BottomMenuItem,
  BottomMenuSeparator,
  BottomMenuSection,
  BottomMenuTrigger,
} from '@/components/ui/bottom-menu'
import { SlidingSelector } from '@/components/ui/sliding-selector'
import { Bell, ChevronDown, Edit, LogOut, Menu, MoreVertical, Settings, Trash2, User } from 'lucide-react'

export function BottomMenuExamplesCard() {
  return (
    <Card id="bottom-menu" className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bottom sliding menu</CardTitle>
        <CardDescription>
          Slide-up menu cards from bottom - perfect alternative to dropdowns on mobile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">Simple bottom menu</Label>
            <BottomMenu>
              <BottomMenuTrigger asChild>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                  <Menu className="h-4 w-4 mr-2" />
                  Open Bottom Menu
                </Button>
              </BottomMenuTrigger>
              <BottomMenuContent>
                <BottomMenuSection>
                  <BottomMenuItem>
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </BottomMenuItem>
                  <BottomMenuItem>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </BottomMenuItem>
                  <BottomMenuItem>
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </BottomMenuItem>
                </BottomMenuSection>
                <BottomMenuSeparator />
                <BottomMenuSection>
                  <BottomMenuItem>
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </BottomMenuItem>
                </BottomMenuSection>
              </BottomMenuContent>
            </BottomMenu>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Bottom menu with header</Label>
            <BottomMenu>
              <BottomMenuTrigger asChild>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                  <MoreVertical className="h-4 w-4 mr-2" />
                  Menu with Header
                </Button>
              </BottomMenuTrigger>
              <BottomMenuContent showHeader>
                <BottomMenuSection title="Account">
                  <BottomMenuItem>
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </BottomMenuItem>
                  <BottomMenuItem>
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </BottomMenuItem>
                </BottomMenuSection>
                <BottomMenuSeparator />
                <BottomMenuSection title="Actions">
                  <BottomMenuItem>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">Delete Account</span>
                  </BottomMenuItem>
                </BottomMenuSection>
              </BottomMenuContent>
            </BottomMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SlidingSelectorExamplesCard() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [selectorValue, setSelectorValue] = useState<string | number>('option1')
  const [isMultiSelectorOpen, setIsMultiSelectorOpen] = useState(false)
  const [multiSelectorValue, setMultiSelectorValue] = useState<(string | number)[]>(['option1', 'option2'])

  return (
    <Card id="sliding-selector" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sliding selector</CardTitle>
        <CardDescription>iOS-style bottom picker for single selection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">Single selection</Label>
            <Button
              variant="ghost"
              className="w-full justify-between min-h-[48px] sm:min-h-0"
              onClick={() => setIsSelectorOpen(true)}
            >
              <span>{selectorValue ? `Selected: ${selectorValue}` : 'Select an option'}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
            <SlidingSelector
              open={isSelectorOpen}
              onOpenChange={setIsSelectorOpen}
              title="Select option"
              selectedValue={selectorValue}
              onSelect={(val) => setSelectorValue(val as string)}
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                { value: 'option4', label: 'Option 4' },
                { value: 'option5', label: 'Option 5' },
              ]}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Multiple selection</Label>
            <Button
              variant="ghost"
              className="w-full justify-between min-h-[48px] sm:min-h-0"
              onClick={() => setIsMultiSelectorOpen(true)}
            >
              <span className="truncate">
                {multiSelectorValue.length > 0
                  ? `Selected (${multiSelectorValue.length}): ${multiSelectorValue.join(', ')}`
                  : 'Select options'}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
            </Button>
            <SlidingSelector
              open={isMultiSelectorOpen}
              onOpenChange={setIsMultiSelectorOpen}
              title="Select multiple"
              multiple
              selectedValue={multiSelectorValue}
              onSelect={(val) => setMultiSelectorValue(val as (string | number)[])}
              options={[
                { value: 'option1', label: 'Marketing' },
                { value: 'option2', label: 'Design' },
                { value: 'option3', label: 'Engineering' },
                { value: 'option4', label: 'Sales' },
                { value: 'option5', label: 'Support' },
                { value: 'option6', label: 'Product' },
                { value: 'option7', label: 'Finance' },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

