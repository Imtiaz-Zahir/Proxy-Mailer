-- CreateTable
CREATE TABLE "Users" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Proxies" (
    "id" TEXT NOT NULL,
    "serverIp" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "subscriptionEndAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proxies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
