import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUploadUrl } from "@/lib/upload";
import { v4 as uuidv4 } from "uuid";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, fileType } = await request.json();

    let updateData: any = {
      name,
      description,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    };

    // If a new image is being uploaded
    if (fileType) {
      const fileName = `${uuidv4()}.${fileType.split("/")[1]}`;
      const { signedUrl, imageUrl } = await getUploadUrl(fileName, fileType);
      updateData.imageUrl = imageUrl;
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ category, signedUrl: updateData.signedUrl });
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