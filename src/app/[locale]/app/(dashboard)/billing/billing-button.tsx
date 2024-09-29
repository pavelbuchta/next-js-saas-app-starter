import FormMessage from "@/components/utils/form-message";
import SubmitButton from "@/components/utils/submit-button";
import { useRouter } from "@/i18n/navigation";
import {
  cancelSubscriptionAtEndOfPeriod,
  restoreSubscription,
} from "@/vendor/stripe/actions";
import React, { useState } from "react";

export default function BillingButton({
  type,
  subscriptionId,
}: {
  type: "restore" | "cancel";
  subscriptionId: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    let success;

    if (type === "cancel") {
      const { success: wasSuccessfull } =
        await cancelSubscriptionAtEndOfPeriod(subscriptionId);
      success = wasSuccessfull;
    } else {
      const { success: wasSuccessfull } =
        await restoreSubscription(subscriptionId);
      success = wasSuccessfull;
    }

    if (!success) {
      setErrorMessage("unknown_error");
      setIsSubmitting(false);
    } else {
      setErrorMessage(undefined);
      router.push("/app/billing?revalidateSession=true");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <FormMessage message={errorMessage} />
      <SubmitButton
        variant={type === "cancel" ? "outline" : "default"}
        isSubmitting={isSubmitting}
      >
        {type === "cancel" ? "Cancel subscription" : "Restore subscription"}
      </SubmitButton>
    </form>
  );
}
