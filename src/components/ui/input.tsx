import * as React from "react";
import { cn } from "@/lib/utils";

const inputClasses =
  "flex w-full rounded-sm border border-brand-navy/15 bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-brand-dark/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:border-transparent disabled:opacity-50";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(inputClasses, className)} {...props} />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(inputClasses, "min-h-32 resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select ref={ref} className={cn(inputClasses, "h-11", className)} {...props} />
));
Select.displayName = "Select";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("mb-1.5 block text-sm font-medium text-brand-navy", className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Input, Textarea, Select, Label };
