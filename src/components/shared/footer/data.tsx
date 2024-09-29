import { COMPANY_LINKEDIN_URL, COMPANY_TWITTER_URL } from "@/config";

export const footerColumns = [
  {
    key: 1,
    links: [
      {
        key: 1,
        href: "/app",
      },
      {
        key: 2,
        href: "/app/access",
      },
      {
        key: 3,
        href: "/app/appearance",
      },
      {
        key: 4,
        href: "/app/reservations",
      },
      {
        key: 5,
        href: "/app/reservation-book",
      },
      {
        key: 6,
        href: "/app/vouchers",
      },
      {
        key: 7,
        href: "/app/menu",
      },
    ],
  },
  {
    key: 2,
    links: [
      {
        key: 1,
        href: "/app/help",
      },
      {
        key: 2,
        href: "/app/settings",
      },
      {
        key: 3,
        href: "/app/billing",
      },
    ],
  },
  {
    key: 3,
    links: [
      {
        key: 1,
        href: COMPANY_TWITTER_URL,
      },
      {
        key: 2,
        href: COMPANY_LINKEDIN_URL,
      },
    ],
  },
  {
    key: 4,
    links: [
      {
        key: 1,
        href: "/affiliate",
      },
      {
        key: 2,
        href: "/contact",
      },
      {
        key: 3,
        href: "/docs",
      },
      {
        key: 4,
        href: "/app/blog",
      },
    ],
  },
] as const;
