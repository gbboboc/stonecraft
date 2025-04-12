"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Sculpture Management
        </h1>
        <Button onClick={() => router.push("/admin/sculptures/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Sculpture
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Sculptures</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Add and manage your sculptures. Each sculpture can have:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Title and Description</li>
            <li>Category</li>
            <li>Features</li>
            <li>Material</li>
            <li>Photos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
