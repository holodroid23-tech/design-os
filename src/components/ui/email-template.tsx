import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"

export interface EmailTemplateCta {
  label: string
  onClick?: () => void
  trailing?: React.ReactNode
}

export interface EmailTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  heroSrc?: string
  heroAlt?: string

  title: string
  body: React.ReactNode

  /**
   * Optional extra content between body and CTA
   * (e.g., checklist cards, secondary links).
   */
  children?: React.ReactNode

  cta?: EmailTemplateCta
  footer?: React.ReactNode
}

export function EmailTemplate({
  className,
  heroSrc,
  heroAlt = "",
  title,
  body,
  children,
  cta,
  footer,
  ...props
}: EmailTemplateProps) {
  return (
    <div
      data-slot="email-template"
      className={cn(
        // Force dark theme tokens within the email, independent of app theme.
        "dark w-full rounded-[18px] bg-layer-level-0 text-foreground",
        className,
      )}
      {...props}
    >
      {/* Hero */}
      {heroSrc ? (
        <div className="relative w-full overflow-hidden rounded-t-[18px]">
          <div className="relative w-full aspect-[4/3]">
            <img src={heroSrc} alt={heroAlt} className="h-full w-full object-cover" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-layer-level-0 via-transparent to-transparent"
            />
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className="px-6 pb-10 pt-6 sm:px-10 sm:pb-12">
        <div className="mx-auto w-full max-w-[600px]">
          <div className="text-center">
            <SectionTitle size="page" titleAs="h1" className="justify-center">
              {title}
            </SectionTitle>
            <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
          </div>

          {children ? <div className="mt-8">{children}</div> : null}

          {cta ? (
            <div className="mt-8">
              <Button
                type="button"
                variant="default"
                size="lg"
                className="w-full"
                onClick={cta.onClick}
              >
                {cta.label}
                {cta.trailing}
              </Button>
            </div>
          ) : null}

          {footer ? (
            <div className="mt-8">
              <div className="text-center text-xs text-muted-foreground">{footer}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

