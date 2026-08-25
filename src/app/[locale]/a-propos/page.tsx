import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Crosshair, Eye, ShieldCheck } from "lucide-react";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { LogoMark } from "@/components/site/logo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
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

      {/* Portrait du fondateur */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 xl:px-8">
          <Reveal className="lg:col-span-5">
            <div className="border border-brand-navy/10">
              <div
                className="h-1 w-full bg-gradient-to-r from-brand-electric via-brand-electric-dark to-brand-amber"
                aria-hidden="true"
              />
              <div className="p-8 sm:p-10">
                <LogoMark className="h-14 w-14" />
                <h2 className="mt-6 text-2xl font-bold text-brand-navy sm:text-3xl">
                  {t("ownerTitle")}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-electric-dark">
                  {tCommon("masterElectrician")}
                </p>
                <div className="my-6 h-px bg-brand-navy/10" aria-hidden="true" />
                <p className="leading-relaxed text-brand-dark/75">
                  {t("ownerBio1")}
                </p>
                <p className="mt-4 leading-relaxed text-brand-dark/75">
                  {t("ownerBio2")}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeader kicker={t("badge")} title={t("missionTitle")} />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-dark/70">
                {t("missionText")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mt-14 mb-2 text-xl font-bold text-brand-navy">
                {t("values.title")}
              </h3>
            </Reveal>
            <div className="border-t border-brand-navy/10">
              {values.map((value, i) => (
                <Reveal key={value.key} delay={i * 0.08}>
                  <div className="grid gap-3 border-b border-brand-navy/10 py-6 sm:grid-cols-[3.5rem_12rem_1fr] sm:gap-6">
                    <value.icon
                      className="h-6 w-6 text-brand-electric-dark"
                      aria-hidden="true"
                    />
                    <h4 className="text-lg font-bold text-brand-navy">
                      {t(`values.${value.key}.title`)}
                    </h4>
                    <p className="text-sm leading-relaxed text-brand-dark/65">
                      {t(`values.${value.key}.description`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bloc CMEQ */}
      <section className="relative overflow-hidden bg-brand-navy py-20">
        <div className="circuit-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-electric">
                <span className="h-px w-10 bg-brand-electric/60" aria-hidden="true" />
                CMEQ
              </p>
              <h2 className="mb-4 max-w-2xl text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
                {t("cmeqTitle")}
              </h2>
              <p className="max-w-2xl leading-relaxed text-white/70">
                {t("cmeqText")}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-4">
              <div className="flex items-center gap-5 border border-white/12 bg-white/[0.04] p-7">
                <ShieldCheck
                  className="h-12 w-12 shrink-0 text-brand-electric"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium leading-snug text-white/80">
                  Corporation des Maîtres Électriciens du Québec
                </p>
              </div>
            </Reveal>
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
