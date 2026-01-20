import * as React from "react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

export const designOS = {
  presentation: "mobile" as const,
}

export type AuthRegisterLoginTab = "register" | "login"

export interface AuthRegisterLoginProps {
  tab?: AuthRegisterLoginTab
  defaultTab?: AuthRegisterLoginTab
  onTabChange?: (tab: AuthRegisterLoginTab) => void

  onSubmitRegister?: () => void
  onSubmitLogin?: () => void
  onForgotPassword?: () => void
}

function useControllableTab(value: AuthRegisterLoginTab | undefined, defaultValue: AuthRegisterLoginTab) {
  const [uncontrolled, setUncontrolled] = React.useState<AuthRegisterLoginTab>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const set = React.useCallback(
    (next: AuthRegisterLoginTab) => {
      if (!isControlled) setUncontrolled(next)
    },
    [isControlled]
  )

  return [current, set] as const
}

export default function AuthRegisterLogin({
  tab,
  defaultTab = "register",
  onTabChange,
  onSubmitRegister,
  onSubmitLogin,
  onForgotPassword,
}: AuthRegisterLoginProps) {
  const [currentTab, setCurrentTab] = useControllableTab(tab, defaultTab)

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-background">
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm rounded-[18px] border border-border bg-layer-1 p-5 shadow-sm">
          {/* Segmented switch */}
          <Tabs
            value={currentTab}
            onValueChange={(v) => {
              const next = v as AuthRegisterLoginTab
              setCurrentTab(next)
              onTabChange?.(next)
            }}
          >
            <TabsList className="w-full h-12 rounded-[12px] bg-layer-2 p-1">
              <TabsTrigger value="register" className="flex-1 h-full">
                Register
              </TabsTrigger>
              <TabsTrigger value="login" className="flex-1 h-full">
                Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="register" className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-register-full-name">Full name</Label>
                <Input id="auth-register-full-name" placeholder="John Doe" autoComplete="name" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-register-email">Email address</Label>
                <Input
                  id="auth-register-email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-register-store-name">Store name</Label>
                <Input
                  id="auth-register-store-name"
                  placeholder="My coffee shop"
                  autoComplete="organization"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-register-password">Password</Label>
                <Input
                  id="auth-register-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>

              <Button size="lg" className="w-full" onClick={onSubmitRegister}>
                Create store
              </Button>
            </TabsContent>

            <TabsContent value="login" className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-login-email">Email</Label>
                <Input id="auth-login-email" type="email" placeholder="name@example.com" autoComplete="email" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="auth-login-password">Password</Label>
                <Input
                  id="auth-login-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <Button size="lg" className="w-full" onClick={onSubmitLogin}>
                Log in
              </Button>

              <Button variant="link" className="w-full justify-center" onClick={onForgotPassword}>
                Forgot password?
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

