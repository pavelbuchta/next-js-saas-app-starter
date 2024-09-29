export const plans = [
  {
    key: "free",
    monthly: {
      en: { cost: "€0/month" },
      cs: { cost: "0Kč / měsíčně" },
      href: "/app/checkout?billingPeriod=monthly",
    },
    yearly: {
      en: { cost: "€0/month" },
      cs: { cost: "0Kč / měsíčně" },
      href: "/app/checkout?billingPeriod=yearly",
    },
  },
  {
    key: "pro",
    monthly: {
      en: { cost: "€12/month" },
      cs: { cost: "300Kč / měsíčně" },
      href: "/app/checkout?billingPeriod=monthly",
    },
    yearly: {
      en: { cost: "€10/month" },
      cs: { cost: "250Kč / měsíčně" },
      href: "/app/checkout?billingPeriod=yearly",
    },
  },
  {
    key: "enterprise",
    monthly: {
      en: { cost: "Custom" },
      cs: { cost: "Cena na míru" },
      href: "/contact?intent=enterprise",
    },
    yearly: {
      en: { cost: "Custom" },
      cs: { cost: "Cena na míru" },
      href: "/contact?intent=enterprise",
    },
  },
] as const;
