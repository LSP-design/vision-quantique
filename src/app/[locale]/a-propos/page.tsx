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
// Rendu dynamique (SSR à la demande) plutôt que statique au build :
// contourne une erreur de prérendu spécifique à l'environnement de build
// Vercel qui ne se reproduit pas en local (voir historique de déploiement).
export const dynamic = "force-dynamic";

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
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-brand-navy/8 shadow-lg shadow-brand-navy/8">
              <div className="flex items-center gap-4 bg-gradient-to-br from-brand-navy-deep to-brand-navy-light p-8">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <LogoMark className="h-10 w-10" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                    {t("ownerTitle")}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-brand-electric">
                    {tCommon("masterElectrician")}
                  </p>
                </div>
              </div>
              <div className="p-8">
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
              <h3 className="mb-5 mt-12 text-xl font-extrabold text-brand-navy">
                {t("values.title")}
              </h3>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {values.map((value, i) => (
                <Reveal key={value.key} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-brand-navy/8 bg-brand-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-navy/8">
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-amber-dark">
                      <value.icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h4 className="mb-1.5 text-lg font-extrabold text-brand-navy">
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
      <section className="bg-brand-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-brand-navy-deep to-brand-navy-light p-10 sm:p-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <span className="mb-4 inline-block rounded-full bg-brand-electric/15 px-4 py-1.5 text-sm font-bold text-brand-electric">
                CMEQ
              </span>
              <h2 className="mb-4 max-w-2xl text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl">
                {t("cmeqTitle")}
              </h2>
              <p className="max-w-2xl leading-relaxed text-white/70">
                {t("cmeqText")}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-4">
              <div className="flex items-center gap-5 rounded-2xl bg-white/[0.07] p-7">
                <ShieldCheck
                  className="glow-pulse h-12 w-12 shrink-0 text-brand-electric"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold leading-snug text-white/85">
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
