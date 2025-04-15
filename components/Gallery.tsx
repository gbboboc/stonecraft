import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useImages } from "../hooks/useImages";

const CATEGORIES = ["Toate", "Sculpturi", "Troițe", "Monumente", "Altele"];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toate");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { images, loading, error } = useImages(
    selectedCategory === "Toate" ? undefined : selectedCategory
  );

  useEffect(() => {
    console.log("Gallery received images:", {
      count: images.length,
      category: selectedCategory,
      images: images.map((img) => ({
        path: img.path,
        category: img.category,
        filename: img.filename,
      })),
    });
  }, [images, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D6A461]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Error loading images: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              console.log("Selecting category:", category);
              setSelectedCategory(category);
            }}
            className={`px-6 py-2 rounded-sm text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-[#333333] text-white"
                : "bg-white text-[#333333] hover:bg-[#F5F5F5]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image.path)}
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
              <Image
                key={image.path}
                src={image.path}
                alt={image.filename}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                onError={(e) => {
                  console.error("Failed to load image:", image.path);
                  e.currentTarget.style.display = "none";
                }}
                priority={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#333333] mb-1 line-clamp-1">
                {image.filename}
              </h3>
              <p className="text-sm text-[#666666]">{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#D6A461] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={selectedImage}
              src={selectedImage}
              alt="Selected image"
              fill
              className="object-contain"
              sizes="100vw"
              onError={(e) => {
                console.error("Failed to load lightbox image:", selectedImage);
                e.currentTarget.style.display = "none";
              }}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
