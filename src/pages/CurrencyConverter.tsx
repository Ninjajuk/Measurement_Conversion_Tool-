import { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    if (amount) convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = async () => {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-2 border rounded-md mb-2" />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="p-2 border rounded-md mb-2">
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="p-2 border rounded-md mb-2">
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      <p className="mt-4">Converted Amount: {convertedAmount} {toCurrency}</p>
    </div>
  );
};

export default CurrencyConverter;
