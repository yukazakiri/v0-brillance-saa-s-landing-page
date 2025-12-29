"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const applyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold tracking-wider uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a3a52] text-white hover:bg-[#1a3a52]/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-[rgb(199,146,68)] text-white hover:bg-[rgb(199,146,68)]/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-[#1a3a52] text-[#1a3a52] bg-transparent hover:bg-[#1a3a52] hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        gradient:
          "bg-gradient-to-r from-[#1a3a52] to-[#1a3a52]/80 text-white hover:from-[#1a3a52]/90 hover:to-[#1a3a52]/70 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-6 text-sm",
        compact: "h-8 px-4 text-xs",
        large: "h-12 px-8 text-base",
        header: "px-6 py-2.5 text-xs",
      },
      animated: {
        true: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: false,
    },
  }
)

export interface ApplyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof applyButtonVariants> {
  loading?: boolean
  onClick?: () => void | Promise<void>
}

const ApplyButton = React.forwardRef<HTMLButtonElement, ApplyButtonProps>(
  ({ className, variant, size, animated, loading = false, children, onClick, disabled, ...props }, ref) => {
    const [isClicked, setIsClicked] = React.useState(false)
    
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return
      
      setIsClicked(true)
      try {
        await onClick?.()
      } finally {
        setTimeout(() => setIsClicked(false), 300)
      }
    }

    const buttonContent = React.useMemo(() => (
      <>
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    ), [loading, children])

    return (
      <button
        className={cn(applyButtonVariants({ variant, size, animated }), className)}
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        data-state={isClicked ? "active" : "idle"}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)
ApplyButton.displayName = "ApplyButton"

export { ApplyButton, applyButtonVariants }