import { useState, useEffect } from 'react';

interface ImageData {
  id: number;
  filename: string;
  category: string;
  path: string;
  mimeType: string;
  size: number;
  metadata: {
    width: number;
    height: number;
    format: string;
    createdAt: string;
  };
  uploadedAt: string;
}

export function useImages(category?: string) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = category 
          ? `/api/images?category=${encodeURIComponent(category)}`
          : '/api/images';
          
        console.log('Fetching images from:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.success) {
          setImages(data.data);
        } else {
          setError(data.error || 'Failed to fetch images');
        }
      } catch (err) {
        console.error('Error in fetchImages:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  return { images, loading, error };
} 