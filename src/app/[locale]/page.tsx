import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Factory, Home, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { CtaSection } from "@/components/site/cta-section";
import { BlueprintMark } from "@/components/site/blueprint-mark";
import { Testimonials } from "@/components/site/testimonials";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <>
      <Hero />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <Testimonials
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
      />
      <CtaSection
        kicker={t("finalCta.kicker")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        ctaLabel={t("finalCta.cta")}
      />
    </>
  );
}

function Hero() {
  const t = useTranslations("home.hero");
  const tTrust = useTranslations("home.trustBar");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const sectors = [tNav("residential"), tNav("commercial"), tNav("industrial")];

  return (
    <section className="relative bg-brand-navy-deep">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="grid items-start gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          {/* Colonne éditoriale */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="tech-label mb-7 flex items-center gap-3 text-xs font-medium uppercase text-brand-electric">
                <span className="h-px w-10 bg-brand-electric/60" aria-hidden="true" />
                {t("badge")}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mb-7 max-w-2xl text-[2.5rem] font-extrabold uppercase leading-[1] text-white sm:text-5xl lg:text-[3.4rem]">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="inline-flex h-13 items-center rounded-sm bg-brand-amber px-8 text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-brand-navy transition-colors hover:bg-brand-amber-dark"
                >
                  {t("ctaPrimary")}
                </Link>
                <a
                  href={site.phoneHref}
                  className="group inline-flex h-13 items-center gap-3 border border-white/15 px-6 text-white transition-colors hover:border-brand-electric"
                >
                  <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
                  <span
                    className="text-base font-bold tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {site.phone}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Fiche entreprise — encart technique */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative border border-white/15">
              <BlueprintMark className="absolute -top-2 -right-2" />
              <div className="flex items-center justify-between border-b border-white/15 px-6 py-3">
                <span className="tech-label text-[0.7rem] font-medium uppercase text-white/50">
                  {t("sheet.label")}
                </span>
                <span className="tech-label text-[0.7rem] font-medium uppercase text-brand-electric">
                  CMEQ
                </span>
              </div>

              <div className="px-6 py-6">
                <p
                  className="text-2xl font-extrabold uppercase leading-tight text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {site.owner}
                </p>
                <p className="tech-label mt-1.5 text-[0.7rem] font-medium uppercase text-brand-electric">
                  {tCommon("masterElectrician")}
                </p>
              </div>

              <dl>
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-t border-white/10 px-6 py-4">
                  <dt className="tech-label text-[0.7rem] font-medium uppercase text-white/45">
                    {t("sheet.sectors")}
                  </dt>
                  <dd className="text-sm font-medium text-white/85">
                    {sectors.join(" / ")}
                  </dd>
                </div>
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-t border-white/10 px-6 py-4">
                  <dt className="tech-label text-[0.7rem] font-medium uppercase text-white/45">
                    {t("sheet.zone")}
                  </dt>
                  <dd className="text-sm font-medium text-white/85">
                    {/* TODO: confirmer la zone de service exacte avec le client */}
                    {tCommon("serviceArea")}
                  </dd>
                </div>
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-t border-white/10 px-6 py-4">
                  <dt className="tech-label text-[0.7rem] font-medium uppercase text-white/45">
                    {t("sheet.quote")}
                  </dt>
                  <dd className="text-sm font-medium text-white/85">
                    {tTrust("quotes")}
                  </dd>
                </div>
              </dl>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 border-t border-white/15 py-4 text-sm font-bold uppercase tracking-[0.08em] text-brand-electric transition-colors hover:bg-white/5"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const t = useTranslations("home.services");
  const tCommon = useTranslations("common");

  const services: {
    key: "residential" | "commercial" | "industrial";
    href: AppPathname;
  }[] = [
    { key: "residential", href: "/services/residentiel" },
    { key: "commercial", href: "/services/commercial" },
    { key: "industrial", href: "/services/industriel" },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            kicker={t("kicker")}
            title={t("title")}
            description={t("subtitle")}
          />
          <Link
            href="/services"
            className="group hidden items-center gap-2 pb-1 text-sm font-bold uppercase tracking-[0.08em] text-brand-electric-dark transition-colors hover:text-brand-navy sm:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid border-t border-brand-navy/12 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group flex h-full flex-col border-b border-brand-navy/12 py-10 pr-8 transition-colors lg:border-b-0 lg:pl-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-brand-navy/12"
              >
                <span
                  className="text-6xl font-extrabold text-brand-navy/[0.08] transition-colors group-hover:text-brand-electric/15"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="-mt-3 mb-3 text-2xl font-extrabold uppercase text-brand-navy">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="mb-8 flex-1 leading-relaxed text-brand-dark/65">
                  {t(`${service.key}.description`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-brand-electric-dark">
                  {tCommon("learnMore")}
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
  );
}

function WhySection() {
  const t = useTranslations("home.why");

  const reasons = ["license", "insurance", "warranty", "code"] as const;

  return (
    <section className="relative bg-brand-navy py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <BlueprintMark className="absolute -top-1 right-4 sm:right-6 xl:right-8" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              light
              kicker={t("kicker")}
              title={t("title")}
              description={t("subtitle")}
            />
            <Reveal delay={0.15}>
              <p className="tech-label mt-10 border-l-2 border-brand-electric py-1 pl-4 text-[0.7rem] font-medium uppercase leading-relaxed text-white/55">
                Corporation des Maîtres
                <br />
                Électriciens du Québec
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.08}>
                <div className="grid gap-3 border-t border-white/12 py-7 last:border-b sm:grid-cols-[4rem_14rem_1fr] sm:gap-6">
                  <span
                    className="text-sm font-bold text-brand-electric/60"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-extrabold uppercase text-white">
                    {t(`${reason}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {t(`${reason}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const t = useTranslations("home.process");

  const steps = ["step1", "step2", "step3", "step4"] as const;

  return (
    <section className="bg-brand-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("subtitle")}
          className="mb-16"
        />

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="dash-rule absolute left-0 right-0 top-[0.6rem] hidden text-brand-navy/25 lg:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <li className="relative pl-1">
                <div className="relative mb-5 flex items-center">
                  <span className="z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-electric bg-brand-paper" />
                  <span
                    className="dash-rule ml-2 flex-1 text-brand-navy/25 lg:hidden"
                    aria-hidden="true"
                  />
                </div>
                <span className="tech-label text-[0.7rem] font-medium uppercase text-brand-electric-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 mb-2.5 text-lg font-extrabold uppercase text-brand-navy">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-brand-dark/65">
                  {t(`${step}.description`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
