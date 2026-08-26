import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CircleCheckBig,
  ClipboardCheck,
  Factory,
  FileText,
  Home,
  Phone,
  ScrollText,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { CtaSection } from "@/components/site/cta-section";
import { Particles } from "@/components/site/particles";
import { CountUp } from "@/components/site/count-up";
import { Marquee } from "@/components/site/marquee";
import {
  CommercialArt,
  IndustrialArt,
  ResidentialArt,
} from "@/components/site/sector-art";
import { LogoMark } from "@/components/site/logo";
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
  const tNav = useTranslations("nav");

  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesSection />
      <Marquee
        items={[
          tNav("residential"),
          tNav("commercial"),
          tNav("industrial"),
          t("services.residential.title"),
          t("services.commercial.title"),
          t("services.industrial.title"),
        ]}
      />
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
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const sectors = [
    { icon: Home, label: tNav("residential") },
    { icon: Building2, label: tNav("commercial") },
    { icon: Factory, label: tNav("industrial") },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-light">
      <Particles />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-electric/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 py-20 pb-28 lg:grid-cols-12 lg:gap-8 lg:py-28 lg:pb-36">
          {/* Texte */}
          <div className="lg:col-span-7">
            <span
              className="hero-enter inline-flex items-center gap-2 rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-2 text-sm font-bold text-brand-electric backdrop-blur-sm"
              style={{ animationDelay: "0.05s" }}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t("badge")}
            </span>

            <h1
              className="hero-enter mt-7 max-w-2xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]"
              style={{ animationDelay: "0.15s" }}
            >
              {t("title")}
            </h1>

            <p
              className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-white/70"
              style={{ animationDelay: "0.28s" }}
            >
              {t("subtitle")}
            </p>

            <div
              className="hero-enter mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-amber px-8 py-4 text-base font-bold text-brand-navy shadow-xl shadow-brand-amber/30 transition-all hover:scale-[1.04] hover:bg-brand-amber-dark"
              >
                <Zap className="h-5 w-5" aria-hidden="true" />
                {t("ctaPrimary")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-brand-electric hover:text-brand-electric"
              >
                <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>

          {/* Carte entreprise flottante */}
          <div
            className="hero-enter relative lg:col-span-5"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="float-soft relative mx-auto max-w-sm rounded-3xl border border-white/12 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <LogoMark className="h-9 w-9" />
                </span>
                <div>
                  <p className="text-lg font-extrabold text-white">
                    {site.owner}
                  </p>
                  <p className="text-sm font-semibold text-brand-electric">
                    {tCommon("masterElectrician")}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {sectors.map((sector) => (
                  <li
                    key={sector.label}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-4 py-3"
                  >
                    <sector.icon
                      className="h-5 w-5 text-brand-electric"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-white/90">
                      {sector.label}
                    </span>
                    <CircleCheckBig
                      className="ml-auto h-4 w-4 text-brand-amber"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>

              <a
                href={site.phoneHref}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
              >
                <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
                {site.phone}
              </a>

              {/* Mini-carte flottante */}
              <div
                className="float-soft absolute -bottom-6 -left-6 flex items-center gap-2 rounded-2xl bg-brand-amber px-5 py-3 shadow-xl shadow-brand-amber/30"
                style={{ animationDelay: "1.2s" }}
              >
                <Zap className="h-5 w-5 text-brand-navy" fill="currentColor" aria-hidden="true" />
                <span className="text-sm font-extrabold text-brand-navy">
                  {t("floatingCard")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement — au-dessus de la bande de statistiques */}
        <div className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">
            {t("scroll")}
          </span>
          <ChevronDown
            className="scroll-bounce h-5 w-5 text-brand-electric"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const t = useTranslations("home.stats");

  const stats = [
    // TODO: confirmer le nombre exact d'années d'expérience avec le client
    { value: 10, suffix: "+", label: t("years") },
    { value: 3, suffix: "", label: t("sectors") },
    { value: 100, suffix: " %", label: t("compliance") },
    { value: 0, suffix: " $", label: t("quote") },
  ];

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-brand-navy/8 bg-brand-navy/8 shadow-xl shadow-brand-navy/8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-white px-6 py-8 text-center"
            >
              <span className="text-4xl font-extrabold text-brand-electric-dark">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-semibold text-brand-dark/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ServicesSection() {
  const t = useTranslations("home.services");
  const tCommon = useTranslations("common");

  const services: {
    key: "residential" | "commercial" | "industrial";
    href: AppPathname;
    art: React.ReactNode;
  }[] = [
    { key: "residential", href: "/services/residentiel", art: <ResidentialArt /> },
    { key: "commercial", href: "/services/commercial", art: <CommercialArt /> },
    { key: "industrial", href: "/services/industriel", art: <IndustrialArt /> },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          center
          kicker={t("kicker")}
          title={t("title")}
          description={t("subtitle")}
          className="mb-14"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.1}>
              <Link
                href={service.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-navy/10"
              >
                <div className="h-52 bg-gradient-to-br from-brand-navy-deep to-brand-navy-light p-6 transition-colors">
                  {service.art}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2.5 text-2xl font-extrabold text-brand-navy">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="mb-6 flex-1 leading-relaxed text-brand-dark/65">
                    {t(`${service.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-2 font-bold text-brand-electric-dark">
                    {tCommon("learnMore")}
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
      </div>
    </section>
  );
}

function WhySection() {
  const t = useTranslations("home.why");

  const reasons = [
    { key: "license", icon: ScrollText },
    { key: "insurance", icon: ShieldCheck },
    { key: "warranty", icon: CircleCheckBig },
    { key: "code", icon: ClipboardCheck },
  ] as const;

  return (
    <section className="bg-brand-soft py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              kicker={t("kicker")}
              title={t("title")}
              description={t("subtitle")}
            />
            <Reveal delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-brand-navy px-6 py-5 text-white shadow-lg shadow-brand-navy/20">
                <ShieldCheck
                  className="h-10 w-10 shrink-0 text-brand-electric"
                  aria-hidden="true"
                />
                <p className="max-w-[15rem] text-sm font-semibold leading-snug">
                  Corporation des Maîtres Électriciens du Québec
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((reason, i) => (
              <Reveal key={reason.key} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-brand-navy/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-navy/8">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-amber-dark">
                    <reason.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-lg font-extrabold text-brand-navy">
                    {t(`${reason.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-dark/65">
                    {t(`${reason.key}.description`)}
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

  const steps = [
    { key: "step1", icon: Phone },
    { key: "step2", icon: Search },
    { key: "step3", icon: FileText },
    { key: "step4", icon: Wrench },
  ] as const;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          center
          kicker={t("kicker")}
          title={t("title")}
          description={t("subtitle")}
          className="mb-16"
        />

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-brand-electric/25 lg:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.1}>
              <li className="relative flex h-full flex-col items-center text-center">
                <span className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-electric to-brand-electric-dark text-white shadow-lg shadow-brand-electric/25">
                  <step.icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-amber text-xs font-extrabold text-brand-navy">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-brand-navy">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="max-w-[16rem] text-sm leading-relaxed text-brand-dark/65">
                  {t(`${step.key}.description`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
