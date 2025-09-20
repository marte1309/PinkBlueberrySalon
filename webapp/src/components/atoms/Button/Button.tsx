import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-body font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-luxury hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:shadow-lg hover:scale-105",
        outline: "border-2 border-foreground/30 bg-transparent text-foreground shadow-soft hover:bg-foreground/10 hover:border-foreground/50 hover:shadow-blue backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-blue hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
        luxury: "bg-gradient-luxury text-primary-foreground shadow-gold hover:shadow-luxury hover:scale-105 font-medium",
        watercolor: "bg-gradient-watercolor text-primary-foreground shadow-soft hover:shadow-luxury hover:scale-105 backdrop-blur-sm",
        hero: "bg-gradient-primary text-primary-foreground shadow-luxury hover:shadow-gold hover:scale-105 text-h3 px-10 py-4 font-medium",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3 text-small",
        lg: "h-14 rounded-lg px-8 text-body",
        xl: "h-16 rounded-xl px-10 text-h3",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }