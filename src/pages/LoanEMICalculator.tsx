import { Card } from "@/components/ui/card";
import { useState, useCallback } from "react";

const LoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEMI = useCallback(() => {
    if (!loanAmount || !interestRate || !tenure) return;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const tenureMonths = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (isNaN(principal) || isNaN(rate) || isNaN(tenureMonths) || tenureMonths <= 0) return;

    const monthlyRate = rate / 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                     (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalAmount = emiValue * tenureMonths;
    const totalInterestPaid = totalAmount - principal;

    setEmi(parseFloat(emiValue.toFixed(2)));
    setTotalInterest(parseFloat(totalInterestPaid.toFixed(2)));
    setTotalPayment(parseFloat(totalAmount.toFixed(2)));
  }, [loanAmount, interestRate, tenure, tenureType]);

  return (
      <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
              <Card className="p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
                  <h2 className="text-xl font-semibold mb-4">Loan EMI Calculator</h2>

                  {/* Input Fields */}
                  <input
                      type="number"
                      placeholder="Loan Amount (₹)"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                      type="number"
                      placeholder="Interest Rate (%)"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                      type="number"
                      placeholder="Loan Tenure"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Tenure Type Selector */}
                  <div className="flex justify-center gap-4 mb-4">
                      {["years", "months"].map((t) => (
                          <button
                              key={t}
                              onClick={() => setTenureType(t as "years" | "months")}
                              className={`px-4 py-2 rounded ${tenureType === t ? "bg-primary text-white" : "bg-gray-200"}`}
                          >
                              {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                      ))}
                  </div>

                  {/* Calculate Button */}
                  <button
                      onClick={calculateEMI}
                      className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                  >
                      Calculate EMI
                  </button>

                  {/* Result Display */}
                  {emi !== null && (
                      <div className="mt-4 text-center">
                          <h3 className="text-lg font-semibold">Monthly EMI: ₹{emi}</h3>
                          <p>Total Interest: ₹{totalInterest}</p>
                          <p>Total Payment: ₹{totalPayment}</p>
                      </div>
                  )}
              </Card>
          </div>
      </div>
  );
};

export default LoanEMICalculator;
