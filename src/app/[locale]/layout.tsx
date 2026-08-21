import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Rendu dynamique (SSR à la demande) pour tout le site : contourne une
// instabilité de la génération de pages statiques observée uniquement sur
// l'infra de build Vercel (échecs intermittents et déterministes sur des
// pages différentes selon la position de génération, non reproductibles en
// local). Le contenu reste servi en HTML pré-rendu côté serveur à chaque
// requête — aucun impact sur le SEO, seulement sur le moment du rendu.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const base = await buildMetadata({
    locale,
    namespace: "home",
    pathname: "/",
  });

  return {
    metadataBase: new URL(site.url),
    ...base,
    title: {
      default: base.title as string,
      template: `%s | ${site.name}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  
  return (
    <html lang={locale}>
      <head>
        {/* Polices chargées via <link> classiques (pas de next/font — voir README) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd locale={locale as Locale} />
      </head>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
