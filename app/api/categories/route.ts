import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        sculptures: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileName = `${uuidv4()}${path.extname(image.name)}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "categories");
    
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Save the file
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    // Create category in database
    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        imageUrl: `/uploads/categories/${fileName}`,
      },
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
} 