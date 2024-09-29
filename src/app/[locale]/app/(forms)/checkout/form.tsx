"use client";

import { Button } from "@/components/ui/button";
import FormMessage from "@/components/utils/form-message";
import SubmitButton from "@/components/utils/submit-button";
import constants from "@/config/constants";
import useUser from "@/hooks/use-user";
import { Link, useRouter } from "@/i18n/navigation";
import { BillingPeriod } from "@/vendor/stripe/config";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";

const CheckoutForm = ({ billingPeriod }: { billingPeriod: BillingPeriod }) => {
  const { revalidateSession } = useUser();
  const t = useTranslations("App.Checkout");
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${constants.baseUrl}/app`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "unknown_error");
      setIsSubmitting(false);
    } else {
      setErrorMessage(undefined);
      await revalidateSession();
      router.push("/app");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="scrollbar-hidden relative h-full w-full overflow-x-hidden overflow-y-scroll"
    >
      <div className="p-mobile md:p-8">
        <div className="mb-10">
          <h1 className="mb-2 text-[30px]">{t("headline")}</h1>
          <p className="text-base">
            {t.rich(`${billingPeriod}.body`, {
              span: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
            })}
          </p>
        </div>
        <Suspense fallback="Loading...">
          <PaymentElement />
        </Suspense>
        <FormMessage message={errorMessage} />
      </div>
      <div className="sticky bottom-0 z-10 -mt-12 block w-full shadow-[0_20px_0px_0_var(--background)]">
        <div className="h-20 w-full bg-gradient-to-t from-background to-transparent" />
        <div className="p-mobile flex w-full gap-4 bg-background !pt-0 md:p-8">
          <Button asChild variant={"outline"}>
            <Link href="/app/billing">{t("back")}</Link>
          </Button>
          <SubmitButton className="w-full" isSubmitting={isSubmitting}>
            {t("cta")}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
