import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  BatteryCharging,
  Hammer,
  Lightbulb,
  PanelsTopLeft,
  Plug,
  Search,
  ShieldCheck,
  Wrench,
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
    namespace: "residential",
    pathname: "/services/residentiel",
  });
}

export default async function ResidentialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <ServiceDetail
      namespace="residential"
      items={[
        { key: "upgrade", icon: ShieldCheck },
        { key: "panels", icon: PanelsTopLeft },
        { key: "outlets", icon: Plug },
        { key: "lighting", icon: Lightbulb },
        { key: "ev", icon: BatteryCharging },
        { key: "renovations", icon: Hammer },
        { key: "inspection", icon: Search },
        { key: "repairs", icon: Wrench },
      ]}
    />
  );
}
