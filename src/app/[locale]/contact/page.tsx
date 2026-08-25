import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({ locale, namespace: "contact", pathname: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 xl:px-8">
          {/* Coordonnées */}
          <Reveal className="lg:col-span-4">
            <h2 className="mb-2 text-xl font-extrabold uppercase text-brand-navy">
              {t("info.title")}
            </h2>
            <div className="border-t border-brand-navy/12">
              <div className="flex items-start gap-4 border-b border-brand-navy/10 py-6">
                <Phone
                  className="mt-1 h-5 w-5 shrink-0 text-brand-electric-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/50">
                    {t("info.phoneLabel")}
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-1 block text-xl font-bold text-brand-navy transition-colors hover:text-brand-electric-dark"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-brand-navy/10 py-6">
                <Mail
                  className="mt-1 h-5 w-5 shrink-0 text-brand-electric-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/50">
                    {t("info.emailLabel")}
                  </p>
                  <a
                    href={site.emailHref}
                    className="mt-1 block font-semibold text-brand-navy transition-colors hover:text-brand-electric-dark"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-brand-navy/10 py-6">
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-brand-electric-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/50">
                    {t("info.areaLabel")}
                  </p>
                  {/* TODO: confirmer la zone de service exacte avec le client */}
                  <p className="mt-1 font-semibold text-brand-navy">
                    {t("info.area")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-brand-navy/10 py-6">
                <Clock
                  className="mt-1 h-5 w-5 shrink-0 text-brand-electric-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/50">
                    {t("info.hoursLabel")}
                  </p>
                  {/* TODO: confirmer les heures d'ouverture avec le client */}
                  <p className="mt-1 font-semibold text-brand-navy">
                    {t("info.hoursWeek")}
                  </p>
                  <p className="mt-0.5 text-sm text-brand-dark/65">
                    {t("info.hoursSat")}
                  </p>
                  <p className="text-sm text-brand-dark/65">
                    {t("info.hoursSun")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="border border-brand-navy/12">
              <div className="border-b border-brand-navy/12 px-8 py-4 sm:px-10">
                <span className="tech-label text-[0.7rem] font-medium uppercase text-brand-dark/45">
                  {t("form.title")}
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
