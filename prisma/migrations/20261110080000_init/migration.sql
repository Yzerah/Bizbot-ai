-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "quotesCreated" INTEGER NOT NULL DEFAULT 0,
    "businessName" TEXT,
    "businessPhone" TEXT,
    "businessEmail" TEXT,
    "businessTaxId" TEXT,
    "businessLogo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT,
    "sellerName" TEXT NOT NULL,
    "sellerPhone" TEXT,
    "sellerEmail" TEXT,
    "sellerTaxId" TEXT,
    "sellerLogo" TEXT,
    "clientName" TEXT NOT NULL,
    "clientDetails" TEXT,
    "itemsJson" TEXT NOT NULL,
    "vatEnabled" BOOLEAN NOT NULL DEFAULT true,
    "vatRate" DOUBLE PRECISION NOT NULL DEFAULT 0.18,
    "validityDays" INTEGER NOT NULL DEFAULT 30,
    "notes" TEXT,
    "subtotalAgorot" INTEGER NOT NULL,
    "vatAgorot" INTEGER NOT NULL,
    "totalAgorot" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpgradeRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_PAYMENT_PROVIDER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpgradeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Quote_userId_createdAt_idx" ON "Quote"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_userId_number_key" ON "Quote"("userId", "number");

-- CreateIndex
CREATE INDEX "UpgradeRequest_userId_idx" ON "UpgradeRequest"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpgradeRequest" ADD CONSTRAINT "UpgradeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

