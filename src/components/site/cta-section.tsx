import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";

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
    <section className="relative overflow-hidden bg-brand-navy-deep py-24">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div className="hero-beam absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {kicker && (
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-electric">
                <span className="h-px w-10 bg-brand-electric/60" aria-hidden="true" />
                {kicker}
              </p>
            )}
            <h2 className="mb-5 max-w-xl text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="border border-white/12 bg-white/[0.045] p-8">
              <Link
                href="/contact"
                className="flex h-13 items-center justify-center rounded-sm bg-brand-amber px-8 text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-brand-navy transition-colors hover:bg-brand-amber-dark"
              >
                {ctaLabel}
              </Link>
              <div className="my-6 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <a
                href={site.phoneHref}
                className="group flex items-center justify-center gap-3 text-white"
              >
                <Phone className="h-5 w-5 text-brand-electric" aria-hidden="true" />
                <span
                  className="text-2xl font-bold tracking-wide transition-colors group-hover:text-brand-electric"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {site.phone}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
