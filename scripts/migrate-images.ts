import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const prisma = new PrismaClient();
const readFile = promisify(fs.readFile);

async function migrateImages() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const categories = ['monuments', 'cross', 'sculptures', 'other-pictures', 'utils'];

    for (const category of categories) {
      const categoryPath = path.join(uploadsDir, category);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`Directory ${category} does not exist, skipping...`);
        continue;
      }

      const files = fs.readdirSync(categoryPath);
      
      for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          continue;
        }

        const filePath = path.join(categoryPath, file);
        const imageBuffer = await readFile(filePath);
        
        // Create image data object in JSON format
        const imageData = {
          filename: file,
          category: category,
          path: `/uploads/${category}/${file}`,
          mimeType: `image/${file.split('.').pop()}`,
          size: imageBuffer.length,
          metadata: {
            width: 0, // You can add image dimensions if needed
            height: 0,
            format: file.split('.').pop(),
            createdAt: new Date().toISOString()
          }
        };

        // Save to database
        await prisma.uploads.create({
          data: {
            imageData: imageData
          }
        });

        console.log(`Migrated: ${file}`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateImages(); 