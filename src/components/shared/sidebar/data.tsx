import {
  BookMarked,
  BookOpenText,
  Gift,
  Home,
  Info,
  LogOut,
  PanelsLeftBottom,
  Settings,
  ShieldCheck,
  Utensils,
  Wallet,
} from "lucide-react";

export const sidebarGroups = [
  [
    {
      key: 1,
      href: "/app",
      icon: <Home />,
    },
    {
      key: 2,
      href: "/app/access",
      icon: <ShieldCheck />,
    },
    {
      key: 3,
      href: "/app/appearance",
      icon: <PanelsLeftBottom />,
    },
  ],
  [
    {
      key: 1,
      href: "/app/reservations",
      icon: <BookOpenText />,
    },
    {
      key: 2,
      href: "/app/reservation-book",
      icon: <BookMarked />,
    },
    {
      key: 3,
      href: "/app/vouchers",
      icon: <Gift />,
    },
    {
      key: 4,
      href: "/app/menu",
      icon: <Utensils />,
    },
  ],
  [
    {
      key: 1,
      href: "/app/help",
      icon: <Info />,
    },
    {
      key: 2,
      href: "/app/settings",
      icon: <Settings />,
    },
    {
      key: 3,
      href: "/app/billing",
      icon: <Wallet />,
    },
    {
      key: 4,
      href: "LOGOUT",
      icon: <LogOut />,
    },
  ],
] as const;
