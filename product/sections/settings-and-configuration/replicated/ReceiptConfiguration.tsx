import * as React from "react"

import { SettingsGroup } from "@/components/settings/settings-group"
import {
  SettingsItem,
  SettingsItemAction,
  SettingsItemContent,
  SettingsItemIcon,
  SettingsItemTitle,
} from "@/components/settings/settings-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioButtonGroup, RadioButtonGroupItem } from "@/components/ui/radio-button-group"
import { SectionTitle } from "@/components/ui/section-title"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, Clock, Hash, User } from "lucide-react"

export default function ReceiptConfiguration() {
  const [showTopControls, setShowTopControls] = React.useState(true)
  const lastScrollTopRef = React.useRef(0)
  const [tab, setTab] = React.useState<"design" | "preview">("design")

  const [includedDetails, setIncludedDetails] = React.useState({
    date: true,
    time: true,
    orderId: true,
    cashierName: false,
  })
  const [paperSize, setPaperSize] = React.useState<"58mm" | "80mm">("58mm")
  const [typographyFamily, setTypographyFamily] = React.useState<"monospace" | "sans-serif">(
    "monospace"
  )
  const [fontSize, setFontSize] = React.useState<"small" | "medium" | "large">("medium")
  const [separatorStyle, setSeparatorStyle] = React.useState<"dashed" | "dotted" | "solid">(
    "dashed"
  )
  const [footerMessage, setFooterMessage] = React.useState("Thank you for visiting!")
  const [websiteUrl, setWebsiteUrl] = React.useState("www.yourstore.com")
  const [showQrCode, setShowQrCode] = React.useState(false)

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 bg-background px-6 py-4">
        <button type="button" className="w-full text-left group">
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
          >
            Receipt
          </SectionTitle>
        </button>
      </div>

      {/* Block 2: View mode */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop
          const prev = lastScrollTopRef.current
          const delta = scrollTop - prev

          if (scrollTop < 8) {
            setShowTopControls(true)
          } else if (delta > 10) {
            setShowTopControls(false)
          } else if (delta < -10) {
            setShowTopControls(true)
          }

          lastScrollTopRef.current = scrollTop
        }}
      >
        <Tabs value={tab} onValueChange={(v) => setTab(v as "design" | "preview")} className="h-full">
          <div
            className={`sticky top-0 z-10 bg-background transition-transform duration-200 ${
              showTopControls ? "translate-y-0" : "-translate-y-[calc(100%+30px)]"
            }`}
          >
            <TabsList className="w-full">
              <TabsTrigger value="design" className="flex-1">
                Design
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="design" className="mt-6">
            <div className="flex flex-col gap-8">
              <Button className="w-full" type="button">
                Upload logo
              </Button>

              {/* Block 3: Included details */}
              <div className="flex flex-col gap-3">
                <Label className="text-muted-foreground">Included details</Label>
                <SettingsGroup>
                  <SettingsItem type="button">
                    <SettingsItemIcon>
                      <Calendar className="size-5" aria-hidden="true" />
                    </SettingsItemIcon>
                    <SettingsItemContent>
                      <SettingsItemTitle>Date</SettingsItemTitle>
                    </SettingsItemContent>
                    <SettingsItemAction>
                      <Switch
                        checked={includedDetails.date}
                        onCheckedChange={(checked) =>
                          setIncludedDetails((prev) => ({ ...prev, date: Boolean(checked) }))
                        }
                        aria-label="Date"
                      />
                    </SettingsItemAction>
                  </SettingsItem>

                  <SettingsItem type="button">
                    <SettingsItemIcon>
                      <Clock className="size-5" aria-hidden="true" />
                    </SettingsItemIcon>
                    <SettingsItemContent>
                      <SettingsItemTitle>Time</SettingsItemTitle>
                    </SettingsItemContent>
                    <SettingsItemAction>
                      <Switch
                        checked={includedDetails.time}
                        onCheckedChange={(checked) =>
                          setIncludedDetails((prev) => ({ ...prev, time: Boolean(checked) }))
                        }
                        aria-label="Time"
                      />
                    </SettingsItemAction>
                  </SettingsItem>

                  <SettingsItem type="button">
                    <SettingsItemIcon>
                      <Hash className="size-5" aria-hidden="true" />
                    </SettingsItemIcon>
                    <SettingsItemContent>
                      <SettingsItemTitle>Order ID</SettingsItemTitle>
                    </SettingsItemContent>
                    <SettingsItemAction>
                      <Switch
                        checked={includedDetails.orderId}
                        onCheckedChange={(checked) =>
                          setIncludedDetails((prev) => ({ ...prev, orderId: Boolean(checked) }))
                        }
                        aria-label="Order ID"
                      />
                    </SettingsItemAction>
                  </SettingsItem>

                  <SettingsItem type="button">
                    <SettingsItemIcon>
                      <User className="size-5" aria-hidden="true" />
                    </SettingsItemIcon>
                    <SettingsItemContent>
                      <SettingsItemTitle>Cashier name</SettingsItemTitle>
                    </SettingsItemContent>
                    <SettingsItemAction>
                      <Switch
                        checked={includedDetails.cashierName}
                        onCheckedChange={(checked) =>
                          setIncludedDetails((prev) => ({ ...prev, cashierName: Boolean(checked) }))
                        }
                        aria-label="Cashier name"
                      />
                    </SettingsItemAction>
                  </SettingsItem>
                </SettingsGroup>
              </div>

              {/* Block 4: Paper size + upload */}
              <div className="flex flex-col gap-3">
                <Label className="text-muted-foreground">Paper size</Label>
                <RadioButtonGroup
                  value={paperSize}
                  onValueChange={(v) => setPaperSize(v as "58mm" | "80mm")}
                  className="grid grid-cols-2 gap-3"
                >
                  <RadioButtonGroupItem value="58mm" variant="default" size="default">
                    58mm
                  </RadioButtonGroupItem>
                  <RadioButtonGroupItem value="80mm" variant="default" size="default">
                    80mm
                  </RadioButtonGroupItem>
                </RadioButtonGroup>
              </div>

              {/* Block 5: Typography controls */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <Label className="text-muted-foreground">Typography family</Label>
                  <RadioButtonGroup
                    value={typographyFamily}
                    onValueChange={(v) => setTypographyFamily(v as "monospace" | "sans-serif")}
                    className="grid grid-cols-2 gap-3"
                  >
                    <RadioButtonGroupItem value="monospace" variant="default" size="default">
                      <span className="font-mono">Monospace</span>
                    </RadioButtonGroupItem>
                    <RadioButtonGroupItem value="sans-serif" variant="default" size="default">
                      <span className="font-sans">Sans serif</span>
                    </RadioButtonGroupItem>
                  </RadioButtonGroup>
                </div>

                <div className="flex flex-col gap-3">
                  <Label className="text-muted-foreground">Font size</Label>
                  <RadioButtonGroup
                    value={fontSize}
                    onValueChange={(v) => setFontSize(v as "small" | "medium" | "large")}
                    className="grid grid-cols-3 gap-3"
                  >
                    <RadioButtonGroupItem value="small" variant="default" size="default">
                      Small
                    </RadioButtonGroupItem>
                    <RadioButtonGroupItem value="medium" variant="default" size="default">
                      Medium
                    </RadioButtonGroupItem>
                    <RadioButtonGroupItem value="large" variant="default" size="default">
                      Large
                    </RadioButtonGroupItem>
                  </RadioButtonGroup>
                </div>
              </div>

              {/* Block 6: Separator style */}
              <div className="flex flex-col gap-3">
                <Label className="text-muted-foreground">Separator style</Label>
                <RadioButtonGroup
                  value={separatorStyle}
                  onValueChange={(v) => setSeparatorStyle(v as "dashed" | "dotted" | "solid")}
                  className="grid grid-cols-3 gap-3"
                >
                  <RadioButtonGroupItem value="dashed" variant="card" size="card">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                        <div className="w-8 border-t-2 border-border border-dashed" aria-hidden="true" />
                      </div>
                      <div className="text-sm">Dashed</div>
                    </div>
                  </RadioButtonGroupItem>
                  <RadioButtonGroupItem value="dotted" variant="card" size="card">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                        <div className="w-8 border-t-2 border-border border-dotted" aria-hidden="true" />
                      </div>
                      <div className="text-sm">Dotted</div>
                    </div>
                  </RadioButtonGroupItem>
                  <RadioButtonGroupItem value="solid" variant="card" size="card">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-[12px] bg-muted/50 flex items-center justify-center">
                        <div className="w-8 border-t-2 border-border" aria-hidden="true" />
                      </div>
                      <div className="text-sm">Solid</div>
                    </div>
                  </RadioButtonGroupItem>
                </RadioButtonGroup>
              </div>

              {/* Block 7: Footer details */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="footer-message">Footer message</Label>
                  <Input
                    id="footer-message"
                    value={footerMessage}
                    onChange={(e) => setFooterMessage(e.target.value)}
                    placeholder="Thank you for visiting!"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input
                    id="website-url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="www.yourstore.com"
                  />
                </div>

                <div className="flex items-center gap-3 pb-6">
                  <Label htmlFor="show-qr-code">Show QR code</Label>
                  <Switch
                    id="show-qr-code"
                    checked={showQrCode}
                    onCheckedChange={(checked) => setShowQrCode(Boolean(checked))}
                    aria-label="Show QR code"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

