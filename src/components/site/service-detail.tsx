import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
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

      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
              {t("servicesTitle")}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.key} delay={(i % 4) * 0.08}>
                <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-brand-electric/10">
                  <CardContent className="p-6">
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric-dark">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-brand-navy">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-dark/70">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
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
