"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CircleCheckBig, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const nextErrors: Record<string, string> = {};
    if (!data.name?.trim()) nextErrors.name = t("validation.nameRequired");
    if (!data.phone?.trim()) nextErrors.phone = t("validation.phoneRequired");
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      nextErrors.email = t("validation.emailInvalid");
    if (!data.message?.trim())
      nextErrors.message = t("validation.messageRequired");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 border border-brand-electric/30 bg-brand-electric/5 p-10 text-center"
      >
        <CircleCheckBig className="h-12 w-12 text-brand-electric" aria-hidden="true" />
        <p className="text-lg font-semibold text-brand-navy">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="serviceType">{t("serviceType")}</Label>
        <Select id="serviceType" name="serviceType" defaultValue="residential">
          <option value="residential">{t("serviceOptions.residential")}</option>
          <option value="commercial">{t("serviceOptions.commercial")}</option>
          <option value="industrial">{t("serviceOptions.industrial")}</option>
          <option value="other">{t("serviceOptions.other")}</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <TriangleAlert className="h-4 w-4" aria-hidden="true" />
          {t("error")}
        </p>
      )}

      <Button
        type="submit"
        variant="electric"
        size="lg"
        disabled={status === "sending"}
        className="w-full sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
