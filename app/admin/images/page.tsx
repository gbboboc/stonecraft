"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit2, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageData {
  id: string;
  url: string;
  title: string;
  category: string;
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Sigur doriți să ștergeți această imagine?")) {
      try {
        const response = await fetch(`/api/images/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setImages(images.filter((img) => img.id !== id));
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const url = editingImage
        ? `/api/images/${editingImage.id}`
        : "/api/images";
      const method = editingImage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const updatedImage = await response.json();
        if (editingImage) {
          setImages(
            images.map((img) =>
              img.id === updatedImage.id ? updatedImage : img
            )
          );
        } else {
          setImages([...images, updatedImage]);
        }
        setIsDialogOpen(false);
        setEditingImage(null);
      }
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Imagini</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Imagine
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagine</TableHead>
              <TableHead>Titlu</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{image.title}</TableCell>
                <TableCell>{image.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingImage ? "Editează Imaginea" : "Adaugă Imagine Nouă"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Titlu</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingImage?.title}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Categorie</Label>
              <Select
                name="category"
                defaultValue={editingImage?.category}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectează o categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image">Imagine</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required={!editingImage}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Anulează
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Se salvează..."
                  : editingImage
                  ? "Salvează Modificările"
                  : "Adaugă Imaginea"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
