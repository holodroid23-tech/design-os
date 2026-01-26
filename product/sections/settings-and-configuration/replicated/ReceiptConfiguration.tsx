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
import { Calendar, ChevronLeft, Clock, Hash, QrCode, User } from "lucide-react"

export interface ReceiptConfigurationProps {
  onBack?: () => void
}

export default function ReceiptConfiguration({ onBack }: ReceiptConfigurationProps) {
  const [showTopControls, setShowTopControls] = React.useState(true)
  const lastScrollTopRef = React.useRef(0)
  const [tab, setTab] = React.useState<"design" | "preview">("design")
  const [hasLogo, setHasLogo] = React.useState(false)

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

  const hasIncludedDetails =
    includedDetails.date || includedDetails.time || includedDetails.orderId || includedDetails.cashierName

  const receiptWidthClass = paperSize === "58mm" ? "max-w-[260px]" : "max-w-[340px]"
  const receiptFontClass = typographyFamily === "monospace" ? "font-mono" : "font-sans"
  const receiptTextSizeClass = fontSize === "small" ? "text-xs" : fontSize === "large" ? "text-sm" : "text-sm"
  const separatorBorderClass =
    separatorStyle === "dashed"
      ? "border-dashed"
      : separatorStyle === "dotted"
        ? "border-dotted"
        : "border-solid"

  return (
    <div className="flex h-full min-h-full flex-col bg-background">
      {/* Block 1: Header */}
      <div className="sticky top-0 z-10 bg-background px-6 py-4">
        <Button
          type="button"
          variant="invisible"
          className="group w-full h-auto p-0 justify-start text-left"
          onClick={onBack}
        >
          <SectionTitle
            interactive
            leading={
              <ChevronLeft className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
            }
          >
            Receipt
          </SectionTitle>
        </Button>
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
            className={`sticky top-0 z-10 bg-background transition-transform duration-200 ${showTopControls ? "translate-y-0" : "-translate-y-[calc(100%+30px)]"
              }`}
          >
            <TabsList className="w-full">
              <TabsTrigger value="design">
                Design
              </TabsTrigger>
              <TabsTrigger value="preview">
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="design" className="mt-6">
            <div className="flex flex-col gap-8">
              <Button className="w-full" type="button" onClick={() => setHasLogo(true)}>
                Upload logo
              </Button>

              {/* Block 3: Included details */}
              <div className="flex flex-col gap-3">
                <Label className="text-muted-foreground">Included details</Label>
                <SettingsGroup>
                  <SettingsItem element="div">
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

                  <SettingsItem element="div">
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

                  <SettingsItem element="div">
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

                  <SettingsItem element="div">
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

                <div className="flex items-center gap-3">
                  <Label htmlFor="show-qr-code">Show QR code</Label>
                  <Switch
                    id="show-qr-code"
                    checked={showQrCode}
                    onCheckedChange={(checked) => setShowQrCode(Boolean(checked))}
                    aria-label="Show QR code"
                  />
                </div>

                {showQrCode ? (
                  <div className="pb-6">
                    <Button className="w-full" variant="secondary" type="button">
                      Upload QR code
                    </Button>
                  </div>
                ) : (
                  <div className="pb-6" />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="flex flex-col gap-6">
              <Button className="w-full" type="button">
                Test print
              </Button>

              <div className="flex justify-center">
                <div
                  className={[
                    "w-full rounded-[12px] border border-black/10 bg-white p-6 text-black",
                    receiptWidthClass,
                    receiptFontClass,
                    receiptTextSizeClass,
                  ].join(" ")}
                >
                  <div className="text-center">
                    {hasLogo ? (
                      <div className="text-lg font-semibold leading-tight">Compost</div>
                    ) : null}
                    <div className="mt-2 space-y-0.5 text-xs text-black/60">
                      <div>123 Espresso Lane</div>
                      <div>Seattle, WA 98101</div>
                      <div>Tel: (206) 555-0123</div>
                    </div>
                  </div>

                  {hasIncludedDetails ? (
                    <div className="mt-4 space-y-3">
                      <div className={["border-t border-black/20", separatorBorderClass].join(" ")} />

                      <div className="space-y-1 text-black/70">
                        {includedDetails.orderId ? (
                          <div className="flex items-center justify-between gap-4">
                            <span>Receipt #</span>
                            <span className="text-black">ORD-2023-892</span>
                          </div>
                        ) : null}
                        {includedDetails.date || includedDetails.time ? (
                          <div className="flex items-center justify-between gap-4">
                            <span>Date</span>
                            <span className="text-black">
                              {includedDetails.date ? "Oct 24, 2023" : null}
                              {includedDetails.date && includedDetails.time ? " · " : null}
                              {includedDetails.time ? "09:41 AM" : null}
                            </span>
                          </div>
                        ) : null}
                        {includedDetails.cashierName ? (
                          <div className="flex items-center justify-between gap-4">
                            <span>Cashier</span>
                            <span className="text-black">Sarah J.</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  <div className={["my-4 border-t border-black/20", separatorBorderClass].join(" ")} />

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-black">Latte (Large)</span>
                      <span className="text-black">$6.50</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-black">Croissant</span>
                      <span className="text-black">$4.00</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-black">Avocado toast</span>
                      <span className="text-black">$12.00</span>
                    </div>
                  </div>

                  <div className={["my-4 border-t border-black/20", separatorBorderClass].join(" ")} />

                  <div className="space-y-1 text-black/70">
                    <div className="flex items-baseline justify-between gap-4">
                      <span>Subtotal</span>
                      <span className="text-black">$22.50</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span>Tax (8.0%)</span>
                      <span className="text-black">$1.80</span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-4">
                      <span className="text-black font-semibold">Total</span>
                      <span className="text-black font-semibold">$24.30</span>
                    </div>
                  </div>

                  <div className={["my-4 border-t border-black/20", separatorBorderClass].join(" ")} />

                  <div className="space-y-2 text-center">
                    <div className="text-black">{footerMessage || " "}</div>
                    <div className="text-xs text-black/60">{websiteUrl || " "}</div>
                  </div>

                  {showQrCode ? (
                    <div className="mt-5 flex flex-col items-center gap-2">
                      <div className="grid size-28 place-items-center rounded-[12px] border border-black/20 bg-white">
                        <QrCode className="size-12 text-black/60" aria-hidden="true" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

