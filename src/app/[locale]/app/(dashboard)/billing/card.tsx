import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useUser from "@/hooks/use-user";
import { Link } from "@/i18n/navigation";
import { BillingPeriod } from "@/vendor/stripe/config";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import { plans } from "./data";

const getCTAHref = (
  pricingPlan: (typeof plans)[number],
  user: Session["user"] | null | undefined,
  billingPeriod: BillingPeriod
) => {
  switch (pricingPlan.key) {
    case "free":
      return {
        href: "/app",
        currentPlan: !!user && !(user?.subscription?.status === "active"),
        disabled: !!user,
      };
    case "pro":
      return {
        href: `/app/checkout?billingPeriod=${billingPeriod}`,
        currentPlan: user?.subscription?.status === "active",
      };
    default:
      return { href: "/contact?intent=enterprise" };
  }
};

export default function PricingCard({
  pricingPlan,
  billingPeriod,
  user,
  plan,
}: {
  pricingPlan: (typeof plans)[number];
  billingPeriod: BillingPeriod;
  user?: Session["user"] | null;
  plan: ReturnType<typeof useUser>["plan"];
}) {
  const locale = useLocale() === "en" ? "en" : "cs";

  const t = useTranslations("App.Pricing");
  const buttonProps = getCTAHref(pricingPlan, user, billingPeriod);
  const features = t(`Plans.${pricingPlan.key}.features`).split("|");
  const missingFeatures =
    pricingPlan.key === "enterprise"
      ? []
      : t(`Plans.${pricingPlan.key}.missingFeatures`).split("|");

  return (
    <div className="scroll-animation container">
      <Card className="flex flex-col gap-6 p-4 @md:p-6">
        <div className="w-full">
          <h4 className="mb-2 text-[18px] font-medium uppercase">
            {pricingPlan.key}
          </h4>
          <h5
            className={clsx(
              "text-[36px] font-medium leading-[0.9] duration-500"
            )}
          >
            {pricingPlan[billingPeriod][locale].cost}
          </h5>
          <p className="mt-2 !text-[16px] @5xl:!text-[18px]">
            {t(`Plans.${pricingPlan.key}.description`)}
          </p>
        </div>
        <div
          className={clsx("w-full", {
            "cursor-not-allowed":
              buttonProps.disabled || buttonProps.currentPlan,
          })}
        >
          <Button
            className={clsx("w-full", {
              "pointer-events-none opacity-50":
                buttonProps.disabled || buttonProps.currentPlan,
            })}
            asChild
          >
            <Link href={buttonProps.href}>
              {buttonProps.currentPlan
                ? t("currentPlan")
                : t(`Plans.${pricingPlan.key}.cta`)}
            </Link>
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-3 text-foreground">
          {features.map((item, index) => {
            return (
              <div
                className="flex items-center gap-2"
                key={index + pricingPlan.key}
              >
                <div
                  className={clsx(
                    "flex h-6 w-6 items-center justify-center overflow-hidden rounded-full",
                    {
                      "bg-amber-600/15 text-amber-600":
                        pricingPlan.key === "free",
                      "bg-cyan-600/15 text-cyan-600":
                        pricingPlan.key === "enterprise",
                      "bg-violet-600/15 text-violet-600":
                        pricingPlan.key === "pro",
                    }
                  )}
                >
                  <Check className="h-[13px] w-[13px]" strokeWidth={2} />
                </div>
                {item}
              </div>
            );
          })}
          {missingFeatures.map((item, index) => {
            return (
              <div
                className="flex items-center gap-2"
                key={index + pricingPlan.key}
              >
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground">
                  <X className="h-[13px] w-[13px]" strokeWidth={2} />
                </div>
                {item}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
