import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconTile } from '@/components/atoms/icon'
import { SettingsGroup } from '@/components/settings/settings-group'
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemDescription,
  SettingsItemIcon,
  SettingsItemTitle,
} from '@/components/settings/settings-item'
import { UserProfileRow } from '@/components/settings/user-profile-row'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImageTile } from '@/components/ui/image-tile'
import { Switch } from '@/components/ui/switch'
import { AlertTriangle, ChevronDown, ChevronRight, CreditCard, LogOut, MoreVertical, Printer, Settings, Store, User, WifiOff } from 'lucide-react'

function ItemRowCard({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card id={id} className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export function ItemRowSimpleTextExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-simple-text"
      title="Simple text item"
      description="Settings-style row without icon or trailing action"
    >
      <SettingsGroup>
        <SettingsItem>
          <SettingsItemContent>
            <SettingsItemTitle>Simple text item</SettingsItemTitle>
          </SettingsItemContent>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowToggleExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-toggle"
      title="Toggle option"
      description="Row with inline toggle control"
    >
      <SettingsGroup>
        <SettingsItem asChild>
          <div>
          <SettingsItemContent>
            <SettingsItemTitle>Toggle option</SettingsItemTitle>
            <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
          </SettingsItemContent>
          <SettingsItemAction>
            <Switch />
          </SettingsItemAction>
          </div>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowUserProfileExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-user-profile"
      title="User profile"
      description="Row with leading avatar, description, and trailing action button"
    >
      <SettingsGroup>
        <SettingsItem asChild>
          <div>
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
          </div>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowImageChevronExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-image-chevron"
      title="Coffee shop"
      description="Row with leading image tile and trailing chevron"
    >
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
    </ItemRowCard>
  )
}

export function ItemRowBadgeChevronExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-badge-chevron"
      title="Invoices"
      description="Row with trailing badge + chevron"
    >
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
    </ItemRowCard>
  )
}

export function ItemRowAvatarBadgeChevronExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-avatar-badge-chevron"
      title="Owner account"
      description="Row with avatar + trailing status + chevron"
    >
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
    </ItemRowCard>
  )
}

export function ItemRowValueChevronExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-value-chevron"
      title="General"
      description="Row with trailing value + chevron"
    >
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
    </ItemRowCard>
  )
}

export function ItemRowInlineButtonExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-inline-button"
      title="Kitchen printer"
      description="Row with trailing button action"
    >
      <SettingsGroup>
        <SettingsItem asChild>
          <div>
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
          </div>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowInlineButtonsExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-inline-buttons"
      title="Order alerts"
      description="Row with inline button row inside content"
    >
      <SettingsGroup>
        <SettingsItem asChild className="items-start">
          <div>
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
          </div>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowDestructiveActionExamplesCard() {
  return (
    <ItemRowCard
      id="item-row-destructive-action"
      title="Receipt printer"
      description="Row with destructive trailing action"
    >
      <SettingsGroup>
        <SettingsItem asChild>
          <div>
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
          </div>
        </SettingsItem>
      </SettingsGroup>
    </ItemRowCard>
  )
}

export function ItemRowsExamplesCard() {
  return (
    <Card id="item-rows" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Item rows</CardTitle>
        <CardDescription>
          Universal list rows for navigation, toggles, status, and actions (used across the app)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primitives */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">Primitives</div>

          <SettingsGroup>
            <UserProfileRow name="Ghhh" email="holodroid23@gmail.com" />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={Store} size="small" variant="tile" tone="info" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Inventory</SettingsItemTitle>
                <SettingsItemDescription>Manage products and stock</SettingsItemDescription>
              </SettingsItemContent>
              <SettingsItemAction>
                <ChevronDown className="h-4 w-4 text-muted-foreground rotate-270" />
              </SettingsItemAction>
            </SettingsItem>

            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={CreditCard} size="small" variant="tile" tone="success" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Expenses</SettingsItemTitle>
                <SettingsItemDescription>Track business spending</SettingsItemDescription>
              </SettingsItemContent>
            </SettingsItem>
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={Settings} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>General</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>

            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={User} size="small" variant="tile" tone="neutral" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Users</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>

            <SettingsItem>
              <SettingsItemIcon>
                <IconTile icon={LogOut} size="small" variant="tile" tone="danger" />
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle className="text-onLayer-danger">Log out</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>
          </SettingsGroup>
        </div>

        {/* Examples */}
        <div className="space-y-3 pt-6 border-t border-border">
          <div className="text-sm font-medium text-muted-foreground">Examples</div>

          <SettingsGroup>
            <SettingsItem>
              <SettingsItemContent>
                <SettingsItemTitle>Simple text item</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem asChild>
              <div>
              <SettingsItemContent>
                <SettingsItemTitle>Toggle option</SettingsItemTitle>
                <SettingsItemDescription>Enable or disable this setting</SettingsItemDescription>
              </SettingsItemContent>
              <SettingsItemAction>
                <Switch />
              </SettingsItemAction>
              </div>
            </SettingsItem>
          </SettingsGroup>

          <SettingsGroup>
            <SettingsItem asChild>
              <div>
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
              </div>
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
        </div>
      </CardContent>
    </Card>
  )
}

