import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUploadUrl } from "@/lib/upload";
import { v4 as uuidv4 } from "uuid";

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
    const { name, description, fileType } = await request.json();

    // Generate a unique filename
    const fileName = `${uuidv4()}.${fileType.split("/")[1]}`;

    // Get signed URL for upload
    const { signedUrl, imageUrl } = await getUploadUrl(fileName, fileType);

    // Create category in database
    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        imageUrl,
      },
    });

    return NextResponse.json({ category, signedUrl });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
} 