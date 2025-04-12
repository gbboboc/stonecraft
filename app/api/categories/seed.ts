import { prisma } from "@/lib/prisma";

const categories = [
  {
    name: "Toate",
    slug: "toate",
    description: "Toate sculpturile",
  },
  {
    name: "Monumente din Piatră",
    slug: "monumente-din-piatra",
    description: "Monumente și structuri din piatră",
  },
  {
    name: "Sculpturi",
    slug: "sculpturi",
    description: "Sculpturi artistice",
  },
  {
    name: "Cruci din Piatră",
    slug: "cruci-din-piatra",
    description: "Cruci și monumente funerare din piatră",
  },
  {
    name: "Altele",
    slug: "altele",
    description: "Alte tipuri de sculpturi și monumente",
  },
];

async function main() {
  try {
    // Delete all existing categories
    await prisma.category.deleteMany();

    // Create new categories
    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 