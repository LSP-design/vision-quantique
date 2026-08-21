import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, Factory, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaSection } from "@/components/site/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({ locale, namespace: "services", pathname: "/services" });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  const categories: {
    key: "residential" | "commercial" | "industrial";
    icon: typeof Home;
    href: AppPathname;
  }[] = [
    { key: "residential", icon: Home, href: "/services/residentiel" },
    { key: "commercial", icon: Building2, href: "/services/commercial" },
    { key: "industrial", icon: Factory, href: "/services/industriel" },
  ];

  return (
    <>
      <PageHero
        badge={tCommon("sectors")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-brand-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {categories.map((category, i) => (
            <Reveal key={category.key} delay={i * 0.1}>
              <Card className="group h-full transition-shadow hover:shadow-xl hover:shadow-brand-electric/10">
                <CardContent className="flex h-full flex-col p-8">
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-electric to-brand-electric-dark text-white shadow-lg shadow-brand-electric/20">
                    <category.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h2 className="mb-3 text-xl font-bold text-brand-navy">
                    {t(`${category.key}.title`)}
                  </h2>
                  <p className="mb-6 flex-1 text-brand-dark/70">
                    {t(`${category.key}.description`)}
                  </p>
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-electric-dark transition-colors group-hover:text-brand-electric"
                  >
                    {t("viewDetails")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
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
