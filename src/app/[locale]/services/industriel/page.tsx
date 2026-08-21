import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Cog,
  Factory,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ServiceDetail } from "@/components/site/service-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata({
    locale,
    namespace: "industrial",
    pathname: "/services/industriel",
  });
}

export default async function IndustrialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <ServiceDetail
      namespace="industrial"
      items={[
        { key: "installations", icon: Factory },
        { key: "threephase", icon: Zap },
        { key: "machinery", icon: Cog },
        { key: "maintenance", icon: Wrench },
        { key: "compliance", icon: ShieldCheck },
      ]}
    />
  );
}
