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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Sculpture {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  material: string;
  imageUrl: string;
  images: string[];
}

export default function SculpturesPage() {
  const router = useRouter();
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSculpture, setEditingSculpture] = useState<Sculpture | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    fetchSculptures();
    fetchCategories();
  }, []);

  const fetchSculptures = async () => {
    try {
      const response = await fetch("/api/sculptures");
      if (response.ok) {
        const data = await response.json();
        setSculptures(data.data);
      }
    } catch (error) {
      console.error("Error fetching sculptures:", error);
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

  const handleEdit = (sculpture: Sculpture) => {
    setEditingSculpture(sculpture);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Sigur doriți să ștergeți această sculptură?")) {
      try {
        const response = await fetch(`/api/sculptures?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setSculptures(sculptures.filter((s) => s.id !== id));
        }
      } catch (error) {
        console.error("Error deleting sculpture:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const url = editingSculpture
        ? `/api/sculptures/${editingSculpture.id}`
        : "/api/sculptures";
      const method = editingSculpture ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const updatedSculpture = await response.json();
        if (editingSculpture) {
          setSculptures(
            sculptures.map((s) =>
              s.id === updatedSculpture.data.id ? updatedSculpture.data : s
            )
          );
        } else {
          setSculptures([...sculptures, updatedSculpture.data]);
        }
        setIsDialogOpen(false);
        setEditingSculpture(null);
      }
    } catch (error) {
      console.error("Error saving sculpture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sculpturi</h1>
        <Button onClick={() => router.push("/admin/sculptures/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Sculptură Nouă
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagine</TableHead>
              <TableHead>Titlu</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sculptures.map((sculpture) => (
              <TableRow key={sculpture.id}>
                <TableCell>
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={sculpture.imageUrl}
                      alt={sculpture.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{sculpture.title}</TableCell>
                <TableCell>{sculpture.category}</TableCell>
                <TableCell>{sculpture.material}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(sculpture)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(sculpture.id)}
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingSculpture
                ? "Editează Sculptura"
                : "Adaugă Sculptură Nouă"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" value={editingSculpture?.id} />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titlu</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingSculpture?.title}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descriere</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingSculpture?.description}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categorie</Label>
                  <Select
                    name="category"
                    defaultValue={editingSculpture?.category}
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
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="features">Caracteristici</Label>
                  <Textarea
                    id="features"
                    name="features"
                    defaultValue={editingSculpture?.features.join(", ")}
                    placeholder="Introduceți caracteristicile separate prin virgulă"
                  />
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    name="material"
                    defaultValue={editingSculpture?.material}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="photos">Fotografii</Label>
                  <Input
                    id="photos"
                    name="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    required={!editingSculpture}
                  />
                </div>

                {editingSculpture && (
                  <div className="mt-4">
                    <Label>Fotografii existente</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {editingSculpture.images &&
                      editingSculpture.images.length > 0 ? (
                        editingSculpture.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative h-20 w-full overflow-hidden rounded-md"
                          >
                            <Image
                              src={image}
                              alt={`${editingSculpture.title} ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground col-span-3">
                          Nu există fotografii încărcate pentru această
                          sculptură
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingSculpture(null);
                }}
              >
                Anulează
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Se salvează..."
                  : editingSculpture
                  ? "Salvează Modificările"
                  : "Adaugă Sculptura"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
