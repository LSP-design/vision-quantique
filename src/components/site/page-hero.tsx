import { useTranslations } from "next-intl";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  const tCommon = useTranslations("common");

  return (
    <section className="relative overflow-hidden bg-brand-navy-deep">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div className="hero-beam absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="py-20 lg:py-24">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-electric">
              <span className="h-px w-10 bg-brand-electric/60" aria-hidden="true" />
              {badge}
            </p>
            <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-5">
          <p className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/60">
            <MapPin className="h-4 w-4 text-brand-electric" aria-hidden="true" />
            {/* TODO: confirmer la zone de service exacte avec le client */}
            {tCommon("serviceArea")}
          </p>
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-2.5 text-white transition-colors hover:text-brand-electric"
          >
            <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
            <span
              className="text-lg font-bold tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {site.phone}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
