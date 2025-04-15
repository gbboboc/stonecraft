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
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "",
    features: "",
    material: "",
    photos: [] as File[],
  });
  const categories = [
    { id: "1", name: "Sculpturi" },
    { id: "2", name: "Troițe" },
    { id: "3", name: "Monumente" },
    { id: "4", name: "Altele" },
  ];

  useEffect(() => {
    fetchSculptures();
  }, []);

  useEffect(() => {
    if (editingSculpture) {
      setEditFormData({
        title: editingSculpture.title,
        description: editingSculpture.description,
        category: editingSculpture.category,
        features: editingSculpture.features.join(", "),
        material: editingSculpture.material,
        photos: [],
      });
    }
  }, [editingSculpture]);

  const fetchSculptures = async () => {
    console.log("=== START FETCH SCULPTURES ===");
    try {
      const response = await fetch("/api/sculptures");
      console.log("1. Fetch response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("2. Received data:", data);

      if (data.success && Array.isArray(data.data)) {
        console.log(
          "3. Updating sculptures state with",
          data.data.length,
          "items"
        );
        setSculptures(data.data);
      } else {
        console.error("4. Invalid data format:", data);
      }
    } catch (error) {
      console.error("ERROR in fetch sculptures:", error);
    }
    console.log("=== END FETCH SCULPTURES ===");
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditFormData((prev) => ({
        ...prev,
        photos: Array.from(e.target.files || []),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      if (editingSculpture) {
        formData.append("id", editingSculpture.id);
      }

      const features = formData.get("features") as string;
      if (features) {
        formData.delete("features");
        const featuresArray = features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
        formData.append("features", JSON.stringify(featuresArray));
      }

      const fileInput = form.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.delete("photos");
        for (const file of fileInput.files) {
          formData.append("photos", file);
        }
      }

      const response = await fetch("/api/sculptures", {
        method: editingSculpture ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      if (result.success) {
        if (editingSculpture) {
          setSculptures(
            sculptures.map((s) => (s.id === result.data.id ? result.data : s))
          );
        } else {
          setSculptures([...sculptures, result.data]);
        }
        setIsDialogOpen(false);
        setEditingSculpture(null);
        form.reset();
      } else {
        throw new Error(result.error || "Failed to save sculpture");
      }
    } catch (error) {
      console.error("Error saving sculpture:", error);
      alert(
        "A apărut o eroare la salvarea sculpturii. Vă rugăm să încercați din nou."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSculpture) return;
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("id", editingSculpture.id);
      form.append("title", editFormData.title);
      form.append("description", editFormData.description);
      form.append("category", editFormData.category);
      form.append("material", editFormData.material);

      // Handle features
      const featuresArray = editFormData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      form.append("features", JSON.stringify(featuresArray));

      // Handle photos
      editFormData.photos.forEach((photo) => {
        form.append("photos", photo);
      });

      const response = await fetch("/api/sculptures", {
        method: "PUT",
        body: form,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        // Actualizăm direct lista de sculpturi cu datele noi
        if (result.allSculptures) {
          setSculptures(result.allSculptures);
        }

        // Închidem dialogul și resetăm state-ul
        setIsDialogOpen(false);
        setEditingSculpture(null);
        setEditFormData({
          title: "",
          description: "",
          category: "",
          features: "",
          material: "",
          photos: [],
        });
      } else {
        throw new Error(result.error || "Failed to update sculpture");
      }
    } catch (error) {
      console.error("Error updating sculpture:", error);
      alert(
        "A apărut o eroare la actualizarea sculpturii. Vă rugăm să încercați din nou."
      );
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
          {editingSculpture ? (
            // Formular de editare
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input type="hidden" name="id" value={editingSculpture.id} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titlu</Label>
                    <Input
                      id="title"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descriere</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={editFormData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categorie</Label>
                    <Select
                      name="category"
                      value={editFormData.category}
                      onValueChange={handleCategoryChange}
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
                      value={editFormData.features}
                      onChange={handleInputChange}
                      placeholder="Introduceți caracteristicile separate prin virgulă"
                    />
                  </div>

                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      name="material"
                      value={editFormData.material}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="photos">Fotografii</Label>
                    <Input
                      id="photos"
                      name="photos"
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                    />
                  </div>

                  {editingSculpture.images &&
                    editingSculpture.images.length > 0 && (
                      <div className="mt-4">
                        <Label>Fotografii existente</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {editingSculpture.images.map((image, index) => (
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
                          ))}
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
                  {isLoading ? "Se salvează..." : "Salvează Modificările"}
                </Button>
              </div>
            </form>
          ) : (
            // Formular de adăugare
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titlu</Label>
                    <Input id="title" name="title" required />
                  </div>

                  <div>
                    <Label htmlFor="description">Descriere</Label>
                    <Textarea id="description" name="description" required />
                  </div>

                  <div>
                    <Label htmlFor="category">Categorie</Label>
                    <Select name="category" required>
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
                      placeholder="Introduceți caracteristicile separate prin virgulă"
                    />
                  </div>

                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Input id="material" name="material" required />
                  </div>

                  <div>
                    <Label htmlFor="photos">Fotografii</Label>
                    <Input
                      id="photos"
                      name="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Anulează
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Se salvează..." : "Adaugă Sculptura"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
