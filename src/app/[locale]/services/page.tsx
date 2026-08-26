import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CtaSection } from "@/components/site/cta-section";
import {
  CommercialArt,
  IndustrialArt,
  ResidentialArt,
} from "@/components/site/sector-art";

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
    href: AppPathname;
    art: React.ReactNode;
  }[] = [
    { key: "residential", href: "/services/residentiel", art: <ResidentialArt /> },
    { key: "commercial", href: "/services/commercial", art: <CommercialArt /> },
    { key: "industrial", href: "/services/industriel", art: <IndustrialArt /> },
  ];

  return (
    <>
      <PageHero
        badge={tCommon("sectors")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-brand-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {categories.map((category, i) => (
            <Reveal key={category.key} delay={i * 0.1}>
              <Link
                href={category.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-navy/10"
              >
                <div className="h-52 bg-gradient-to-br from-brand-navy-deep to-brand-navy-light p-6">
                  {category.art}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="mb-2.5 text-2xl font-extrabold text-brand-navy">
                    {t(`${category.key}.title`)}
                  </h2>
                  <p className="mb-6 flex-1 leading-relaxed text-brand-dark/65">
                    {t(`${category.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-2 font-bold text-brand-electric-dark">
                    {t("viewDetails")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
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
