import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  Building2,
  CircleCheckBig,
  ClipboardCheck,
  Clock,
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
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { CtaSection } from "@/components/site/cta-section";
import { Testimonials } from "@/components/site/testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({ locale, namespace: "home", pathname: "/" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  
    return <p>DEBUG TEST OK</p>;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <Testimonials
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
      />
      <CtaSection
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        ctaLabel={t("finalCta.cta")}
      />
    </>
  );
}

function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-electric-dark">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-electric/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-electric/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-electric/40 bg-brand-electric/10 px-4 py-1.5 text-sm font-semibold text-brand-electric backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t("badge")}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-brand-amber px-8 py-3.5 text-base font-bold text-brand-navy shadow-xl shadow-brand-amber/25 transition-colors hover:bg-brand-amber-dark"
            >
              <Zap className="h-5 w-5" aria-hidden="true" />
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-lg border-2 border-white/25 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/5"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href={site.phoneHref}
            className="mt-10 inline-flex items-center gap-3 text-white/90 transition-colors hover:text-brand-electric"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-electric/15 text-brand-electric">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm text-white/60">
                {t("phoneIntro")}
              </span>
              <span className="text-xl font-bold tracking-wide">
                {site.phone}
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function TrustBar() {
  const t = useTranslations("home.trustBar");

  const items = [
    { icon: ShieldCheck, label: t("cmeq") },
    { icon: Building2, label: t("sectors") },
    { icon: FileText, label: t("quotes") },
    // TODO: confirmer le nombre exact d'années d'expérience avec le client
    { icon: Award, label: t("experience") },
  ];

  return (
    <section className="border-b border-brand-navy/8 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
          >
            <item.icon
              className="h-6 w-6 shrink-0 text-brand-electric"
              aria-hidden="true"
            />
            {item.label}
          </div>
        ))}
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
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-dark/70">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.1}>
              <Card className="group h-full transition-shadow hover:shadow-xl hover:shadow-brand-electric/10">
                <CardContent className="flex h-full flex-col p-8">
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-electric to-brand-electric-dark text-white shadow-lg shadow-brand-electric/20">
                    <service.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-brand-navy">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="mb-6 flex-1 text-brand-dark/70">
                    {t(`${service.key}.description`)}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-electric-dark transition-colors group-hover:text-brand-electric"
                  >
                    {tCommon("learnMore")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
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
    <section className="relative overflow-hidden bg-brand-navy py-20">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.key} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <reason.icon
                  className="mb-4 h-8 w-8 text-brand-electric"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-bold text-white">
                  {t(`${reason.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {t(`${reason.key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-dark/70">
            {t("subtitle")}
          </p>
        </Reveal>

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.1}>
              <li className="relative flex h-full flex-col items-center text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-brand-electric-dark ring-2 ring-brand-electric/30">
                  <step.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="mb-2 text-sm font-bold uppercase tracking-wider text-brand-electric-dark">
                  {i + 1}. {t(`${step.key}.title`)}
                </span>
                <p className="text-sm leading-relaxed text-brand-dark/70">
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
