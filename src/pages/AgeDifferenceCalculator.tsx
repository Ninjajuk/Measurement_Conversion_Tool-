import { useState } from "react";
import moment from "moment";
import { Card } from "@/components/ui/card";

const AgeDifferenceCalculator = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [difference, setDifference] = useState("");

  const calculateAgeDifference = () => {
    if (!date1 || !date2) return;

    const birth1 = moment(date1);
    const birth2 = moment(date2);
    const diff = moment.duration(birth2.diff(birth1));

    setDifference(`${Math.abs(diff.years())} Years, ${Math.abs(diff.months())} Months, ${Math.abs(diff.days())} Days`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <Card className="max-w-2xl w-full flex flex-col gap-2">
              <div className="p-6  rounded-lg shadow-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Age Difference Calculator</h2>
                  <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="p-2 border rounded-md mb-2 text-gray-700" />
                  <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="p-2 border rounded-md mb-2 text-gray-700" />
                  <button onClick={calculateAgeDifference} className="bg-primary text-white px-4 py-2 rounded-md">Calculate</button>
                  {difference && <p className="mt-4">Age Difference: {difference}</p>}
              </div>
          </Card>
      </div>
  );
};

export default AgeDifferenceCalculator;
