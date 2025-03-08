
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const frameColors = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Gold", value: "#FFD700" },
  { name: "Silver", value: "#C0C0C0" },
  { name: "Bronze", value: "#CD7F32" },
];

export default function Frames() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [frameWidth, setFrameWidth] = useState("20");
  const [frameColor, setFrameColor] = useState("#000000");

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleDownload = () => {
    if (!selectedFile || !previewUrl) return;

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frameSize = Math.min(img.width, img.height) * (Number(frameWidth) / 100);
      canvas.width = img.width + frameSize * 2;
      canvas.height = img.height + frameSize * 2;

      // Draw frame
      ctx.fillStyle = frameColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, frameSize, frameSize);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `framed-image.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success("Image downloaded successfully!");
        },
        "image/png",
        1
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
            <h1 className="text-3xl font-bold">Add Frame</h1>
            <p className="text-muted-foreground">
              Add decorative frames to your images
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!previewUrl ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-6">
              <div
                className="relative aspect-video rounded-lg overflow-hidden"
                style={{
                  padding: `${frameWidth}px`,
                  backgroundColor: frameColor,
                }}
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain bg-white"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Frame Width ({frameWidth}%)
                  </label>
                  <Input
                    type="range"
                    min="1"
                    max="50"
                    value={frameWidth}
                    onChange={(e) => setFrameWidth(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Frame Color
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {frameColors.map((color) => (
                      <Button
                        key={color.value}
                        variant={frameColor === color.value ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setFrameColor(color.value)}
                      >
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleDownload} className="flex-1">
                    Download Framed Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setFrameWidth("20");
                      setFrameColor("#000000");
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
