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
import { SettingsFooter } from '@/components/settings/settings-footer'
import { UserProfileRow } from '@/components/settings/user-profile-row'
import { ChevronDown, CreditCard, LogOut, Settings, Store, User } from 'lucide-react'

export function SettingsComponentsExamplesCard() {
  return (
    <Card id="settings-components" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Settings components</CardTitle>
        <CardDescription>SettingsGroup, SettingsItem, UserProfileRow, SettingsFooter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">User profile row</div>
          <SettingsGroup>
            <UserProfileRow name="Ghhh" email="holodroid23@gmail.com" />
          </SettingsGroup>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">Settings groups</div>

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

          <SettingsFooter version="VERSION 2.4.1" build="89" />
        </div>
      </CardContent>
    </Card>
  )
}

