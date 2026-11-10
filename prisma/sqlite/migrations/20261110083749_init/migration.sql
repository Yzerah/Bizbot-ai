-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "vatRate" REAL NOT NULL DEFAULT 0.18,
    "validityDays" INTEGER NOT NULL DEFAULT 30,
    "notes" TEXT,
    "subtotalAgorot" INTEGER NOT NULL,
    "vatAgorot" INTEGER NOT NULL,
    "totalAgorot" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UpgradeRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_PAYMENT_PROVIDER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UpgradeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
