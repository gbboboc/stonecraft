"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Image } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Administrare Sculpturi</CardTitle>
            <Button onClick={() => router.push("/admin/sculptures/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Sculptură
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Adaugă și gestionează sculpturile tale. Fiecare sculptură poate
            avea:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Titlu și Descriere</li>
            <li>Categorie</li>
            <li>Caracteristici</li>
            <li>Material</li>
            <li>Fotografii</li>
          </ul>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/admin/sculptures")}
            >
              <Image className="mr-2 h-4 w-4" />
              Vezi toate sculpturile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
