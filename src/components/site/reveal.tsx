"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Apparition en douceur au défilement.
 * Robuste : le contenu est visible par défaut (SSR, JS désactivé, crawlers) ;
 * l'état masqué n'est appliqué qu'aux éléments encore hors écran au montage.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Élément déjà dans la fenêtre : on n'anime pas (pas de flash de contenu caché)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.style.transitionDelay = `${delay}s`;
    el.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "-60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
