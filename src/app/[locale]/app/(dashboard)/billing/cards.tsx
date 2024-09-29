"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useUser from "@/hooks/use-user";
import { BillingPeriod } from "@/vendor/stripe/config";
import clsx from "clsx";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PricingCard from "./card";
import { plans } from "./data";

export default function PricingCards({
  user,
  plan,
}: {
  user?: Session["user"] | null;
  plan: ReturnType<typeof useUser>["plan"];
}) {
  const t = useTranslations("App.Pricing");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");

  const renderedPlans =
    plan === "pro" ? plans.filter((item) => item.key !== "free") : plans;

  return (
    <div className="flex flex-col items-center @container">
      <Card className="scroll-animation flex w-full gap-2 border p-2 @sm:w-[400px]">
        {["monthly", "yearly"].map((item) => {
          const itemBillingPeriod = item as BillingPeriod;

          return (
            <button
              key={item}
              onClick={() => setBillingPeriod(itemBillingPeriod)}
              className={clsx(
                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 transition-colors duration-500",
                {
                  "border-border bg-primary-foreground":
                    billingPeriod === itemBillingPeriod,
                  "border-transparent bg-background":
                    billingPeriod !== itemBillingPeriod,
                }
              )}
            >
              {t(itemBillingPeriod)}
              {itemBillingPeriod === "yearly" && (
                <Badge variant={"amber"}>{t("sale")}</Badge>
              )}
            </button>
          );
        })}
      </Card>
      <div
        className={clsx("mt-12 grid w-full gap-4", {
          "grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-3": plan !== "pro",
          "grid-cols-1 @xl:grid-cols-2": plan === "pro",
        })}
      >
        {renderedPlans.map((pricingPlan) => {
          return (
            <PricingCard
              key={pricingPlan.key}
              user={user}
              plan={plan}
              billingPeriod={billingPeriod}
              pricingPlan={pricingPlan}
            />
          );
        })}
      </div>
    </div>
  );
}
