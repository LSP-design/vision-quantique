import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * Données structurées JSON-LD de type Electrician (LocalBusiness)
 * pour le référencement local Google.
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: site.name,
    url: site.url,
    telephone: "+1-514-347-6563",
    email: site.email,
    priceRange: "$$",
    areaServed: {
      "@type": "AdministrativeArea",
      // TODO: confirmer la zone de service exacte avec le client
      name: site.serviceArea[locale],
    },
    founder: {
      "@type": "Person",
      name: site.owner,
      jobTitle:
        locale === "fr" ? "Maître Électricien" : "Master Electrician",
    },
    memberOf: {
      "@type": "Organization",
      name: "Corporation des Maîtres Électriciens du Québec (CMEQ)",
      url: "https://www.cmeq.org",
    },
    knowsAbout: [
      "Électricité résidentielle",
      "Électricité commerciale",
      "Électricité industrielle",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
