import * as bcrypt from "bcrypt";
import prisma from "./client";

async function main() {
  // Hash the default password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN", // Assuming you have a role field in your User model
    },
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
