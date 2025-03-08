
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import WatermarkControls from "@/components/watermark/WatermarkControls";
import WatermarkImagePreview from "@/components/watermark/WatermarkImagePreview";
import WatermarkAdjustments from "@/components/watermark/WatermarkAdjustments";

export default function Watermark() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImageUrl, setWatermarkImageUrl] = useState<string | null>(null);
  const [opacity, setOpacity] = useState("50");
  const [scale, setScale] = useState("30");
  const watermarkInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleWatermarkImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setWatermarkImage(file);
      const url = URL.createObjectURL(file);
      setWatermarkImageUrl(url);
      toast.success("Watermark image uploaded!");
    }
  };

  const handleDownload = () => {
    if (!selectedFile || !previewUrl) {
      toast.error("Please upload an image first");
      return;
    }

    if (!watermarkText && !watermarkImageUrl) {
      toast.error("Please add either text or image watermark");
      return;
    }

    const mainImage = new Image();
    mainImage.src = previewUrl;

    mainImage.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Could not initialize canvas");
        return;
      }

      canvas.width = mainImage.width;
      canvas.height = mainImage.height;
      ctx.drawImage(mainImage, 0, 0);

      if (watermarkText) {
        ctx.save();
        ctx.globalAlpha = Number(opacity) / 100;
        const fontSize = (Math.min(canvas.width, canvas.height) * Number(scale)) / 100;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.strokeStyle = "black";
        ctx.lineWidth = fontSize / 25;
        ctx.strokeText(
          watermarkText,
          canvas.width / 2,
          canvas.height / 2
        );
        ctx.fillText(
          watermarkText,
          canvas.width / 2,
          canvas.height / 2
        );
        ctx.restore();

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              toast.error("Failed to create image");
              return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "watermarked-image.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast.success("Image downloaded successfully!");
          },
          "image/png",
          1
        );
      } else if (watermarkImageUrl) {
        const watermarkImg = new Image();
        watermarkImg.src = watermarkImageUrl;
        watermarkImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = Number(opacity) / 100;
          const watermarkSize = (Math.min(canvas.width, canvas.height) * Number(scale)) / 100;
          const aspectRatio = watermarkImg.width / watermarkImg.height;
          const watermarkWidth = watermarkSize * aspectRatio;
          const watermarkHeight = watermarkSize;

          ctx.drawImage(
            watermarkImg,
            (canvas.width - watermarkWidth) / 2,
            (canvas.height - watermarkHeight) / 2,
            watermarkWidth,
            watermarkHeight
          );
          ctx.restore();

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                toast.error("Failed to create image");
                return;
              }
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "watermarked-image.png";
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
      }
    };
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setWatermarkText("");
    setWatermarkImage(null);
    setWatermarkImageUrl(null);
    setOpacity("50");
    setScale("30");
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
            <h1 className="text-3xl font-bold">Add Watermark</h1>
            <p className="text-muted-foreground">
              Add text or image watermarks to your images
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!previewUrl ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-6">
              <WatermarkImagePreview previewUrl={previewUrl} />

              <input
                type="file"
                ref={watermarkInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleWatermarkImageSelect}
              />

              <WatermarkControls
                watermarkText={watermarkText}
                watermarkImageUrl={watermarkImageUrl}
                onWatermarkTextChange={setWatermarkText}
                onWatermarkImageClick={() => watermarkInputRef.current?.click()}
                onClearWatermarkImage={() => {
                  setWatermarkImage(null);
                  setWatermarkImageUrl(null);
                }}
              />

              <WatermarkAdjustments
                opacity={opacity}
                scale={scale}
                onOpacityChange={setOpacity}
                onScaleChange={setScale}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  disabled={!watermarkText && !watermarkImageUrl}
                >
                  Download Watermarked Image
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
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
