import Image from "next/image";
import { ChevronRight, Plus } from "lucide-react";
import { Sculpture } from "../types";

interface SculptureCardProps {
  sculpture: Sculpture;
  variant?: "default" | "featured";
}

export function SculptureCard({
  sculpture,
  variant = "default",
}: SculptureCardProps) {
  if (variant === "featured") {
    return (
      <div className="relative h-[500px] rounded-sm overflow-hidden">
        <Image
          src={sculpture.imageUrl}
          alt={sculpture.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
          <span className="text-white/80 text-sm uppercase tracking-wider mb-2">
            Featured Work
          </span>
          <h3 className="text-white text-2xl font-bold mb-2">
            {sculpture.title}
          </h3>
          <p className="text-white/90 mb-6">{sculpture.description}</p>
          <button className="bg-white text-[#333333] py-2 px-6 rounded-sm font-medium w-max hover:bg-[#F5F5F5] transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
        <Image
          src={sculpture.imageUrl}
          alt={sculpture.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-bold mb-2 text-[#333333]">
        {sculpture.title}
      </h3>
      <p className="text-[#666666] mb-4">{sculpture.description}</p>
      <button className="text-[#D6A461] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
        <span>View Details</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
