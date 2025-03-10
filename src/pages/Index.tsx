
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {

  Landmark,
  Gem,
  Percent,
  Footprints,
  Utensils,
  FileText,
  Scale,
  Calendar,Clock,
  Clock12,
  QrCode,
  Coins,
  Dice2,
  ChartNoAxesColumnDecreasingIcon
} from "lucide-react";
import { HorizontalAd } from "../components/ui/AdTopBottom";
import ReviewSlider from "@/components/ui/ReviewSlider";
import ImageResizerGuide from "@/components/ui/MultiToolCalculator";
import MultiToolCalculator from "@/components/ui/MultiToolCalculator";
import { FaRegCompass, FaYoutube } from "react-icons/fa";
import HeroSection from "@/components/Hero";

const features = [
  {
    id: "length-converter",
    name: "Length-Converter",
    description: "Calculate length",
    icon: Calendar,
    path: "/converter/length",
  },
  {
    id: "weight-converter",
    name: "Weight-Converter",
    description: "Calculate Weight",
    icon: Calendar,
    path: "/converter/weight",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your age based on your birth date",
    icon: Calendar,
    path: "/calculators/age",
  },
  {
    id: "age-difference",
    name: "Age Difference",
    description: "Calculate your age difference based on your birth date",
    icon: Calendar,
    path: "/age-difference",
  },
  {
    id: "date-difference-converter",
    name: "Date Difference",
    description: "Calculate date-difference using our tools",
    icon: Calendar,
    path: "/date-difference-converter",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI)",
    icon: Scale,
    path: "/calculators/bmi",
  },
  {
    id: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    description: "Calculate your Loan EMI",
    icon: Scale,
    path: "/calculators/loan-emi",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count the number of words in a text",
    icon: FileText,
    path: "/calculators/word-counter",
  },
  {
    id: "time-zone-converter",
    name: "Time-Zone-Converter",
    description: "Different time Zine",
    icon: Clock12,
    path: "/time-zone-converter",
  },
  {
    id: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate your daily calorie intake",
    icon: Utensils,
    path: "/calculators/calorie",
  },
  {
    id: "calorie-to-steps",
    name: "Calorie-to-Steps",
    description: "Convert calories burned to steps",
    icon: Footprints,
    path: "/calculators/calorie-to-steps",
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages easily",
    icon: Percent,
    path: "/calculators/percentage",
  },
  {
    id: "gold-loan-calculator",
    name: "Gold Loan Calculator",
    description: "Calculate loan amounts against gold",
    icon: Gem,
    path: "/calculators/gold-loan",
  },
  {
    id: "income-tax-calculator-new",
    name: "Income Tax Calculator (New Regime)",
    description: "Calculate income tax under the new regime",
    icon: Landmark,
    path: "/calculators/income-tax-new",
  },
  {
    id: "income-tax-calculator-old",
    name: "Income Tax Calculator (Old Regime)",
    description: "Calculate income tax under the old regime",
    icon: Landmark,
    path: "/calculators/income-tax-old",
  },
  {
    id: "Digital Clock",
    name: "Time-Zone-Converter",
    description: "Different time Zine",
    icon: Clock,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "World Clock",
    description: "World time Zone",
    icon: Clock12,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "URL Shortener",
    description: "Easily and smoothj URL Shortener",
    icon: Clock12,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "Youtube Thumbnail Download",
    description: "Easily and smoothj Youtube",
    icon: FaYoutube,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "QR Code Generator",
    description: "Easily generate QR Code",
    icon: QrCode,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "Coin Flip",
    description: "Easily flip Coin Flip",
    icon: Coins,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "Virtual Dice",
    description: "Easily flip Dice ",
    icon: Dice2,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "Random Color Generator",
    description: "Easily flip Dice ",
    icon: ChartNoAxesColumnDecreasingIcon,
    path: "/time-zone-converter",
  },
  {
    id: "time-zone-converter",
    name: "AI Powerd Lucky Number",
    description: "Easily flip Dice ",
    icon: FaRegCompass,
    path: "/time-zone-converter",
  },
];

export default function Index() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        {/* <HeroSection/> */}
        <h1 className="text-4xl font-bold mb-2 text-center pt-16"> Welcome to Multi-Tool Webiste <span className="text-primary font-bold">NinjaTool</span></h1>
        <p className="text-muted-foreground text-center mb-12">
         Calculate anything with our tools at your fingertips
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature,index) => (
            <>
            <Link
              key={feature.id}
              to={feature.path}
              className="transition-transform hover:scale-105"
            >
              <Card className="p-6 h-full hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <feature.icon className="w-12 h-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Get Started
                  </Button>
                </div>
              </Card>
            </Link>
             {(index + 1) % 3 === 0 && <HorizontalAd position="bottom" maxWidth="max-w-4xl" />}
             </>
          ))}
        </div>
        <MultiToolCalculator/>
        <ReviewSlider/>
      </div>
    </div>
  );
}
