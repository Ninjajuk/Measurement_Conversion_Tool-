import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-blue-400">NinjaTool</span>
      </motion.h1>
      
      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Calculate anything with our tools at your fingertips
      </motion.p>

      <motion.button
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </motion.button>
    </section>
  );
};

export default HeroSection;
