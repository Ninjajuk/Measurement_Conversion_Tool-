
import { Input } from "@/components/ui/input";

interface WatermarkAdjustmentsProps {
  opacity: string;
  scale: string;
  onOpacityChange: (value: string) => void;
  onScaleChange: (value: string) => void;
}

export default function WatermarkAdjustments({
  opacity,
  scale,
  onOpacityChange,
  onScaleChange,
}: WatermarkAdjustmentsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Opacity ({opacity}%)
        </label>
        <Input
          type="range"
          min="1"
          max="100"
          value={opacity}
          onChange={(e) => onOpacityChange(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Scale ({scale}%)
        </label>
        <Input
          type="range"
          min="5"
          max="100"
          value={scale}
          onChange={(e) => onScaleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
