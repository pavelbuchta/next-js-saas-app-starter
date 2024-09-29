import { COMPANY_NAME } from "@/config";
import { i18n } from "@/i18n/config";
import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: i18n.defaultLocale,
    namespace: "Metadata",
  });

  return {
    name: t("title", { companyName: COMPANY_NAME }),
    short_name: COMPANY_NAME,
    description: t("description", { companyName: COMPANY_NAME }),
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
