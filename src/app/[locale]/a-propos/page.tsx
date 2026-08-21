import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Crosshair, Eye, ShieldCheck } from "lucide-react";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { LogoMark } from "@/components/site/logo";
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
  return buildMetadata({ locale, namespace: "about", pathname: "/a-propos" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const values = [
    { key: "safety", icon: ShieldCheck },
    { key: "precision", icon: Crosshair },
    { key: "transparency", icon: Eye },
  ] as const;

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("intro")} />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-brand-cream p-8 sm:p-10">
              <LogoMark className="mb-6 h-16 w-16" />
              <h2 className="mb-2 text-2xl font-bold text-brand-navy sm:text-3xl">
                {t("ownerTitle")}
              </h2>
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-electric-dark">
                {tCommon("masterElectrician")}
              </p>
              <p className="mb-4 leading-relaxed text-brand-dark/80">
                {t("ownerBio1")}
              </p>
              <p className="leading-relaxed text-brand-dark/80">
                {t("ownerBio2")}
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <h2 className="mb-3 text-2xl font-bold text-brand-navy sm:text-3xl">
                {t("missionTitle")}
              </h2>
              <p className="text-lg leading-relaxed text-brand-dark/75">
                {t("missionText")}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="mb-5 text-2xl font-bold text-brand-navy sm:text-3xl">
                {t("values.title")}
              </h2>
              <div className="space-y-4">
                {values.map((value) => (
                  <Card key={value.key}>
                    <CardContent className="flex items-start gap-4 p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-electric/10 text-brand-electric-dark">
                        <value.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="mb-1 font-bold text-brand-navy">
                          {t(`values.${value.key}.title`)}
                        </h3>
                        <p className="text-sm leading-relaxed text-brand-dark/70">
                          {t(`values.${value.key}.description`)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-16">
        <div className="circuit-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6">
          <Reveal>
            <ShieldCheck
              className="mx-auto mb-4 h-12 w-12 text-brand-electric"
              aria-hidden="true"
            />
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              {t("cmeqTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-white/75">{t("cmeqText")}</p>
          </Reveal>
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
