
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Type, Image as ImageIcon } from "lucide-react";

interface WatermarkControlsProps {
  watermarkText: string;
  watermarkImageUrl: string | null;
  onWatermarkTextChange: (text: string) => void;
  onWatermarkImageClick: () => void;
  onClearWatermarkImage: () => void;
}

export default function WatermarkControls({
  watermarkText,
  watermarkImageUrl,
  onWatermarkTextChange,
  onWatermarkImageClick,
  onClearWatermarkImage,
}: WatermarkControlsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`w-full ${!watermarkImageUrl ? "bg-primary/10" : ""}`}
          onClick={onClearWatermarkImage}
        >
          <Type className="mr-2" />
          Text Watermark
        </Button>
        <Button
          variant="outline"
          className={`w-full ${watermarkImageUrl ? "bg-primary/10" : ""}`}
          onClick={onWatermarkImageClick}
        >
          <ImageIcon className="mr-2" />
          Image Watermark
        </Button>
      </div>

      {!watermarkImageUrl && (
        <Input
          type="text"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={(e) => onWatermarkTextChange(e.target.value)}
        />
      )}
    </div>
  );
}
