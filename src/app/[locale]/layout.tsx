import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { COMPANY_CATEGORY, COMPANY_NAME, METADATA_BASE } from "@/config";
import constants from "@/config/constants";
import { i18n } from "@/i18n/config";
import clsx from "clsx";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title", { companyName: COMPANY_NAME }),
    description: t("description", { companyName: COMPANY_NAME }),
    keywords: t("keywords", { companyName: COMPANY_NAME }).split("|"),

    metadataBase: new URL(METADATA_BASE),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "cs-CZ": "/cs",
      },
    },
    generator: "Next.js",
    applicationName: COMPANY_NAME,
    referrer: "origin-when-cross-origin",
    authors: [
      { name: constants.credit.creatorName },
      {
        name: constants.credit.agencyName,
        url: constants.credit.websiteUrl,
      },
    ],
    creator: constants.credit.creatorName + ` (${constants.credit.agencyName})`,
    publisher: constants.credit.agencyName,
    manifest: constants.baseUrl + "/manifest.webmanifest",
    category: COMPANY_CATEGORY,
    openGraph: {
      url: constants.baseUrl + "/" + i18n.defaultLocale + "/opengraph-image",
      type: "website",
    },
  } satisfies Metadata;
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(
          "m-0 bg-background p-0 font-sans text-foreground antialiased",
          inter.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
