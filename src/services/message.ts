import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createMessage(data: {
  email: string;
  name: string;
  message: string;
  company?: string;
}) {
  return prisma.messages.create({
    data,
  });
}
