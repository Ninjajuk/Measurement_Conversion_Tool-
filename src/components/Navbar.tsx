import { Moon, Sun, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";


const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    
    label: "Tax & Salary",
    submenu: [
      { label: "Income Tax", path: "/calculators/age" },
      { label: "Income Tax New Regime", path: "/calculators/age" },
      { label: "Income Tax Old Regime", path: "/calculators/age" },
      { label: "Take Home Salary", path: "/calculators/bmi" },
      { label: "GST", path: "/calculators/bmi" },
      { label: "PF", path: "/calculators/word-counter" },
      { label: "Gratuity", path: "/calculators/calorie" },
    ],
  },
  {
    
    label: "Investment",
    submenu: [
      { label: "Stock Market", path: "/calculators/age" },
      { label: "Compound Interest", path: "/calculators/age" },
      { label: "Mutual Fund SIP", path: "/calculators/age" },
      { label: "Lumpsum Investment", path: "/calculators/bmi" },
      { label: "Fixed Deposit (FD)", path: "/calculators/bmi" },
      { label: "Recurring Deposit (RD)", path: "/calculators/word-counter" },
      { label: "Gold Investment ", path: "/calculators/calorie" },
      { label: "Crypto Investment Tracker ", path: "/calculators/calorie" },
    ],
  },
  {
    
    label: "AI Tools",
    submenu: [
      { label: "Meme Generator", path: "/calculators/age" },
      { label: "Image Resizer", path: "/calculators/age" },
      { label: "Bulk Image Resizer", path: "/calculators/age" },
      { label: "Image Compressor", path: "/calculators/age" },
      { label: "Image Enlarger", path: "/calculators/bmi" },
      { label: "Color Picker", path: "/calculators/bmi" },
    
    ],
  },
  {
    
    label: "Calculators",
    submenu: [
      { label: "Age Calculator", path: "/calculators/age" },
      { label: "BMI Calculator", path: "/calculators/bmi" },
      { label: "Word Counter", path: "/calculators/word-counter" },
      { label: "Calorie Calculator", path: "/calculators/calorie" },
      { label: "Percentage Calculator", path: "/calculators/percentage" },
    ],
  },
  {
    
    label: "Other",
    submenu: [
      { label: "Age Calculator", path: "/calculators/age" },
      { label: "BMI Calculator", path: "/calculators/bmi" },
      { label: "Word Counter", path: "/calculators/word-counter" },
      { label: "Calorie Calculator", path: "/calculators/calorie" },
      { label: "Percentage Calculator", path: "/calculators/percentage" },
    ],
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // Track which submenu is open

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className=" flex items-center gap-2 text-xl font-bold tracking-tight text-primary transition-colors">
          <img src="/logo.webp" alt="Logo-NinjaTools" className="w-12 h-12 object-contain"/>
            NinjaTool
          </Link>
          <div className="flex items-center space-x-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden hover:bg-transparent"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => handleSubmenuToggle(item.label)}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        {item.label}
                        {openSubmenu === item.label ? (
                          <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                      {openSubmenu === item.label && (
                        <div className="absolute bg-background shadow-lg rounded-lg mt-2 py-2 w-48">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="block px-4 py-2 hover:bg-primary/10"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`hover:text-primary transition-colors ${
                        isActive(item.path) ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-transparent"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 hover:text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mt-8">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => handleSubmenuToggle(item.label)}
                        className="w-full text-left py-2 hover:text-primary transition-colors flex items-center justify-between"
                      >
                        {item.label}
                        {openSubmenu === item.label ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenu === item.label && (
                        <div className="pl-4">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="block py-2 hover:text-primary transition-colors"
                              onClick={toggleMobileMenu} // Close menu on link click
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-2 hover:text-primary transition-colors ${
                        isActive(item.path) ? "text-primary" : ""
                      }`}
                      onClick={toggleMobileMenu} // Close menu on link click
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mt-2 hover:bg-transparent"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}