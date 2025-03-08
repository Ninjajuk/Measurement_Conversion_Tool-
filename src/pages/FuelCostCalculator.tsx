import React, { useState } from "react";

const FuelCostCalculator: React.FC = () => {
  // State for input values
  const [distance, setDistance] = useState<number>(0); // Distance in kilometers or miles
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(0); // Fuel efficiency (km/l or miles/gallon)
  const [fuelPrice, setFuelPrice] = useState<number>(0); // Fuel price per liter or gallon
  const [fuelCost, setFuelCost] = useState<number | null>(null); // Calculated fuel cost

  // Calculate fuel cost
  const calculateFuelCost = () => {
    if (distance > 0 && fuelEfficiency > 0 && fuelPrice > 0) {
      const cost = (distance / fuelEfficiency) * fuelPrice;
      setFuelCost(parseFloat(cost.toFixed(2))); // Round to 2 decimal places
    } else {
      setFuelCost(null); // Reset if inputs are invalid
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Fuel Cost Calculator</h2>
      <div className="space-y-4">
        {/* Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Distance (km or miles):
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter distance"
          />
        </div>

        {/* Fuel Efficiency Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fuel Efficiency (km/l or miles/gallon):
          </label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter fuel efficiency"
          />
        </div>

        {/* Fuel Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fuel Price (per liter or gallon):
          </label>
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter fuel price"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateFuelCost}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Calculate Fuel Cost
        </button>

        {/* Result Display */}
        {fuelCost !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold text-gray-800">
              Total Fuel Cost: <span className="text-primary">${fuelCost}</span>
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default FuelCostCalculator;