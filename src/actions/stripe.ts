"use server";
import { auth, signOut } from "@/auth";
import { createCheckoutSession } from "@/services/stripe";
import { getUsersByEmail } from "@/services/user";
import { redirect } from "next/navigation";

export async function getPaymentURL({
  cancelUrl,
  proxyId,
  successUrl,
}: {
  cancelUrl: string;
  proxyId: string;
  successUrl: string;
}) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      signOut();
      redirect("/");
    }

    const user = await getUsersByEmail(session.user?.email);

    if (!user) {
      signOut();
      redirect("/");
    }

    const checkout = await createCheckoutSession({
      email: user.email,
      cancelUrl,
      proxyId,
      successUrl,
    });

    return checkout.url;
  } catch (error) {
    console.error(error);
  }
}
