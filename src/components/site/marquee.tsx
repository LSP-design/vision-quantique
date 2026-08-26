import { Zap } from "lucide-react";

/**
 * Bande défilante de mots-clés — ajoute du mouvement entre deux sections.
 * Le contenu est dupliqué pour une boucle continue ; pause au survol.
 */
export function Marquee({ items }: { items: string[] }) {
  const sequence = [...items, ...items];

  return (
    <div className="marquee overflow-hidden border-y border-brand-navy/8 bg-brand-navy py-4">
      <div className="marquee-track items-center gap-8">
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 text-sm font-semibold tracking-wide text-white/80"
          >
            {item}
            <Zap
              className="h-4 w-4 text-brand-amber"
              fill="currentColor"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
