
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      <Navigation />

      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Background sparkles effect */}
            <div className="absolute inset-0 -z-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-amber-400"
                  initial={{ 
                    x: Math.random() * 100 - 50 + "%", 
                    y: Math.random() * 100 - 50 + "%",
                    opacity: 0.2,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    opacity: [0.2, 0.8, 0.2], 
                    scale: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 1, Math.random() * 0.5 + 0.5]
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.div
                className="text-9xl font-bold bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-display inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 7px rgba(255,191,0,0.5)", 
                    "0 0 10px rgba(255,191,0,0.8)", 
                    "0 0 7px rgba(255,191,0,0.5)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                404
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-bold mb-4 font-display bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent"
            >
              Page Not Found
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8 max-w-lg mx-auto"
            >
              Sorry, the page you're looking for doesn't exist or has been moved. 
              Let's get you back on track to planning your perfect event.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <Link to="/">
                <Button size="lg" className="mx-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 shadow-lg shadow-amber-600/20">
                  Return to Home
                </Button>
              </Link>
              
              <Link to="/booking">
                <Button size="lg" variant="outline" className="mx-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 shadow-lg shadow-amber-600/10">
                  Book an Event
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
