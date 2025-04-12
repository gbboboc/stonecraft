import Image from "next/image";
import Link from "next/link";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-600 line-clamp-2">{category.description}</p>
    </Link>
  );
}
