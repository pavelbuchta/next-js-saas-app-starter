"use client";

import { Locale } from "@/i18n/config";
import { createPaymentIntent } from "@/vendor/stripe/actions";
import { appearance } from "@/vendor/stripe/appearance";
import { BillingPeriod } from "@/vendor/stripe/config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import CheckoutForm from "./form";

const stripePromise = loadStripe(
  "pk_test_51OjSZ2JoDmiuDQz4Vub296KIgTCy4y8NJos59h93bq3sLe3veuXnV9XVmvvWDFlt3aEWHY4pOuIXyahEjjKZwezn00qo4U5fQS"
);

export default function Wrapper({
  priceId,
  billingPeriod,
}: {
  priceId: string;
  billingPeriod: BillingPeriod;
}) {
  const locale = useLocale();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  const { data } = useSession();
  const user = data?.user;

  if (!user?.stripeCustomerId) {
    throw new Error("Error getting stripe customer id.");
  }

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(
          user.stripeCustomerId as string,
          { email: user.email, name: user.name },
          priceId
        );
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [user, priceId]);

  const options = {
    locale: locale as Locale,
    clientSecret: clientSecret as string,
    appearance: appearance,
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
      },
    ],
  } satisfies StripeElementsOptions;

  if (!clientSecret) {
    return "Loading...";
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm billingPeriod={billingPeriod} />
    </Elements>
  );
}
