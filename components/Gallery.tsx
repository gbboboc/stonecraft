import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Sculpture } from "../types";
import { sculptures } from "../data/sculptures";

interface GalleryProps {
  sculptures: Sculpture[];
}

export function Gallery({ sculptures }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get unique categories
  const categories = ["All", ...new Set(sculptures.map((s) => s.category))];

  // Filter sculptures based on selected category
  const filteredSculptures =
    selectedCategory === "All"
      ? sculptures
      : sculptures.filter((s) => s.category === selectedCategory);

  return (
    <div className="relative">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
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
        {filteredSculptures.map((sculpture) => (
          <div
            key={sculpture.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(sculpture.imageUrl)}
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
              <Image
                src={sculpture.imageUrl}
                alt={sculpture.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#333333] mb-1 line-clamp-1">
                {sculpture.title}
              </h3>
              <p className="text-sm text-[#666666]">{sculpture.category}</p>
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
              src={selectedImage}
              alt="Selected sculpture"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
