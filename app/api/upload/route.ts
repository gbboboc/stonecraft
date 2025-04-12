import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const sculptureId = formData.get("sculptureId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "sculptures");
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    console.log("Saving file to:", filepath);

    // Save the file
    await writeFile(filepath, buffer);

    // Update the sculpture in the database
    const imageUrl = `/uploads/sculptures/${filename}`;
    const updatedSculpture = await prisma.sculpture.update({
      where: { id: sculptureId },
      data: { imageUrl },
    });

    console.log("File saved successfully. Image URL:", imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl,
      sculpture: updatedSculpture,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 