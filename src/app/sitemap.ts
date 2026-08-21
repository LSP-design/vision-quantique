import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";

const pathnames = Object.keys(routing.pathnames) as AppPathname[];

export default function sitemap(): MetadataRoute.Sitemap {
  return pathnames.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: `${site.url}${getPathname({ locale, href: pathname })}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: pathname === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${site.url}${getPathname({ locale: l, href: pathname })}`,
          ])
        ),
      },
    }))
  );
}
