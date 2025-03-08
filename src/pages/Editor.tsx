
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface EditorProps {
  image: File;
  previewUrl: string;
  onBack: () => void;
  onSave: (blob: Blob) => void;
}

export default function Editor({ image, previewUrl, onBack, onSave }: EditorProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = previewUrl;
    
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setCanvas(canvas);
      }
    };
  }, [previewUrl]);

  const handleResize = (newWidth: number, newHeight: number) => {
    if (!canvas) return;
    
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = newWidth;
    resizedCanvas.height = newHeight;
    const ctx = resizedCanvas.getContext("2d");
    
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
      setCanvas(resizedCanvas);
      setWidth(newWidth);
      setHeight(newHeight);
      toast.success("Image resized successfully!");
    }
  };

  const handleFilter = (filterType: string) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset filter
    ctx.filter = "none";
    ctx.drawImage(canvas, 0, 0);

    // Apply new filter
    switch (filterType) {
      case "grayscale":
        ctx.filter = "grayscale(100%)";
        break;
      case "sepia":
        ctx.filter = "sepia(100%)";
        break;
      case "blur":
        ctx.filter = "blur(5px)";
        break;
      case "brightness":
        ctx.filter = "brightness(150%)";
        break;
      default:
        ctx.filter = "none";
    }
    
    ctx.drawImage(canvas, 0, 0);
    setFilter(filterType);
    toast.success("Filter applied successfully!");
  };

  const handleSave = () => {
    if (!canvas) return;
    
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onSave(blob);
          toast.success("Image saved successfully!");
        }
      },
      "image/jpeg",
      quality / 100
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Compression Quality</label>
          <Slider
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
            min={1}
            max={100}
            step={1}
          />
          <span className="text-sm text-muted-foreground">{quality}%</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Dimensions</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={width}
              onChange={(e) => handleResize(Number(e.target.value), height)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="flex items-center">×</span>
            <input
              type="number"
              value={height}
              onChange={(e) => handleResize(width, Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Filters</label>
          <Select value={filter} onValueChange={handleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="grayscale">Grayscale</SelectItem>
              <SelectItem value="sepia">Sepia</SelectItem>
              <SelectItem value="blur">Blur</SelectItem>
              <SelectItem value="brightness">Brightness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
