import { prisma } from "./prisma";

async function testConnection() {
  try {
    const categories = await prisma.category.findMany();
    console.log("Database connection successful!");
    console.log("Categories:", categories);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection(); 