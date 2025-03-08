import React from "react";
import { FaCalculator, FaMoneyBillWave, FaBirthdayCake, FaClock, FaHeartbeat } from "react-icons/fa";

const MultiToolCalculator: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center p-8 md:p-12 rounded-xl shadow-lg max-w-5xl mx-auto border mt-4">
      {/* Left Instructions Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          A <span className="text-primary">Multi-Tool Calculator</span> for All Your Needs
        </h2>
        <ul className="text-muted-foreground space-y-4">
          <li className="flex items-start">
            <span className="font-bold text-primary text-lg mr-2">1.</span>
            <span className="font-semibold">Financial Calculator:</span> 
            {/* Calculate loans, interest, and savings. */}
          </li>
          <li className="flex items-start">
            <span className="font-bold text-primary text-lg mr-2">2.</span>
            <span className="font-semibold">Age Calculator:</span> 
            {/* Determine your age in years, months, and days. */}
          </li>
          <li className="flex items-start">
            <span className="font-bold text-primary text-lg mr-2">3.</span>
            <span className="font-semibold">Time Calculator:</span>
             {/* Add or subtract time durations easily. */}
          </li>
          <li className="flex items-start">
            <span className="font-bold text-primary text-lg mr-2">4.</span>
            <span className="font-semibold">BMI Calculator:</span> 
            {/* Check your Body Mass Index for health insights. */}
          </li>
          <li className="flex items-start">
            <span className="font-bold text-primary text-lg mr-2">5.</span>
            <span className="font-semibold">And Much More Tools:</span> 
            {/* Explore additional calculators for everyday use. */}
          </li>
        </ul>
      </div>

      {/* Right Icons Section */}
      <div className="flex items-center justify-center p-10 bg-gray-20 rounded-xl md:w-1/2 mt-6 md:mt-0">
        <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <FaCalculator className="text-gray-500 text-7xl mb-2 h-48 w-48" />
          <div className="absolute bottom-3 right-3 bg-primary text-white p-2 rounded-full shadow-md">
            <FaMoneyBillWave className="text-2xl" />
          </div>
          <div className="absolute top-3 left-3 bg-accent text-white p-2 rounded-full shadow-md">
            <FaBirthdayCake className="text-2xl" />
          </div>
          <div className="absolute top-3 right-3 bg-accent text-white p-2 rounded-full shadow-md">
            <FaClock className="text-2xl" />
          </div>
          <div className="absolute bottom-3 left-3 bg-accent text-white p-2 rounded-full shadow-md">
            <FaHeartbeat className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiToolCalculator;