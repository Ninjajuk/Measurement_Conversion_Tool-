import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

// Define the type for each review
interface Review {
  name: string;
  title: string;
  content: string;
}

// Sample reviews
const reviews: Review[] = [
  {
    name: "Samsuddin Ansari",
    title: "Powerful & Hassle-Free!",
    content:
      "Absolutely love how fast and efficient this tool is! No annoying ads, no interruptions—just a seamless experience with tons of useful features.",
  },
  {
    name: "Aayat Khan",
    title: "Smooth & Effortless!",
    content:
      "I was worried about resizing my image correctly, but this tool made it incredibly easy! The process was smooth, quick, and frustration-free.",
  },
  {
    name: "Ajuking",
    title: "Best Image Resizer Out There!",
    content:
      "A clean and elegant interface with an effortless user experience! No popups, no paywalls—just a fantastic tool that gets the job done.",
  },
];


const ReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold ">
      Your Go-To Tool for Quick & Easy Resizing!
      </h2>
      <p className="text-center text-gray-600 mt-2">
      Join a community of creators who simplify image resizing with our powerful tools at NinjaPix
      </p>

      <div className="overflow-hidden relative mt-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-full max-w-full px-4 md:px-6 lg:px-8 flex-shrink-0"
            >
              <div className=" p-6 rounded-lg shadow-lg border text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* <div className="flex gap-1 text-green-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                  </div> */}
                  <FaCheckCircle className="text-gray-500" />
                  <span className="text-gray-500">Verified</span>
                </div>
                <h3 className="text-lg font-semibold text-primary">{review.title}</h3>
                <p className="text-gray-600 mt-2">{review.content}</p>
                <p className="text-sm font-semibold mt-3 text-gray-600 ">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-primary text-white rounded-full hover:bg-accent transition"
          onClick={prevSlide}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-primary text-white rounded-full hover:bg-accent transition"
          onClick={nextSlide}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-gray-900" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
