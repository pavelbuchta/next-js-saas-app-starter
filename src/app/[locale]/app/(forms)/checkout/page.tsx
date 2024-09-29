import { Locale } from "@/i18n/config";
import { PRICE_IDS } from "@/vendor/stripe/config";
import { unstable_setRequestLocale } from "next-intl/server";
import Wrapper from "./wrapper";

export default function App({
  params: { locale },
  searchParams: { billingPeriod },
}: {
  params: { locale: string };
  searchParams: { billingPeriod?: string };
}) {
  unstable_setRequestLocale(locale);

  const definedBillingPeriod =
    billingPeriod === "monthly" ? billingPeriod : "yearly";
  const priceId = PRICE_IDS[locale as Locale][definedBillingPeriod];

  return <Wrapper priceId={priceId} billingPeriod={definedBillingPeriod} />;
}
