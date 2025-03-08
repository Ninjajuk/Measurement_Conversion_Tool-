
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Compress() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState("80");

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleCompress = () => {
    if (!selectedFile || !previewUrl) return;

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `compressed-image.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success("Image compressed and downloaded successfully!");
        },
        "image/jpeg",
        Number(quality) / 100
      );
    };
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Compress Image</h1>
            <p className="text-muted-foreground">
              Reduce the file size of your images
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!previewUrl ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quality ({quality}%)
                  </label>
                  <Input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleCompress} className="flex-1">
                    Download Compressed Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setQuality("80");
                    }}
                  >
                    Upload Another Image
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
