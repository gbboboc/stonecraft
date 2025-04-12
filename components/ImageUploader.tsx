import { useState } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  sculptureId: string;
  onUploadComplete?: (imageUrl: string) => void;
}

export function ImageUploader({
  sculptureId,
  onUploadComplete,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sculptureId", sculptureId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete?.(data.imageUrl);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading}
        />
        <div className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-sm hover:bg-[#222222] transition-colors">
          <Upload className="h-4 w-4" />
          <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
        </div>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
