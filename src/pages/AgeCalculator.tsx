import { Card } from "@/components/ui/card";
import { useState } from "react";

const AgeCalculator = () => {
    const [dob, setDob] = useState("");
    const [age, setAge] = useState(null);

    const calculateAge = () => {
        if (!dob) return;

        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
            <div className="max-w-2xl w-full flex flex-col gap-2">
                <Card className="p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
                    <h2 className="text-xl font-semibold mb-4">Age Calculator</h2>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full text-gray-700 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={calculateAge}
                        className="mt-3 bg-primary  px-4 py-2 rounded hover:bg-blue-600 transition-all"
                    >
                        Calculate Age
                    </button>

                    {age && (
                        <p className="mt-4 text-lg">
                            You are <span className="font-bold">{age.years}</span> years,{" "}
                            <span className="font-bold">{age.months}</span> months, and{" "}
                            <span className="font-bold">{age.days}</span> days old.
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AgeCalculator;
