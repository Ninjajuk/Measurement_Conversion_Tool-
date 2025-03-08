import React from "react";

interface FooterSection {
  title: string;
  links: string[];
}

const footerSections: FooterSection[] = [
  {
    title: "AI Tools",
    links: [
      "Image Resizer",
      "Bulk Image Resizer",
      "Image Compressor",
      "Crop Image",
      "Collage Maker",
      "Flip Image",
      "Rotate Image",
      "Image Enlarger",
      "Color Picker",
      "Meme Generator",
    ],
  },
  {
    title: "Investment",
    links: [
      "Stock Market Calculator",
      "Compound Interest Calculator",
      "Mutual Fund SIP Calculator",
      "Lumpsum Investment Calculator",
      "Fixed Deposit (FD) Calculator",
      "Recurring Deposit (RD) Calculator",
      "Gold Investment Calculator",
      "Crypto Investment Tracker",
    ],
  },
  {
    title: "Tax & Salary Tools",
    links: [
      "Income Tax Calculator",
      "GST Calculator",
      "Salary Tax Calculator",
      "Take Home Salary Calculator",
      "PF (Provident Fund) Calculator",
      "Gratuity Calculator",
    ],
  },
  {
    title: "Retirement",
    links: [
      "Retirement Calculator",
      "Pension Plan Estimator",
      "401(k) Contribution Calculator",
      "Social Security Benefits Estimator",
      "Annuity Calculator",
      "Life Expectancy Calculator",
    ],
  },
  {
    title: "Other",
    links: [
      "Android Image Converter App",
      "iOS Image Converter",
      "Android Collage Maker",
      "iOS Collage Maker",
      "Android Video Compressor App",
      "iOS Video Compressor App",
    ],
  },
  // {
  //   title: "About",
  //   links: ["Contact Us", "Imprint", "Privacy Policy", "Terms of Service"],
  // },
];


const FooterTop: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-3 text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i} className="text-xs">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="text-primary font-bold">NinjaTool</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTop;
