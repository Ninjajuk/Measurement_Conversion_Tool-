
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Convert from "./pages/Convert";
import Crop from "./pages/Crop";
import Compress from "./pages/Compress";
import Edit from "./pages/Edit";
import BackgroundRemove from "./pages/BackgroundRemove";
import Watermark from "./pages/Watermark";
import Filters from "./pages/Filters";
import Frames from "./pages/Frames";
import { AdContainer } from "./components/ui/AdContainer";
import { HorizontalAd } from "./components/ui/AdTopBottom";
import FooterTop from "./components/FooterTop";
import LengthConverter from "./pages/LengthConverter";
import WeightConverter from "./pages/WeightConverter";
import AgeCalculator from "./pages/AgeCalculator";
import BMICalculator from "./pages/BMICalculator";
import LoanEMICalculator from "./pages/LoanEMICalculator";
import TimeZoneConverter from "./pages/TimeZoneConverter";
import AgeDifferenceCalculator from "./pages/AgeDifferenceCalculator";
import SpeedDistanceTimeCalculator from "./pages/SpeedDistanceTimeCalculator";
import CurrencyConverter from "./pages/CurrencyConverter";
import DateDifferenceCalculator from "./pages/DateDifferenceCalculator";
import RandomNumberGenerator from "./pages/RandomNumberGenerator";
import WordCounter from "./pages/WordCounter";
import FuelCostCalculator from "./pages/FuelCostCalculator";
import FAQ from "./components/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <AdContainer position="left" />
          <AdContainer position="right" />
          <main className="flex-1 ">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/convert" element={<Convert />} />
              <Route path="/converter/length" element={<LengthConverter />} />
              <Route path="/converter/weight" element={<WeightConverter />} />
              <Route path="/speed-distance" element={<SpeedDistanceTimeCalculator />} />
              <Route path="/calculators/bmi" element={<BMICalculator />} />
              <Route path="/calculators/age" element={<AgeCalculator />} />
              <Route path="/age-difference" element={<AgeDifferenceCalculator />} />
              <Route path="/date-difference-converter" element={<DateDifferenceCalculator />} />
              <Route path="/calculators/loan-emi" element={<LoanEMICalculator />} />
              <Route path="/calculators/word-counter" element={<WordCounter />} />
              <Route path="/time-zone-converter" element={<TimeZoneConverter />} />
              <Route path="/currency-converter" element={<CurrencyConverter />} />
              <Route path="/random-number-converter" element={<RandomNumberGenerator />} />
              <Route path="/calculators/fuel-cost" element={<FuelCostCalculator />} />
              <Route path="/crop" element={<Crop />} />
              <Route path="/compress" element={<Compress />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/background-remove" element={<BackgroundRemove />} />
              <Route path="/watermark" element={<Watermark />} />
              <Route path="/filters" element={<Filters />} />
              <Route path="/frames" element={<Frames />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <HorizontalAd position="top" maxWidth="max-w-4xl" />
            <FooterTop />
          </main>
          {/* <FAQ/> */}
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
