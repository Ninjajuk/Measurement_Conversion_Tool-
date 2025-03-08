
interface WatermarkImagePreviewProps {
  previewUrl: string;
}

export default function WatermarkImagePreview({
  previewUrl,
}: WatermarkImagePreviewProps) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
