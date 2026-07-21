"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center text-left outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <span className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:border-secondary group-hover:text-secondary group-data-[state=open]:border-secondary group-data-[state=open]:text-secondary">
          <Plus className="size-4 group-data-[state=open]:hidden" aria-hidden="true" />
          <Minus className="hidden size-4 group-data-[state=open]:block" aria-hidden="true" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
