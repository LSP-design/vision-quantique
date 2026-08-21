import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/services/residentiel": {
      fr: "/services/residentiel",
      en: "/services/residential",
    },
    "/services/commercial": "/services/commercial",
    "/services/industriel": {
      fr: "/services/industriel",
      en: "/services/industrial",
    },
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
    },
    "/contact": "/contact",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
