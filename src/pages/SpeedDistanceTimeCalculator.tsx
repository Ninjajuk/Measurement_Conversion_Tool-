import { useState } from "react";

const SpeedDistanceTimeCalculator = () => {
  const [speed, setSpeed] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const calculate = () => {
    const speedNum = parseFloat(speed);
    const distanceNum = parseFloat(distance);
    const timeNum = parseFloat(time);

    if (!isNaN(speedNum) && !isNaN(timeNum)) {
      setDistance((speedNum * timeNum).toFixed(2));
    } else if (!isNaN(distanceNum) && !isNaN(timeNum)) {
      setSpeed((distanceNum / timeNum).toFixed(2));
    } else if (!isNaN(speedNum) && !isNaN(distanceNum)) {
      setTime((distanceNum / speedNum).toFixed(2));
    } else {
      alert("Please provide valid inputs for two fields to calculate the third.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Speed, Distance & Time Calculator</h2>
      <input
        type="number"
        placeholder="Speed (km/h)"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        className="p-2 border rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="p-2 border rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Time (hours)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 border rounded-md mb-2"
      />
      <button
        onClick={calculate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
    </div>
    </div>
    </div>
  );
};

export default SpeedDistanceTimeCalculator;