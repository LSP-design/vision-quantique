import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
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

      <section className="bg-brand-cream py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-2">
            <Card>
              <CardContent className="space-y-6 p-8">
                <h2 className="text-xl font-bold text-brand-navy">
                  {t("info.title")}
                </h2>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-electric/10 text-brand-electric-dark">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-dark/60">
                      {t("info.phoneLabel")}
                    </p>
                    <a
                      href={site.phoneHref}
                      className="text-lg font-bold text-brand-navy hover:text-brand-electric"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-electric/10 text-brand-electric-dark">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-dark/60">
                      {t("info.emailLabel")}
                    </p>
                    <a
                      href={site.emailHref}
                      className="font-semibold text-brand-navy hover:text-brand-electric"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-electric/10 text-brand-electric-dark">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-dark/60">
                      {t("info.areaLabel")}
                    </p>
                    {/* TODO: confirmer la zone de service exacte avec le client */}
                    <p className="font-semibold text-brand-navy">
                      {t("info.area")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-electric/10 text-brand-electric-dark">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-dark/60">
                      {t("info.hoursLabel")}
                    </p>
                    {/* TODO: confirmer les heures d'ouverture avec le client */}
                    <p className="font-semibold text-brand-navy">
                      {t("info.hoursWeek")}
                    </p>
                    <p className="text-sm text-brand-dark/70">
                      {t("info.hoursSat")}
                    </p>
                    <p className="text-sm text-brand-dark/70">
                      {t("info.hoursSun")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-6 text-xl font-bold text-brand-navy">
                  {t("form.title")}
                </h2>
                <ContactForm />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
