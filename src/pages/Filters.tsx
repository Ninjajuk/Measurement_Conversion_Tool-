
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const filters = [
  { name: "Normal", class: "" },
  { name: "Grayscale", class: "filter grayscale" },
  { name: "Sepia", class: "filter sepia" },
  { name: "Blur", class: "filter blur-sm" },
  { name: "Brightness", class: "filter brightness-125" },
  { name: "Contrast", class: "filter contrast-125" },
  { name: "Saturation", class: "filter saturate-150" },
  { name: "Hue Rotate", class: "filter hue-rotate-90" },
  { name: "Invert", class: "filter invert" },
];

export default function Filters() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("");

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      // Apply the filter effects using CSS filter
      ctx.filter = activeFilter
        .replace("filter", "")
        .replace("grayscale", "grayscale(100%)")
        .replace("sepia", "sepia(100%)")
        .replace("blur-sm", "blur(4px)")
        .replace("brightness-125", "brightness(125%)")
        .replace("contrast-125", "contrast(125%)")
        .replace("saturate-150", "saturate(150%)")
        .replace("hue-rotate-90", "hue-rotate(90deg)")
        .replace("invert", "invert(100%)");

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `filtered-image.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Image downloaded successfully!");
      }, "image/png");
    };

    img.src = previewUrl;
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Apply Filters</h1>
            <p className="text-muted-foreground">
              Enhance your images with various filters
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
                  className={`w-full h-full object-contain ${activeFilter}`}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filters.map((filter) => (
                  <Button
                    key={filter.name}
                    variant={activeFilter === filter.class ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter.class)}
                    className="w-full"
                  >
                    {filter.name}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  disabled={!activeFilter}
                >
                  Download Filtered Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setActiveFilter("");
                  }}
                >
                  Upload Another Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
