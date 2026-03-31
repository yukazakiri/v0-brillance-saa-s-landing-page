"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import type React from "react";
import { cn } from "@/lib/utils";

export const PreviewCard: typeof PreviewCardPrimitive.Root =
  PreviewCardPrimitive.Root;

export function PreviewCardTrigger({
  children,
  className,
  asChild,
  ...props
}: PreviewCardPrimitive.Trigger.Props & {
  asChild?: boolean;
}): React.ReactElement {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      className={className}
      {...props}
    >
      {children}
    </PreviewCardPrimitive.Trigger>
  );
}

export function HoverCardContent({
  className,
  children,
  align = "center",
  side = "bottom",
  sideOffset = 4,
}: {
  className?: string;
  children: React.ReactNode;
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: number;
}): React.ReactElement {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        align={align}
        side={side}
        className="z-50"
        data-slot="preview-card-positioner"
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cn(
            "relative flex w-72 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className,
          )}
          data-slot="preview-card-content"
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export {
  PreviewCardPrimitive,
  PreviewCard as HoverCard,
  PreviewCardTrigger as HoverCardTrigger,
};
