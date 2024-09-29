"use server";

import prisma from "@/prisma";
import { stripe } from ".";

export async function createPaymentIntent(
  stripeCustomerId: string,
  customerInfo: {
    email: string;
    name: string;
  },
  priceId: string
) {
  await stripe.customers.update(stripeCustomerId, {
    email: customerInfo.email,
    name: customerInfo.name,
  });

  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
    cancel_at_period_end: false,
  });

  const paymentIntent = (subscription?.latest_invoice as any).payment_intent;

  if (!paymentIntent || paymentIntent.client_secret == null) {
    return { error: "unknown_error" };
  }

  return {
    clientSecret: paymentIntent.client_secret,
  };
}

export async function cancelSubscriptionAtEndOfPeriod(subscriptionId: string) {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(
      "Failed to cancel subscription at the end of the period:",
      error
    );
    return { success: false };
  }
}

export async function restoreSubscription(subscriptionId: string) {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        cancelAtPeriodEnd: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to restore subscription:", error);
    return { success: false };
  }
}
