"use client";

import { useState } from "react";
import { CategoryList } from "@/components/admin/CategoryList";
import { CategoryDialog } from "@/components/admin/CategoryDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <CategoryList />
      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
