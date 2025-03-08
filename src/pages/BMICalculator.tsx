import { Card } from "@/components/ui/card";
import { useState } from "react";

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = (): void => {
    if (!weight || !height) return;

    let bmiValue: number;
    if (unit === "metric") {
      bmiValue = parseFloat(weight) / ((parseFloat(height) / 100) ** 2);
    } else {
      bmiValue = (parseFloat(weight) / (parseFloat(height) ** 2)) * 703;
    }

    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    setBmi(roundedBmi);
    classifyBMI(roundedBmi);
  };

  const classifyBMI = (bmi: number): void => {
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi >= 18.5 && bmi < 24.9) setCategory("Normal Weight");
    else if (bmi >= 25 && bmi < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
      <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
              <Card className=" p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
                  <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>

                  {/* Unit Toggle */}
                  <div className="flex justify-center gap-4 mb-4">
                      <button
                          onClick={() => setUnit("metric")}
                          className={`px-4 py-2 rounded ${unit === "metric" ? "bg-primary text-white" : "bg-gray-200"}`}
                      >
                          Metric (kg, cm)
                      </button>
                      <button
                          onClick={() => setUnit("imperial")}
                          className={`px-4 py-2 rounded ${unit === "imperial" ? "bg-primary text-white" : "bg-gray-200"}`}
                      >
                          Imperial (lbs, inches)
                      </button>
                  </div>

                  {/* Input Fields */}
                  <input
                      type="number"
                      placeholder={unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                      type="number"
                      placeholder={unit === "metric" ? "Height (cm)" : "Height (inches)"}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Calculate Button */}
                  <button
                      onClick={calculateBMI}
                      className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                  >
                      Calculate BMI
                  </button>

                  {/* Result Display */}
                  {bmi !== null && (
                      <div className="mt-4 text-center">
                          <h3 className="text-lg font-semibold">
                              Your BMI: <span className="text-primary">{bmi}</span>
                          </h3>
                          <p
                              className={`mt-2 text-lg font-medium ${category === "Underweight"
                                      ? "text-yellow-500"
                                      : category === "Normal Weight"
                                          ? "text-green-500"
                                          : category === "Overweight"
                                              ? "text-orange-500"
                                              : "text-red-500"
                                  }`}
                          >
                              {category}
                          </p>
                      </div>
                  )}
              </Card>
          </div>
      </div>
  );
};

export default BMICalculator;
