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

    let title: string;
    let description: string;
    try {
          const t = await getTranslations({ locale, namespace });
          title = t("meta.title");
          description = t("meta.description");
    } catch (error) {
          console.error("[buildMetadata] getTranslations failed:", error);
          title = locale === "fr" ? "Électricité Vision Quantique | Maître Électricien CMEQ — Grand Montréal" : "Électricité Vision Quantique | CMEQ Master Electrician — Greater Montreal";
          description = locale === "fr" ? "Maître Électricien certifié CMEQ au Grand Montréal. Installations électriques résidentielles, commerciales et industrielles sûres et conformes. Soumission gratuite : 514 347-6563." : "CMEQ-certified Master Electrician in Greater Montreal. Safe, code-compliant residential, commercial and industrial electrical installations. Free quote: 514 347-6563.";
    }

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
