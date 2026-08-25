import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { CtaSection } from "./cta-section";

export type ServiceItem = { key: string; icon: LucideIcon };

/**
 * Gabarit commun aux trois pages de services détaillées
 * (résidentiel, commercial, industriel) — liste technique numérotée.
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

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <SectionHeader
            kicker={t("badge")}
            title={t("servicesTitle")}
            className="mb-14"
          />

          <div className="grid border-t border-brand-navy/10 md:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.key} delay={(i % 2) * 0.06}>
                <article className="flex h-full gap-6 border-b border-brand-navy/10 py-8 md:pr-10 md:odd:pr-10 md:even:pl-10 md:even:border-l md:even:border-brand-navy/10">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="text-sm font-bold text-brand-electric-dark/50"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-brand-navy/12 text-brand-electric-dark">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-brand-navy">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-dark/65">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </div>
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
