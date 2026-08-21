export const site = {
  name: "Électricité Vision Quantique",
  owner: "Leroy Joseph",
  ownerTitle: "Maître Électricien",
  phone: "514 347-6563",
  phoneHref: "tel:+15143476563",
  email: "leroyjoseph@outlook.com",
  emailHref: "mailto:leroyjoseph@outlook.com",
  // TODO: confirmer la zone de service exacte avec le client
  serviceArea: {
    fr: "Grand Montréal et environs",
    en: "Greater Montreal and surrounding areas",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://electricitevisionquantique.com",
} as const;
