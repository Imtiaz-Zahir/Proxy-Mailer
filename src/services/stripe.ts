import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}

const priceId = process.env.STRIPE_PRICE_ID;
if (!priceId) {
  throw new Error("Stripe price id is not defined");
}

const stripe = new Stripe(stripeSecretKey);

export function createCheckoutSession({
  cancelUrl,
  proxyId,
  successUrl,
  email,
}: {
  successUrl: string;
  cancelUrl: string;
  proxyId: string;
  email: string;
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: email,
    mode: "subscription",
    metadata: { proxyId },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export function webhookEventConstructor(event: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("Stripe webhook secret is not defined");
  }

  return stripe.webhooks.constructEvent(event, signature, webhookSecret);
}

export function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}
