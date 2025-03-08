
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/ImageUploader";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { HorizontalAd } from "../components/ui/AdTopBottom";

export default function Crop() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [targetSize, setTargetSize] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleDownload = async () => {
    if (!selectedFile || !previewUrl) {
      toast.error("Please upload an image first");
      return;
    }

    // Check if either dimensions or target size is provided
    if (!width && !height && !targetSize) {
      toast.error("Please provide either dimensions or target size");
      return;
    }

    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      // If dimensions are provided, use them. Otherwise use original dimensions
      const finalWidth = width ? parseInt(width) : img.naturalWidth;
      const finalHeight = height ? parseInt(height) : img.naturalHeight;

      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          // Only check size if target size is provided
          if (targetSize) {
            const actualSize = blob.size / 1024; // Convert to KB
            const targetSizeKB = parseFloat(targetSize);
            
            // Warn user if size exceeds target but still allow download
            if (actualSize > targetSizeKB) {
              toast.warning(`Image size (${actualSize.toFixed(2)}KB) exceeds target size (${targetSizeKB}KB), but you can still download it`);
            } else {
              toast.success("Image resized successfully!");
            }
          } else {
            toast.success("Image resized successfully!");
          }

          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `resized-image.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        },
        "image/png",
        0.8
      );
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
            <h1 className="text-3xl font-bold">Crop & Resize</h1>
            <p className="text-muted-foreground">
              Resize your images by dimensions or target file size
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Width (px) - Optional</label>
                  <Input
                    type="number"
                    placeholder="e.g., 800"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Height (px) - Optional</label>
                  <Input
                    type="number"
                    placeholder="e.g., 600"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Target Size (KB) - Optional</label>
                  <Input
                    type="number"
                    placeholder="e.g., 500"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  disabled={!previewUrl || (!width && !height && !targetSize)}
                >
                  Download Resized Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setWidth("");
                    setHeight("");
                    setTargetSize("");
                  }}
                >
                  Upload Another Image
                </Button>
              </div>
            </div>
          )}
        </div>

        <HorizontalAd position="bottom" maxWidth="max-w-4xl"/>
    
        
      </div>
    </div>
  );
}
