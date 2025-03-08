import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="text-center p-8 bg-gray-950 shadow-lg rounded-2xl">
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page Not Found</p>
        <p className="text-lg text-gray-400 mb-6">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
