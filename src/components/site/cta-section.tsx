import { ArrowRight, Phone, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Particles } from "./particles";

export function CtaSection({
  kicker,
  title,
  subtitle,
  ctaLabel,
}: {
  kicker?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-light py-24">
      <Particles density={35} />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand-electric/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          {kicker && (
            <span className="mb-5 inline-block rounded-full bg-brand-electric/15 px-4 py-1.5 text-sm font-bold text-brand-electric">
              {kicker}
            </span>
          )}
          <h2 className="mb-5 text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-white/65">
            {subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-amber px-8 py-4 text-base font-bold text-brand-navy shadow-xl shadow-brand-amber/30 transition-all hover:scale-[1.04] hover:bg-brand-amber-dark"
            >
              <Zap className="h-5 w-5" aria-hidden="true" />
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-4 text-base font-bold text-white transition-all hover:border-brand-electric hover:text-brand-electric"
            >
              <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
