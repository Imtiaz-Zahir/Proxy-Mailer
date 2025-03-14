import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSubscription, webhookEventConstructor } from "@/services/stripe";
import { updateProxy } from "@/services/proxy";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const requestHeaders = await headers();
  const signature = requestHeaders.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  const event = webhookEventConstructor(body, signature);

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }

  const proxyId = event.data.object.metadata?.proxyId;

  if (!proxyId) {
    return NextResponse.json({ error: "No proxy id found" }, { status: 400 });
  }

  let subscription = event.data.object.subscription;

  if (!subscription) {
    return NextResponse.json(
      { error: "No subscription id found" },
      { status: 400 }
    );
  }

  if (typeof subscription === "string") {
    subscription = await getSubscription(subscription);
  }

  if (!subscription) {
    return NextResponse.json(
      { error: "Subscription not found" },
      { status: 400 }
    );
  }

  const subscriptionEndAt = new Date(subscription.current_period_end * 1000);

  await updateProxy(proxyId, { subscriptionEndAt });

  return NextResponse.json({ received: true });
}
