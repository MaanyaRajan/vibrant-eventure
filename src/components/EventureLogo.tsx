
import { motion } from "framer-motion";
import { Flower } from "lucide-react";

interface EventureLogoProps {
  size?: "sm" | "md" | "lg";
  showFlowers?: boolean;
}

const EventureLogo = ({ size = "md", showFlowers = true }: EventureLogoProps) => {
  const logoSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const containerSizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  const flowerSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <motion.div 
      className={`relative inline-flex items-center ${containerSizes[size]} px-1`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {showFlowers && (
        <motion.div 
          className="absolute -left-3 -top-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flower size={flowerSizes[size]} className="text-floral-pink" />
        </motion.div>
      )}
      
      <h1 className={`font-bold font-display ${logoSizes[size]} bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text`}>
        Eventure
      </h1>
      
      {showFlowers && (
        <motion.div 
          className="absolute -right-3 -top-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Flower size={flowerSizes[size]} className="text-floral-lavender" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventureLogo;
