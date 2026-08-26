import { cn } from "@/lib/utils";

/**
 * Logo « V » stylisé en forme d'éclair, inspiré de la carte d'affaires.
 * TODO: remplacer par le fichier vectoriel officiel du logo lorsque le client le fournit.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <path
        d="M6 6 L16 6 L20 22 L24 6 L34 6 L23 34 L15 34 Z"
        fill="#0D6F9E"
      />
      <path d="M21 14 L28 14 L18 30 L21 20 L15 20 Z" fill="#F5A623" />
    </svg>
  );
}

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-lg font-extrabold tracking-tight",
            light ? "text-white" : "text-brand-navy"
          )}
        >
          Électricité
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-bold uppercase tracking-[0.16em]",
            light ? "text-brand-electric" : "text-brand-electric-dark"
          )}
        >
          Vision Quantique
        </span>
      </span>
    </span>
  );
}
