"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewSculpturePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    features: "",
    material: "",
    photos: [] as File[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        // Filter out the "Toate" category
        const filteredCategories = data.filter(
          (category: Category) => category.name !== "Toate"
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.categoryId);
      form.append("material", formData.material);

      // Handle features
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      form.append("features", JSON.stringify(featuresArray));

      // Handle photos
      formData.photos.forEach((photo) => {
        form.append("photos", photo);
      });

      const response = await fetch("/api/sculptures", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      if (result.success) {
        router.push("/admin/sculptures");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        photos: Array.from(e.target.files),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Adaugă Sculptură Nouă
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalii Sculptură</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titlu</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categorie</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează o categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="features">Caracteristici</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="Introduceți caracteristicile separate prin virgulă"
                />
              </div>

              <div>
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="photos">Fotografii</Label>
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                {formData.photos.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.photos.length} fotografii selectate
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
              >
                Anulează
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Se salvează..." : "Salvează Sculptura"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
