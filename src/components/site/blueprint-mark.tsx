import { cn } from "@/lib/utils";

/**
 * Repère de calage façon plan technique (croix fine) — accent de marque
 * discret, à utiliser avec parcimonie dans les coins des sections sombres.
 */
export function BlueprintMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-4 w-4 text-brand-electric/50", className)}
    >
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
