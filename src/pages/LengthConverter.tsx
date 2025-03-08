import ConverterCard from "../components/ConverterCard";

const LengthConverter = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen border  pt-20">
      <ConverterCard title="Length" unitFrom="Meters" unitTo="Kilometers" conversionFactor={0.001} />
      <ConverterCard title="Inches" unitFrom="Inches" unitTo="Centimeters" conversionFactor={2.54} />
    </div>
  );
};
export default LengthConverter;
