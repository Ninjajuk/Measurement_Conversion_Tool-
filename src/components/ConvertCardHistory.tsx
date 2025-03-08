import { useState, useEffect } from "react";

const ConverterCard = ({ title, unitFrom, unitTo, conversionFactor }) => {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(title)) || [];
    setHistory(savedHistory);
  }, [title]);

  const convert = () => (value ? (value * conversionFactor).toFixed(2) : "");

  const handleConvert = () => {
    if (!value) return;
    const result = `${value} ${unitFrom} = ${convert()} ${unitTo}`;
    const updatedHistory = [result, ...history.slice(0, 4)];
    setHistory(updatedHistory);
    localStorage.setItem(title, JSON.stringify(updatedHistory));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">{title} Converter</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${unitFrom}`}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleConvert}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
      >
        Convert
      </button>
      <p className="mt-4 text-lg">{value} {unitFrom} = {convert()} {unitTo}</p>

      {/* Recent Conversions */}
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Recent Conversions:</h3>
          <ul className="text-gray-600 mt-2">
            {history.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConverterCard;
