import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Génère les pages statiques en série plutôt qu'en parallèle sur plusieurs
    // workers : contourne une instabilité observée uniquement sur l'infra de
    // build Vercel (échecs intermittents sur des pages différentes à chaque
    // build, avec un message "Server Components render" générique).
    experimental: {
          workerThreads: false,
          cpus: 1,
    },
};

export default withNextIntl(nextConfig);
