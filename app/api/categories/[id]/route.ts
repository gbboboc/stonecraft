import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    let updateData: any = {
      name,
      description,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    };

    // If a new image is being uploaded
    if (image) {
      const fileName = `${uuidv4()}${path.extname(image.name)}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "categories");
      
      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Save the file
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      updateData.imageUrl = `/uploads/categories/${fileName}`;
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
} 