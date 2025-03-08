
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { HorizontalAd } from "../components/ui/AdTopBottom";

export default function Convert() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [outputFormat, setOutputFormat] = useState<string>("png");

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success("Image uploaded successfully!");
  };



  const handleDownload = async () => {
    if (!selectedFile || !previewUrl) return;

    try {
      const image = await createImageBitmap(selectedFile);
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `converted-image.${outputFormat}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success("Image downloaded successfully!");
        },
        `image/${outputFormat}`,
        0.8
      );
    } catch (error) {
      console.error("Error converting image:", error);
      toast.error("Failed to convert image. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
        <div className="max-w-2xl w-full flex flex-col gap-2">
        <div className="w-full p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Convert Format</h1>
            <p className="text-muted-foreground">
              Convert your images to different formats
            </p>
          </div>
        </div>
          {showPreview ? (
            <div onClick={() => setShowPreview(false)}>
              <div  className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
                <HorizontalAd position="bottom" />
              </div>
              <div
                className="w-full p-2  mx-auto text-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-md mt-2 cursor-pointer"
              >
              Upload Image
              </div>
            </div>

            ):(
        <div className="space-y-6">
          {!previewUrl ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-4">
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleDownload} className="flex-1">
                  Download
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="w-full"
              >
                Upload Another Image
              </Button>
            </div>
          )}
        </div>
        )}
        </div>
        <HorizontalAd position="bottom" />


      </div>

    </div>
  );
}


// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { HorizontalAd } from "./AdTopBottom";


// export default function Convert() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(
//     "https://www.donboscohsdiphu.in/Images/slide1.jpg"
//   );
//   const [showPreview, setShowPreview] = useState(true);
//   const [outputFormat, setOutputFormat] = useState<string>("png");
//   const [adWatched, setAdWatched] = useState(false);
//   const [timer, setTimer] = useState(2000); // 10-second delay before download is allowed

//   useEffect(() => {
//     if (previewUrl) {
//       const timer = setTimeout(() => setShowPreview(false), 5000); // Hide after 5 sec
//       return () => clearTimeout(timer);
//     }
//   }, [previewUrl]);

//   const handleDownload = async () => {
//     if (!selectedFile || !previewUrl) return;
//     if (!adWatched) {
//       toast.info("Please wait for the ad to load.");
//       return;
//     }

//     try {
//       const image = await createImageBitmap(selectedFile);
//       const canvas = document.createElement("canvas");
//       canvas.width = image.width;
//       canvas.height = image.height;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) throw new Error("Could not get canvas context");

//       ctx.drawImage(image, 0, 0);

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) return;
//           const url = URL.createObjectURL(blob);
//           const a = document.createElement("a");
//           a.href = url;
//           a.download = `converted-image.${outputFormat}`;
//           document.body.appendChild(a);
//           a.click();
//           document.body.removeChild(a);
//           URL.revokeObjectURL(url);
//           toast.success("Image downloaded successfully!");
//         },
//         `image/${outputFormat}`,
//         0.8
//       );
//     } catch (error) {
//       console.error("Error converting image:", error);
//       toast.error("Failed to convert image. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
//       <div className="max-w-2xl w-full flex flex-col gap-2">
//         <div className="w-full p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold">Convert Format</h1>

//           {showPreview  ?  (
//             <div className="space-y-4">
//               <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5 backdrop-blur-lg">
//                 {/* <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" /> */}
//                 <HorizontalAd position="bottom"/>
//               </div>

//               <HorizontalAd position="bottom"/> {/* Load Google AdSense ad here */}

//               <Button
//                 onClick={handleDownload}
//                 disabled={!adWatched}
//                 className="w-full"
//               >
//                 {adWatched ? "Download" : `Wait ${timer} sec to Download`}
//               </Button>

//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setSelectedFile(null);
//                   setPreviewUrl('https://avatars.githubusercontent.com/u/108830220?v=4');
//                   setAdWatched(false);
//                   setTimer(10);
//                 }}
//                 className="w-full"
//               >
//                 Upload Another Image
//               </Button>
//             </div>
//           ) : (
//             <p>Select an image to convert.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
