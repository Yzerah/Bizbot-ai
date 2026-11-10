// Optional dev user: demo@example.com / Demo12345!  (local development only)
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();
const email = "demo@example.com";
await db.user.upsert({
  where: { email },
  update: {},
  create: { email, name: "משתמש דמו", passwordHash: await bcrypt.hash("Demo12345!", 12) },
});
console.log(`Seeded ${email} / Demo12345!`);
await db.$disconnect();
