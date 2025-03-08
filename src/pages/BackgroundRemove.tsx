import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { loadImage, removeBackground } from "@/lib/background-remover";

export default function BackgroundRemove() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setProcessedUrl(null);
    toast.success("Image uploaded successfully!");
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    try {
      setIsProcessing(true);
      const image = await loadImage(selectedFile);
      const processedBlob = await removeBackground(image);
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedUrl(processedUrl);
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;

    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = "no-background.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Image downloaded successfully!");
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
            <h1 className="text-3xl font-bold">Remove Background</h1>
            <p className="text-muted-foreground">
              Remove the background from your images
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!previewUrl ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Original</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Result</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-[url('/placeholder.svg')] bg-center bg-cover">
                    {processedUrl && (
                      <img
                        src={processedUrl}
                        alt="No Background"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRemoveBackground}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Remove Background"}
                </Button>
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  disabled={!processedUrl}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setProcessedUrl(null);
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
