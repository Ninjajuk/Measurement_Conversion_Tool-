import { useState } from "react";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState("");

  const generateNumber = () => setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Random Number Generator</h2>
      <button onClick={generateNumber} className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      {randomNumber && <p className="mt-4">Random Number: {randomNumber}</p>}
    </div>
    </div>
    </div>
  );
};

export default RandomNumberGenerator;
