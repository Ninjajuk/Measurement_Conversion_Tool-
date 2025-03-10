import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Define the FAQ item type
type FAQItem = {
  question: string;
  answer: string;
};

// Sample FAQ data
const faqData: FAQItem[] = [
  {
    question: "What is this website about?",
    answer: "This website offers a collection of useful tools such as finance calculators, BMI calculators, word counters, URL shorteners, QR code generators, and more to simplify your daily tasks.",
  },
  {
    question: "How do I use the tools?",
    answer: "Simply select the tool you need from the navigation menu, input the required data, and the tool will process the information to provide you with the desired result.",
  },
  {
    question: "Is this website free to use?",
    answer: "Yes, all the tools on this website are completely free to use.",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer: "No, you can use all the tools without creating an account. However, creating an account allows you to save your results and access them later.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, we prioritize your privacy. We do not store any personal data unless you explicitly choose to save your results by creating an account.",
  },
];

// FAQ Component
const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm w-full" // Ensure full width
          >
            <button
              className="w-full flex justify-between items-center p-4 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-left">{faq.question}</span>
              {activeIndex === index ? (
                <FaChevronUp className="w-5 h-5" />
              ) : (
                <FaChevronDown className="w-5 h-5" />
              )}
            </button>
            {activeIndex === index && (
              <div className="p-4 pt-0">
                <p className="text-gray-600 text-left">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;