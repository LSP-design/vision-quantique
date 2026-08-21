import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-amber text-brand-navy hover:bg-brand-amber-dark shadow-lg shadow-brand-amber/20",
        secondary:
          "border-2 border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10",
        electric:
          "bg-brand-electric text-white hover:bg-brand-electric-dark shadow-lg shadow-brand-electric/20",
        outline:
          "border-2 border-brand-navy/15 bg-transparent text-brand-navy hover:border-brand-electric hover:text-brand-electric",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 py-3.5 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
