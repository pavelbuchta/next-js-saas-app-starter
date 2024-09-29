"use client";

import useUser from "@/hooks/use-user";
import { useLocale, useTranslations } from "next-intl";
import BillingButton from "./billing-button";
import { plans } from "./data";

export default function Billing() {
  const locale = useLocale() === "en" ? "en" : "cs";
  const t = useTranslations("App.Billing");
  const { user } = useUser();

  if (!user?.subscription?.id) {
    return null;
  }

  const billingPeriod =
    user.subscription.interval === "year" ? "yearly" : "monthly";

  return (
    <div className="w-full border">
      <div className="flex flex-col gap-12 p-4 md:p-8">
        <div>
          <h2 className="mb-0.5 text-[24px] font-medium">{t("headline")}</h2>
          <p className="text-[15px] md:text-base">{t("body")}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 border-t p-4 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">{t("plan")}:</p>
          <p>Pro</p>
        </div>{" "}
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">{t("price")}:</p>
          <p>
            {
              (plans.find((item) => item.key === "pro") as any)[billingPeriod][
                locale
              ].cost
            }
            {billingPeriod === "yearly" && " (Billed yearly)"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">
            {user.subscription.cancelAtPeriodEnd
              ? t("subscriptionEndDate")
              : t("nextBillingDate")}
            :
          </p>
          <p>
            {new Date(
              user.subscription.currentPeriodEnd * 1000
            ).toLocaleDateString(locale, {
              dateStyle: "long",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end border-t p-4 md:px-8 md:py-4">
        <BillingButton
          subscriptionId={user.subscription.stripeSubscriptionId}
          type={user.subscription.cancelAtPeriodEnd ? "restore" : "cancel"}
        />
      </div>
    </div>
  );
}
