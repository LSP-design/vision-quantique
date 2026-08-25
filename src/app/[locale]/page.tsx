import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  Factory,
  Home,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { CtaSection } from "@/components/site/cta-section";
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

  const sectors = [
    { icon: Home, label: tNav("residential") },
    { icon: Building2, label: tNav("commercial") },
    { icon: Factory, label: tNav("industrial") },
  ];

  const stats = [
    tTrust("cmeq"),
    tTrust("quotes"),
    // TODO: confirmer le nombre exact d'années d'expérience avec le client
    tTrust("experience"),
  ];

  return (
    <section className="relative overflow-hidden bg-brand-navy-deep">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div className="hero-beam absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="grid items-center gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          {/* Colonne éditoriale */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-electric">
                <span className="h-px w-10 bg-brand-electric/60" aria-hidden="true" />
                {t("badge")}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mb-7 max-w-2xl text-[2.6rem] font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-13 items-center rounded-sm bg-brand-amber px-8 text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-brand-navy transition-colors hover:bg-brand-amber-dark"
                >
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex h-13 items-center gap-2 px-2 text-[0.9375rem] font-semibold text-white transition-colors hover:text-brand-electric"
                >
                  {tCommon("learnMore")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <a
                href={site.phoneHref}
                className="group mt-12 inline-flex items-center gap-4 border-l-2 border-brand-electric pl-4"
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-white/50">
                    {t("phoneIntro")}
                  </span>
                  <span
                    className="mt-1 block text-2xl font-bold tracking-wide text-white transition-colors group-hover:text-brand-electric"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {site.phone}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Carte technique */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative border border-white/12 bg-white/[0.045] backdrop-blur-sm">
              <div
                className="h-1 w-full bg-gradient-to-r from-brand-electric via-brand-electric-dark to-brand-amber"
                aria-hidden="true"
              />
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <LogoMark className="h-12 w-12" />
                  <span className="border border-brand-electric/40 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-electric">
                    CMEQ
                  </span>
                </div>

                <p
                  className="mt-6 text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {site.owner}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {tCommon("masterElectrician")}
                </p>

                <div className="my-6 h-px bg-white/10" aria-hidden="true" />

                <ul>
                  {sectors.map((sector) => (
                    <li
                      key={sector.label}
                      className="flex items-center gap-3 border-b border-white/8 py-3.5 last:border-0"
                    >
                      <sector.icon
                        className="h-4.5 w-4.5 text-brand-electric"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-white/85">
                        {sector.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={site.phoneHref}
                  className="mt-6 flex h-12 items-center justify-center gap-2 border border-white/15 text-sm font-bold tracking-wide text-white transition-colors hover:border-brand-electric hover:text-brand-electric"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bandeau de confiance intégré */}
        <div className="grid border-t border-white/10 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <p
              key={stat}
              className={
                "flex items-center gap-2.5 py-5 pr-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/70 " +
                (i > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : "")
              }
            >
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-brand-electric"
                aria-hidden="true"
              />
              {stat}
            </p>
          ))}
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
    icon: typeof Home;
    href: AppPathname;
  }[] = [
    { key: "residential", icon: Home, href: "/services/residentiel" },
    { key: "commercial", icon: Building2, href: "/services/commercial" },
    { key: "industrial", icon: Factory, href: "/services/industriel" },
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
            className="group hidden items-center gap-2 pb-1 text-sm font-semibold text-brand-electric-dark transition-colors hover:text-brand-navy sm:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid border-t border-brand-navy/10 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group flex h-full flex-col border-b border-brand-navy/10 py-10 pr-8 transition-colors lg:border-b-0 lg:pl-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-brand-navy/10"
              >
                <span
                  className="text-sm font-bold text-brand-electric-dark/60"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-6 mb-5 inline-flex h-12 w-12 items-center justify-center border border-brand-navy/12 text-brand-navy transition-colors group-hover:border-brand-electric group-hover:text-brand-electric-dark">
                  <service.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mb-3 text-2xl font-bold text-brand-navy">
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
    <section className="relative overflow-hidden bg-brand-navy py-24">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              light
              kicker={t("kicker")}
              title={t("title")}
              description={t("subtitle")}
            />
            <Reveal delay={0.15}>
              <div className="mt-10 inline-flex items-center gap-4 border border-white/12 bg-white/[0.04] px-6 py-5">
                <ShieldCheck
                  className="h-10 w-10 shrink-0 text-brand-electric"
                  aria-hidden="true"
                />
                <p className="max-w-[16rem] text-sm font-medium leading-snug text-white/80">
                  Corporation des Maîtres Électriciens du Québec
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.08}>
                <div className="grid gap-3 border-t border-white/10 py-7 last:border-b sm:grid-cols-[4rem_14rem_1fr] sm:gap-6">
                  <span
                    className="text-sm font-bold text-brand-electric/70"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {t(`${reason}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
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
    <section className="bg-brand-cream py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("subtitle")}
          className="mb-14"
        />

        <ol className="grid border-t border-brand-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <li className="relative h-full border-b border-brand-navy/10 py-9 pr-8 lg:border-b-0 lg:pl-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-brand-navy/10">
                <span
                  className="text-4xl font-bold text-brand-electric-dark/15"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 mb-2.5 text-lg font-bold text-brand-navy">
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
