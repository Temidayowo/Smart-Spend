import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Test1234!", 12);

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      passwordHash: hashedPassword,
      name: "Test User",
      emailVerified: new Date(),
      verifiedAt: new Date(),
    },
  });

  console.log(`✅ User seeded: ${user.email}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
