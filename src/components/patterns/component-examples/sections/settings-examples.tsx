import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
            <UserProfileRow name="Ghhh" email="holodroid23@gmail.com" initials="G" />
          </SettingsGroup>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">Settings groups</div>

          <SettingsGroup>
            <SettingsItem>
              <SettingsItemIcon>
                <div className="h-10 w-10 rounded-lg bg-layer-info text-on-layer-info flex items-center justify-center">
                  <Store className="h-5 w-5" />
                </div>
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
                <div className="h-10 w-10 rounded-lg bg-layer-success text-on-layer-success flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
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
                <div className="h-10 w-10 rounded-lg bg-layer-2 text-foreground flex items-center justify-center">
                  <Settings className="h-5 w-5" />
                </div>
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>General</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>

            <SettingsItem>
              <SettingsItemIcon>
                <div className="h-10 w-10 rounded-lg bg-layer-2 text-foreground flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle>Users</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>

            <SettingsItem className="hover:bg-destructive/5">
              <SettingsItemIcon>
                <div className="h-10 w-10 rounded-lg bg-layer-danger text-on-layer-danger flex items-center justify-center">
                  <LogOut className="h-5 w-5" />
                </div>
              </SettingsItemIcon>
              <SettingsItemContent>
                <SettingsItemTitle className="text-on-layer-danger">Log out</SettingsItemTitle>
              </SettingsItemContent>
            </SettingsItem>
          </SettingsGroup>

          <SettingsFooter version="VERSION 2.4.1" build="89" />
        </div>
      </CardContent>
    </Card>
  )
}

