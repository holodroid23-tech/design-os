"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "size-9",   // 36px
        large: "size-12",    // 48px
      },
        variant: {
        default: "",
        primary: "bg-[linear-gradient(180deg,#20c54f_0%,#135428_100%)] text-white",
        secondary: "bg-secondary text-secondary-foreground",
        blue: "bg-[linear-gradient(180deg,#2f79ff_0%,#103a9f_100%)] text-white",
        cyan: "bg-[linear-gradient(180deg,#00bcd4_0%,#006064_100%)] text-white",
        teal: "bg-[linear-gradient(180deg,#05c7bb_0%,#0e5352_100%)] text-white",
        emerald: "bg-[linear-gradient(180deg,#20c54f_0%,#135428_100%)] text-white",
        lime: "bg-[linear-gradient(180deg,#84cc16_0%,#365314_100%)] text-white",
        orange: "bg-[linear-gradient(180deg,#ff5a1f_0%,#7f1c0f_100%)] text-white",
        red: "bg-[linear-gradient(180deg,#ed4646_0%,#7e1e1e_100%)] text-white",
        pink: "bg-[linear-gradient(180deg,#ec4899_0%,#831843_100%)] text-white",
        purple: "bg-[linear-gradient(180deg,#9c27b0_0%,#4a148c_100%)] text-white",
        indigo: "bg-[linear-gradient(180deg,#6666ff_0%,#291a98_100%)] text-white",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  VariantProps<typeof avatarVariants> {
  online?: boolean
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, variant, online, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      data-variant={variant}
      className={cn("group/avatar", avatarVariants({ size, variant, className }))}
      {...props}
    />
    {online && (
      <span className={cn(
        "absolute bottom-0 right-0 rounded-full border-2 border-background bg-[#20c54f] z-10",
        size === "large" ? "size-3.5" : "size-2.5"
      )} />
    )}
  </div>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square size-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "bg-muted flex size-full items-center justify-center rounded-full text-foreground font-medium",
      "group-data-[variant=primary]/avatar:bg-transparent group-data-[variant=primary]/avatar:text-white",
      "group-data-[variant=blue]/avatar:bg-transparent group-data-[variant=blue]/avatar:text-white",
      "group-data-[variant=cyan]/avatar:bg-transparent group-data-[variant=cyan]/avatar:text-white",
      "group-data-[variant=teal]/avatar:bg-transparent group-data-[variant=teal]/avatar:text-white",
      "group-data-[variant=emerald]/avatar:bg-transparent group-data-[variant=emerald]/avatar:text-white",
      "group-data-[variant=lime]/avatar:bg-transparent group-data-[variant=lime]/avatar:text-white",
      "group-data-[variant=orange]/avatar:bg-transparent group-data-[variant=orange]/avatar:text-white",
      "group-data-[variant=red]/avatar:bg-transparent group-data-[variant=red]/avatar:text-white",
      "group-data-[variant=pink]/avatar:bg-transparent group-data-[variant=pink]/avatar:text-white",
      "group-data-[variant=purple]/avatar:bg-transparent group-data-[variant=purple]/avatar:text-white",
      "group-data-[variant=indigo]/avatar:bg-transparent group-data-[variant=indigo]/avatar:text-white",
      "group-data-[variant=secondary]/avatar:bg-secondary group-data-[variant=secondary]/avatar:text-secondary-foreground",
      "&_svg:size-3.5 group-data-[size=large]/avatar:&_svg:size-5",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
