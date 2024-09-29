import { auth } from "@/auth";
import { unstable_setRequestLocale } from "next-intl/server";
import Billing from "./billing";
import PricingCards from "./cards";

export default async function BillingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const session = await auth();
  const plan = session?.user.isEnterprise
    ? "enterprise"
    : session?.user.subscription?.status === "active"
      ? "pro"
      : "free";

  if (plan === "pro") {
    return <Billing />;
  }

  return (
    <PricingCards
      user={session?.user}
      plan={
        session?.user.isEnterprise
          ? "enterprise"
          : session?.user.subscription?.status === "active"
            ? "pro"
            : "free"
      }
    />
  );
}
