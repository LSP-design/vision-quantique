import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { CtaSection } from "./cta-section";

export type ServiceItem = { key: string; icon: LucideIcon };

/**
 * Gabarit commun aux trois pages de services détaillées
 * (résidentiel, commercial, industriel).
 */
export function ServiceDetail({
  namespace,
  items,
}: {
  namespace: "residential" | "commercial" | "industrial";
  items: ServiceItem[];
}) {
  const t = useTranslations(namespace);
  const tCommon = useTranslations("common");

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-brand-soft py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            center
            kicker={t("badge")}
            title={t("servicesTitle")}
            className="mb-14"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.key} delay={(i % 4) * 0.08}>
                <article className="h-full rounded-2xl border border-brand-navy/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-navy/8">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric-dark">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-lg font-extrabold text-brand-navy">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/65">
                    {t(`items.${item.key}.description`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={tCommon("requestQuote")}
      />
    </>
  );
}
