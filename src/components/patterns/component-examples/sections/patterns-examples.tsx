import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Bell, Mail, Settings, User } from 'lucide-react'

export function NavigationMenuExamplesCard() {
  return (
    <Card id="navigation-menu" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Navigation menu
        </CardTitle>
        <CardDescription>Example navigation items (min 48px touch target)</CardDescription>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
            <Mail className="h-4 w-4" />
            Messages
          </Button>
          <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Separator className="my-2" />
          <Button variant="invisible" className="w-full justify-start min-h-[48px] sm:min-h-0">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </CardContent>
    </Card>
  )
}

export function StatsCardsExamplesCard() {
  return (
    <Card id="stats-cards" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Stats cards
        </CardTitle>
        <CardDescription>Dashboard-style metric cards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription>Total revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                $45,231
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription>Active users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                2,350
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                12,234
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

