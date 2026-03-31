"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type React from "react";
import { cn } from "@/lib/utils";

export const HoverCard = HoverCardPrimitive.Root;

export function HoverCardTrigger({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger> & {
  asChild?: boolean;
}): React.ReactElement {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={className}
      asChild={asChild}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Trigger>
  );
}

export function HoverCardContent({
  className,
  children,
  align = "center",
  side = "bottom",
  sideOffset = 4,
}: React.ComponentProps<typeof HoverCardPrimitive.Content>): React.ReactElement {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        data-slot="hover-card-content"
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCardPrimitive };