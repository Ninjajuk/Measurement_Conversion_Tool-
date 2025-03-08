import { useState } from "react";
import { Card } from "./ui/card";

interface ConverterCardProps {
  title: string;
  unitFrom: string;
  unitTo: string;
  conversionFactor: number;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ title, unitFrom, unitTo, conversionFactor }) => {
  const [value, setValue] = useState<string>("");

  const convert = (): string => (value ? (parseFloat(value) * conversionFactor).toFixed(2) : "");

  return (
    <Card className=" p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">{title} Converter</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${unitFrom}`}
        className="w-full p-2 border text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <p className="mt-4 text-lg">
        {value} {unitFrom} = {convert()} {unitTo}
      </p>
    </Card>
  );
};

export default ConverterCard;
