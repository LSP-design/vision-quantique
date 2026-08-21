import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
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

// Rendu dynamique (SSR a la demande) pour tout le site : contourne une
// instabilite de la generation de pages statiques observee uniquement sur
// l'infra de build Vercel (echecs intermittents et deterministes sur des
// pages differentes selon la position de generation, non reproductibles en
// local). Le contenu reste servi en HTML pre-rendu cote serveur a chaque
// requete - aucun impact sur le SEO, seulement sur le moment du rendu.
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

  // Passage explicite de la locale et des messages au provider client :
  // evite de dependre de l'inference automatique de next-intl (basee sur un
  // contexte de requete asynchrone), qui s'est averee instable sur l'infra
  // de production de Vercel une fois le rendu statique desactive
  // (force-dynamic) - plantage aleatoire au rendu des Server Components,
  // non reproductible en local.
  const messages = await getMessages();

  return (
        <html lang={locale}>
                <head>
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
                        </head>
              <body className="min-h-screen antialiased">
                      <main>{children}</main>
                                </body>
        </html>
      );
}
