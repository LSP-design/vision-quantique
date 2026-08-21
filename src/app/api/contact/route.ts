import { NextResponse } from "next/server";

const SERVICE_TYPES = ["residential", "commercial", "industrial", "other"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  message?: string;
};

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const errors: string[] = [];
  const name = payload.name?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const serviceType = payload.serviceType?.trim() ?? "other";
  const message = payload.message?.trim() ?? "";

  if (!name || name.length > 200) errors.push("name");
  if (!phone || phone.length > 30) errors.push("phone");
  if (!email || email.length > 200 || !EMAIL_REGEX.test(email))
    errors.push("email");
  if (!SERVICE_TYPES.includes(serviceType)) errors.push("serviceType");
  if (!message || message.length > 5000) errors.push("message");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed", fields: errors },
      { status: 400 }
    );
  }

  // Journalise la soumission côté serveur (visible dans les logs Vercel)
  console.log("[contact] Nouvelle demande de soumission:", {
    name,
    phone,
    email,
    serviceType,
    receivedAt: new Date().toISOString(),
  });

  /*
   * Intégration Resend (désactivée par défaut) :
   * 1. `npm install resend`
   * 2. Renseigner RESEND_API_KEY et CONTACT_EMAIL_TO dans .env.local / Vercel
   * 3. Décommenter le bloc ci-dessous
   *
   * if (process.env.RESEND_API_KEY) {
   *   const { Resend } = await import("resend");
   *   const resend = new Resend(process.env.RESEND_API_KEY);
   *   await resend.emails.send({
   *     from: "Site web <onboarding@resend.dev>",
   *     to: process.env.CONTACT_EMAIL_TO ?? "leroyjoseph@outlook.com",
   *     replyTo: email,
   *     subject: `Nouvelle demande de soumission — ${name}`,
   *     text: `Nom: ${name}\nTéléphone: ${phone}\nCourriel: ${email}\nService: ${serviceType}\n\n${message}`,
   *   });
   * }
   */

  return NextResponse.json({ ok: true });
}
