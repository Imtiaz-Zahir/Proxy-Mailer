import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createProxy({
  domain,
  port,
  serverIp,
  userEmail,
}: {
  serverIp: string;
  domain: string;
  port: number;
  userEmail: string;
}) {
  return prisma.proxies.create({
    data: {
      serverIp,
      domain,
      port,
      userEmail,
    },
  });
}

export function getProxies(userEmail: string) {
  return prisma.proxies.findMany({ where: { userEmail } });
}

export function updateProxy(
  proxyId: string,
  data: {
    domain?: string;
    port?: number;
    serverIp?: string;
    subscriptionEndAt?: Date;
  }
) {
  return prisma.proxies.update({
    where: { id: proxyId },
    data,
  });
}

export function getProxyById(proxyId: string) {
  return prisma.proxies.findUnique({ where: { id: proxyId } });
}
