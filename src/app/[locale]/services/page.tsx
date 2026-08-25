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
  }[] = [
    { key: "residential", href: "/services/residentiel" },
    { key: "commercial", href: "/services/commercial" },
    { key: "industrial", href: "/services/industriel" },
  ];

  return (
    <>
      <PageHero
        badge={tCommon("sectors")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <div className="grid border-t border-brand-navy/12 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.key} delay={i * 0.08}>
                <Link
                  href={category.href}
                  className="group flex h-full flex-col border-b border-brand-navy/12 py-10 pr-8 transition-colors lg:border-b-0 lg:pl-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-brand-navy/12"
                >
                  <span
                    className="text-6xl font-extrabold text-brand-navy/[0.08] transition-colors group-hover:text-brand-electric/15"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="-mt-3 mb-3 text-2xl font-extrabold uppercase text-brand-navy">
                    {t(`${category.key}.title`)}
                  </h2>
                  <p className="mb-8 flex-1 leading-relaxed text-brand-dark/65">
                    {t(`${category.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-brand-electric-dark">
                    {t("viewDetails")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
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
