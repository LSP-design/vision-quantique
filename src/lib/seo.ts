import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

/**
 * Construit les métadonnées d'une page : title, description, Open Graph
 * et liens alternates hreflang pour les deux langues.
 */
export async function buildMetadata({
  locale,
  namespace,
  pathname,
}: {
  locale: Locale;
  namespace: string;
  pathname: AppPathname;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("meta.title");
  const description = t("meta.description");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      `${site.url}${getPathname({ locale: l, href: pathname })}`,
    ])
  );

  const canonical = `${site.url}${getPathname({ locale, href: pathname })}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": languages.fr },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
