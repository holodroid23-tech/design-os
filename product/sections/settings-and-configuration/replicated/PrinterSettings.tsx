import * as React from "react"
import { ChevronLeft, Printer } from "lucide-react"

import { SettingsItemDescription, SettingsItemTitle } from "@/components/settings/settings-item"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconTile } from "@/components/ui/icon"
import { SectionTitle } from "@/components/ui/section-title"

export const designOS = {
  presentation: "mobile" as const,
}

export default function PrinterSettings() {
  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 border-b bg-background px-6 py-4">
        <button type="button" className="group w-full text-left">
          <SectionTitle
            interactive
            titleAs="h2"
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
            }
          >
            Printer
          </SectionTitle>
        </button>
      </div>

      {/* Block 2: Printer status */}
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <SectionTitle titleAs="h2">Printer status</SectionTitle>

          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <IconTile icon={Printer} size="medium" variant="tile" tone="success" />
                <div className="flex flex-col gap-1">
                  <SettingsItemTitle>mPOP Printer</SettingsItemTitle>
                  <SettingsItemDescription size="tiny" tone="success">
                    Connected
                  </SettingsItemDescription>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="ghost" size="lg" className="flex-1">
                  Test print
                </Button>
                <Button type="button" variant="destructive" size="lg" className="flex-1">
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Block 3: Paper size */}
      {/* Block 4: Hardware discovery */}
    </div>
  )
}

