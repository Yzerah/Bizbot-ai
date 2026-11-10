-- AlterTable
ALTER TABLE "User" ADD COLUMN "paddleCustomerId" TEXT;
ALTER TABLE "User" ADD COLUMN "paddleLastEventAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "paddleSubscriptionId" TEXT;
ALTER TABLE "User" ADD COLUMN "subscriptionCancelAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "subscriptionPeriodEnd" DATETIME;
ALTER TABLE "User" ADD COLUMN "subscriptionPriceId" TEXT;
ALTER TABLE "User" ADD COLUMN "subscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_paddleSubscriptionId_key" ON "User"("paddleSubscriptionId");

-- CreateIndex
CREATE INDEX "User_paddleCustomerId_idx" ON "User"("paddleCustomerId");
