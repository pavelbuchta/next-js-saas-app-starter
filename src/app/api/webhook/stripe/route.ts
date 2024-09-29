import prisma from "@/prisma";
import { stripe } from "@/vendor/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return new Response("Error processing webhook", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );

  const existingSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!existingSubscription) {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: invoice.customer as string },
    });

    if (!user) throw new Error("User not found...");

    await prisma.subscription.create({
      data: {
        stripeSubscriptionId: subscription.id,
        userStripeCustomerId: user.stripeCustomerId as string,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planId: subscription.items.data[0].plan.id,
        interval: String(subscription.items.data[0].plan.interval),
      },
    });
  } else {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        planId: subscription.items.data[0].plan.id,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const existingSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!existingSubscription) {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: subscription.customer as string },
    });

    if (!user) throw new Error("User not found...");

    await prisma.subscription.create({
      data: {
        stripeSubscriptionId: subscription.id,
        userStripeCustomerId: user.stripeCustomerId as string,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planId: subscription.items.data[0].plan.id,
        interval: String(subscription.items.data[0].plan.interval),
      },
    });
  } else {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        planId: subscription.items.data[0].plan.id,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.delete({
    where: { stripeSubscriptionId: subscription.id },
  });
}
