import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return prisma.users.create({
    data: {
      email,
      name
    },
  });
}

export async function getUsersByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}
