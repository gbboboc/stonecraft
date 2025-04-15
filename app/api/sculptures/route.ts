import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sculptures } from '@/data/sculptures';

// Funcție helper pentru a salva datele în fișier
async function saveSculptures(sculptures: any[]) {
  const filePath = path.join(process.cwd(), 'data', 'sculptures.ts');
  const content = `export const sculptures = ${JSON.stringify(sculptures, null, 2)};`;
  await fs.promises.writeFile(filePath, content, 'utf-8');
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: sculptures
    });
  } catch (error) {
    console.error('Error fetching sculptures:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sculptures' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const features = formData.get('features') as string;
    const material = formData.get('material') as string;
    const photos = formData.getAll('photos') as File[];

    // Validare
    if (!title || !description || !category || !material || photos.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Procesare imagini
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category.toLowerCase());
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedPhotos = [];
    for (const photo of photos) {
      const buffer = await photo.arrayBuffer();
      const fileName = `${Date.now()}-${photo.name}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, Buffer.from(buffer));
      uploadedPhotos.push(`/uploads/${category.toLowerCase()}/${fileName}`);
    }

    // Creare sculptură nouă
    const newSculpture = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      features: features.split(',').map(f => f.trim()),
      material,
      imageUrl: uploadedPhotos[0],
      images: uploadedPhotos,
      createdAt: new Date().toISOString()
    };

    sculptures.push(newSculpture);
    await saveSculptures(sculptures);

    return NextResponse.json({
      success: true,
      data: newSculpture
    });
  } catch (error) {
    console.error('Error creating sculpture:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sculpture' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const features = formData.get('features') as string;
    const material = formData.get('material') as string;
    const photos = formData.getAll('photos') as File[];

    console.log('Received update request:', { id, title, category });

    // Validare
    if (!id || !title || !description || !category || !material) {
      return NextResponse.json(
        { success: false, error: 'Câmpurile obligatorii lipsesc' },
        { status: 400 }
      );
    }

    // Găsim sculptura existentă
    const sculptureIndex = sculptures.findIndex(s => s.id === id);
    if (sculptureIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Sculptura nu a fost găsită' },
        { status: 404 }
      );
    }

    const existingSculpture = sculptures[sculptureIndex];

    // Procesare imagini noi (dacă există)
    let updatedPhotos = existingSculpture.images || [existingSculpture.imageUrl];
    if (photos.length > 0 && photos[0].size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', category.toLowerCase());
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      updatedPhotos = [];
      for (const photo of photos) {
        const buffer = await photo.arrayBuffer();
        const fileName = `${Date.now()}-${photo.name}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, Buffer.from(buffer));
        const photoUrl = `/uploads/${category.toLowerCase()}/${fileName}`;
        updatedPhotos.push(photoUrl);
      }
    }

    // Parsăm caracteristicile
    let parsedFeatures = [];
    try {
      parsedFeatures = features.startsWith('[') 
        ? JSON.parse(features)
        : features.split(',').map(f => f.trim()).filter(Boolean);
    } catch (error) {
      console.error('Error parsing features:', error);
      parsedFeatures = [];
    }

    // Actualizare sculptură
    const updatedSculpture = {
      ...existingSculpture,
      title,
      description,
      category,
      features: parsedFeatures,
      material,
      imageUrl: updatedPhotos[0] || existingSculpture.imageUrl,
      images: updatedPhotos,
      updatedAt: new Date().toISOString()
    };

    // Actualizăm array-ul de sculpturi
    sculptures[sculptureIndex] = updatedSculpture;

    // Salvăm în fișier
    try {
      await saveSculptures([...sculptures]);
      console.log('Sculpture updated successfully:', updatedSculpture);

      return NextResponse.json({
        success: true,
        data: updatedSculpture,
        allSculptures: sculptures // Trimitem înapoi toate sculpturile actualizate
      });
    } catch (error) {
      console.error('Error saving sculptures:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la actualizarea sculpturii' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Sculpture ID is required' },
        { status: 400 }
      );
    }

    const sculptureIndex = sculptures.findIndex(s => s.id === id);
    if (sculptureIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Sculpture not found' },
        { status: 404 }
      );
    }

    // Ștergem imaginile asociate
    const sculpture = sculptures[sculptureIndex];
    for (const imageUrl of sculpture.images) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
      }
    }

    // Ștergem sculptura din array
    sculptures.splice(sculptureIndex, 1);
    await saveSculptures(sculptures);

    return NextResponse.json({
      success: true,
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting sculpture:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete sculpture' },
      { status: 500 }
    );
  }
} 