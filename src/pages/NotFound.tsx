
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navigation />

      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-9xl font-bold text-amber-400 font-display"
              >
                404
              </motion.div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 font-display">Page Not Found</h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved. 
              Let's get you back on track to planning your perfect event.
            </p>
            
            <div className="space-y-4">
              <Link to="/">
                <Button size="lg" className="mx-2 bg-amber-400 text-black hover:bg-amber-500">
                  Return to Home
                </Button>
              </Link>
              
              <Link to="/booking">
                <Button size="lg" variant="outline" className="mx-2 border-amber-400 text-amber-400 hover:bg-amber-400/10">
                  Book an Event
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
