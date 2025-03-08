import ConverterCard from "../components/ConverterCard";

const WeightConverter = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen  pt-20">
      <ConverterCard title="Weight" unitFrom="Kilograms" unitTo="Pounds" conversionFactor={2.20462} />
      <ConverterCard title="Grams" unitFrom="Grams" unitTo="Ounces" conversionFactor={0.035274} />
    </div>
  );
};
export default WeightConverter;
