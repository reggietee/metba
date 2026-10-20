import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Restyled to MetBA tokens: rectangular, ink on paper, 1px borders, no shadows.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-ink bg-ink text-paper hover:bg-graphite hover:border-graphite",
        outline: "border-line-strong bg-transparent text-ink hover:border-ink",
        ghost: "border-transparent bg-transparent text-ink hover:bg-accent",
        link: "border-transparent px-0! text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink",
        // For dark sections and photography.
        inverse: "border-[#f5f3ee] bg-[#f5f3ee] text-[#111111] hover:bg-white hover:border-white",
        "outline-inverse":
          "border-white/40 bg-transparent text-[#f5f3ee] hover:border-white hover:bg-white/5",
        destructive: "border-destructive bg-destructive text-white hover:opacity-90",
        secondary: "border-transparent bg-secondary text-ink hover:bg-accent",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
