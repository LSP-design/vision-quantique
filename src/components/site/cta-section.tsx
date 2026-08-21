import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";

export function CtaSection({
  title,
  subtitle,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-electric/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/75">
            {subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-lg bg-brand-amber px-8 py-3.5 text-base font-bold text-brand-navy shadow-lg shadow-brand-amber/25 transition-colors hover:bg-brand-amber-dark"
            >
              {ctaLabel}
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border-2 border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              <Phone className="h-5 w-5 text-brand-electric" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
