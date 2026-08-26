import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * En-tête de section : pastille colorée, titre chaleureux, description.
 */
export function SectionHeader({
  kicker,
  title,
  description,
  light = false,
  center = false,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn("max-w-3xl", center && "mx-auto text-center", className)}
    >
      <span
        className={cn(
          "mb-4 inline-block rounded-full px-4 py-1.5 text-[0.8125rem] font-bold",
          light
            ? "bg-brand-electric/15 text-brand-electric"
            : "bg-brand-electric/10 text-brand-electric-dark"
        )}
      >
        {kicker}
      </span>
      <h2
        className={cn(
          "text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.6rem]",
          light ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            center && "mx-auto",
            light ? "text-white/65" : "text-brand-dark/65",
            "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
