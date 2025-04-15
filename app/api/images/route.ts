import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const categories = ['monuments', 'cross', 'sculptures', 'other-pictures'];

    let images = [];

    if (category) {
      // Return images from specific category
      const categoryPath = path.join(uploadsDir, category);
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath);
        images = files
          .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
          .map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            filename: file,
            category: category,
            path: `/uploads/${category}/${file}`,
            mimeType: `image/${file.split('.').pop()}`,
            size: fs.statSync(path.join(categoryPath, file)).size,
            metadata: {
              width: 0,
              height: 0,
              format: file.split('.').pop(),
              createdAt: new Date().toISOString()
            },
            uploadedAt: new Date().toISOString()
          }));
      }
    } else {
      // Return images from all categories
      for (const cat of categories) {
        const categoryPath = path.join(uploadsDir, cat);
        if (fs.existsSync(categoryPath)) {
          const files = fs.readdirSync(categoryPath);
          const categoryImages = files
            .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            .map(file => ({
              id: Math.random().toString(36).substr(2, 9),
              filename: file,
              category: cat,
              path: `/uploads/${cat}/${file}`,
              mimeType: `image/${file.split('.').pop()}`,
              size: fs.statSync(path.join(categoryPath, file)).size,
              metadata: {
                width: 0,
                height: 0,
                format: file.split('.').pop(),
                createdAt: new Date().toISOString()
              },
              uploadedAt: new Date().toISOString()
            }));
          images = [...images, ...categoryImages];
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 