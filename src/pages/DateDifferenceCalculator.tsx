import { useState } from "react";
import moment from "moment";
import { Card } from "@/components/ui/card";

const DateDifferenceCalculator = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [difference, setDifference] = useState("");

  const calculateDifference = () => {
    if (!date1 || !date2) return;
    const diff = moment.duration(moment(date2).diff(moment(date1)));
    setDifference(`${diff.years()} Years, ${diff.months()} Months, ${diff.days()} Days`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col gap-2">
        <Card className="p-6  rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Date Difference Calculator</h2>
          <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="p-2 border rounded-md mb-2 text-gray-700" />
          <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="p-2 border rounded-md mb-2 text-gray-700" />
          <button onClick={calculateDifference} className="bg-primary text-white px-4 py-2 rounded">Calculate</button>
          {difference && <p className="mt-4">Difference: {difference}</p>}
        </Card>
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;
