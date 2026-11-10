-- AlterTable
ALTER TABLE "User" ADD COLUMN "paddleCustomerId" TEXT,
ADD COLUMN "paddleLastEventAt" TIMESTAMP(3),
ADD COLUMN "paddleSubscriptionId" TEXT,
ADD COLUMN "subscriptionCancelAt" TIMESTAMP(3),
ADD COLUMN "subscriptionPeriodEnd" TIMESTAMP(3),
ADD COLUMN "subscriptionPriceId" TEXT,
ADD COLUMN "subscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_paddleSubscriptionId_key" ON "User"("paddleSubscriptionId");

-- CreateIndex
CREATE INDEX "User_paddleCustomerId_idx" ON "User"("paddleCustomerId");
