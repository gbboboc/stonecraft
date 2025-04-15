import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sculptures } from '../../../data/sculptures';

// Mapare între numele categoriilor în română și directoarele corespunzătoare
const CATEGORY_MAPPING: { [key: string]: string } = {
  'Sculpturi': 'sculptures',
  'Troițe': 'cross',
  'Monumente': 'monuments',
  'Altele': 'other-pictures'
};

// Funcție helper pentru a găsi numele descriptiv al unei imagini
function getImageTitle(imagePath: string): string {
  const sculpture = sculptures.find(s => s.imageUrl === imagePath);
  return sculpture ? sculpture.title : path.basename(imagePath, path.extname(imagePath));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let images = [];

    if (category) {
      // Return images from specific category
      const categoryDir = CATEGORY_MAPPING[category];
      if (categoryDir) {
        const categoryPath = path.join(uploadsDir, categoryDir);
        if (fs.existsSync(categoryPath)) {
          const files = fs.readdirSync(categoryPath);
          images = files
            .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            .map(file => {
              const imagePath = `/uploads/${categoryDir}/${file}`;
              return {
                id: Math.random().toString(36).substr(2, 9),
                filename: getImageTitle(imagePath),
                category: category,
                path: imagePath,
                mimeType: `image/${file.split('.').pop()}`,
                size: fs.statSync(path.join(categoryPath, file)).size,
                metadata: {
                  width: 0,
                  height: 0,
                  format: file.split('.').pop(),
                  createdAt: new Date().toISOString()
                },
                uploadedAt: new Date().toISOString()
              };
            });
        }
      }
    } else {
      // Return images from all categories
      const categories = Object.keys(CATEGORY_MAPPING);
      for (const cat of categories) {
        const categoryDir = CATEGORY_MAPPING[cat];
        const categoryPath = path.join(uploadsDir, categoryDir);
        if (fs.existsSync(categoryPath)) {
          const files = fs.readdirSync(categoryPath);
          const categoryImages = files
            .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
            .map(file => {
              const imagePath = `/uploads/${categoryDir}/${file}`;
              return {
                id: Math.random().toString(36).substr(2, 9),
                filename: getImageTitle(imagePath),
                category: cat,
                path: imagePath,
                mimeType: `image/${file.split('.').pop()}`,
                size: fs.statSync(path.join(categoryPath, file)).size,
                metadata: {
                  width: 0,
                  height: 0,
                  format: file.split('.').pop(),
                  createdAt: new Date().toISOString()
                },
                uploadedAt: new Date().toISOString()
              };
            });
          images = [...images, ...categoryImages];
        }
      }
    }

    // Adăugăm header pentru a preveni cache-ul
    return new NextResponse(JSON.stringify({
      success: true,
      data: images
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 