"use server";
import { auth, signOut } from "@/auth";
import {
  createProxy,
  getProxies,
  getProxyById,
  updateProxy,
} from "@/services/proxy";
import { getUsersByEmail } from "@/services/user";
import { redirect } from "next/navigation";

export async function getProxiesAction() {
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

    const proxies = await getProxies(user.email);

    return proxies;
  } catch (error) {
    console.error(error);
  }
}

export async function createProxyAction({
  domain,
  port,
  serverIp,
}: {
  serverIp: string;
  domain: string;
  port: number;
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

    const proxy = await createProxy({
      domain,
      port,
      serverIp,
      userEmail: user.email,
    });

    return proxy;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProxyAction(
  proxyId: string,
  {
    domain,
    port,
    serverIp,
  }: {
    serverIp?: string;
    domain?: string;
    port?: number;
  }
) {
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

    const proxy = await getProxyById(proxyId);

    if (!proxy) {
      return "Proxy not found";
    }

    if (proxy.userEmail !== user.email) {
      return "You do not have permission to update this proxy";
    }

    const updatedProxy = await updateProxy(proxyId, {
      domain,
      port,
      serverIp,
    });

    return updatedProxy;
  } catch (error) {
    console.error(error);
    return "An error occurred while updating the proxy";
  }
}
