import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Building2,
  ClipboardCheck,
  Lightbulb,
  PanelsTopLeft,
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
    namespace: "commercial",
    pathname: "/services/commercial",
  });
}

export default async function CommercialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <ServiceDetail
      namespace="commercial"
      items={[
        { key: "installations", icon: Building2 },
        { key: "upgrade", icon: ClipboardCheck },
        { key: "lighting", icon: Lightbulb },
        { key: "maintenance", icon: Wrench },
        { key: "panels", icon: PanelsTopLeft },
      ]}
    />
  );
}
