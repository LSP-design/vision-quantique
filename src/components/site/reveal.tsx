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

    const reveal = () => {
      el.classList.add("reveal-visible");
      observer.disconnect();
      clearTimeout(fallback);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { rootMargin: "-60px 0px" }
    );
    observer.observe(el);

    // Filet de sécurité : garantit que le contenu apparaît même si
    // l'observer ne se déclenche jamais (capture plein-page sans défilement
    // réel, outil d'audit, etc.) — jamais de contenu durablement invisible.
    // Le délai d'échelonnement est annulé pour un affichage immédiat.
    const fallback = setTimeout(() => {
      el.style.transitionDelay = "0s";
      reveal();
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
