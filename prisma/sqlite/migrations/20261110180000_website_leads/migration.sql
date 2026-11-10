-- CreateTable
CREATE TABLE "WebsiteLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "hosting" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "ipHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "WebsiteLead_createdAt_idx" ON "WebsiteLead"("createdAt");

-- CreateIndex
CREATE INDEX "WebsiteLead_ipHash_createdAt_idx" ON "WebsiteLead"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "WebsiteLead_phone_createdAt_idx" ON "WebsiteLead"("phone", "createdAt");
