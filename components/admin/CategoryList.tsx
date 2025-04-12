"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { Category } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "./CategoryDialog";

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setCategories(categories.filter((cat) => cat.id !== id));
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CategoryDialog
        category={editingCategory}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={(updatedCategory) => {
          if (editingCategory) {
            setCategories(
              categories.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
              )
            );
          } else {
            setCategories([...categories, updatedCategory]);
          }
          setIsDialogOpen(false);
          setEditingCategory(null);
        }}
      />
    </>
  );
}
