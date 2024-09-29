import constants from "@/config/constants";
import { i18n } from "@/i18n/config";
import { MetadataRoute } from "next";

// Adapt this as necessary
const pathnames = ["/login", "/signup"];

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${constants.baseUrl}/${locale}${pathname === "/" ? "" : pathname}`;
  }

  return pathnames.map((pathname) => ({
    url: getUrl(pathname, i18n.defaultLocale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((locale) => [locale, getUrl(pathname, locale)])
      ),
    },
  }));
}
