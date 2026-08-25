import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * En-tête de section éditorial : surtitre avec filet, titre, description.
 * Aligné à gauche par défaut — jamais centré, pour éviter l'effet gabarit.
 */
export function SectionHeader({
  kicker,
  title,
  description,
  light = false,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
          light ? "text-brand-electric" : "text-brand-electric-dark"
        )}
      >
        <span
          className="h-px w-10 bg-current opacity-60"
          aria-hidden="true"
        />
        {kicker}
      </p>
      <h2
        className={cn(
          "text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/65" : "text-brand-dark/65"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
