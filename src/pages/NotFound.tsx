
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Flower } from "lucide-react";

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

  const flowerVariants = {
    hidden: { opacity: 0, rotate: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      rotate: [0, 15, 0, -15, 0], 
      scale: 1,
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "mirror" 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-rose-50 to-white text-gray-800">
      <Navigation />

      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Background flower elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    opacity: 0.1 + Math.random() * 0.5,
                    scale: 0.5 + Math.random() * 1
                  }}
                  animate={{ 
                    y: [
                      `${Math.random() * 100}%`, 
                      `${Math.random() * 100 - 10}%`, 
                      `${Math.random() * 100}%`
                    ],
                  }}
                  transition={{ 
                    duration: 10 + Math.random() * 20, 
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  <Flower size={24} className="text-pink-200" />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.div
                className="text-9xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent font-display inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 7px rgba(236,72,153,0.3)", 
                    "0 0 10px rgba(236,72,153,0.5)", 
                    "0 0 7px rgba(236,72,153,0.3)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                404
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-bold mb-4 font-display bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent"
            >
              Page Not Found
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-lg mx-auto"
            >
              Sorry, the page you're looking for doesn't exist or has been moved. 
              Let's get you back on track to planning your perfect floral event.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <Link to="/">
                <Button size="lg" className="mx-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:from-pink-500 hover:to-rose-600 shadow-lg shadow-pink-400/20">
                  Return to Home
                </Button>
              </Link>
              
              <Link to="/booking">
                <Button size="lg" variant="outline" className="mx-2 border-pink-400 text-pink-500 hover:bg-pink-50 shadow-lg shadow-pink-400/10">
                  Book an Event
                </Button>
              </Link>
            </motion.div>

            {/* Decorative flowers */}
            <motion.div 
              className="absolute -bottom-16 -left-16 opacity-20 -z-10"
              variants={flowerVariants}
            >
              <Flower size={150} className="text-pink-300" />
            </motion.div>
            
            <motion.div 
              className="absolute -top-16 -right-16 opacity-20 -z-10"
              variants={flowerVariants}
            >
              <Flower size={150} className="text-rose-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
