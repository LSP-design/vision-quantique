import { useTranslations } from "next-intl";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

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
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-light">
      <div
        className="pointer-events-none absolute -top-24 right-[-8%] h-80 w-80 rounded-full bg-brand-electric/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-18 lg:py-22">
          <span
            className="hero-enter inline-block rounded-full bg-brand-electric/15 px-4 py-1.5 text-sm font-bold text-brand-electric"
            style={{ animationDelay: "0.05s" }}
          >
            {badge}
          </span>
          <h1
            className="hero-enter mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl"
            style={{ animationDelay: "0.15s" }}
          >
            {title}
          </h1>
          <p
            className="hero-enter mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
            style={{ animationDelay: "0.28s" }}
          >
            {subtitle}
          </p>
        </div>

        <div
          className="hero-enter flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-5"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/60">
            <MapPin className="h-4 w-4 text-brand-electric" aria-hidden="true" />
            {/* TODO: confirmer la zone de service exacte avec le client */}
            {tCommon("serviceArea")}
          </p>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-brand-electric hover:text-brand-electric"
          >
            <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
