import { NextResponse } from 'next/server';
import { Category } from '@/types';

// Definim categoriile disponibile
const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Sculpturi',
    description: 'Sculpturi din piatră',
    imageUrl: '/uploads/sculptures/sculpture-1.jpg',
    slug: 'sculpturi'
  },
  {
    id: '2',
    name: 'Troițe',
    description: 'Troițe și monumente religioase',
    imageUrl: '/uploads/cross/cross-1.jpg',
    slug: 'troite'
  },
  {
    id: '3',
    name: 'Monumente',
    description: 'Monumente funerare și comemorative',
    imageUrl: '/uploads/monuments/monument-1.jpg',
    slug: 'monumente'
  },
  {
    id: '4',
    name: 'Altele',
    description: 'Alte lucrări și proiecte',
    imageUrl: '/uploads/other-pictures/other-1.jpg',
    slug: 'altele'
  }
];

export async function GET() {
  try {
    return NextResponse.json(CATEGORIES);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newCategory: Category = {
      id: Math.random().toString(36).substr(2, 9),
      ...data
    };
    
    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updatedCategory = {
      ...data
    };
    
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
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
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 