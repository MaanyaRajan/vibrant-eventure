
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

  const flowerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        delay: 0.1 * i,
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 2
      }
    })
  };

  return (
    <div className="relative inline-flex items-center">
      {showFlowers && (
        <>
          {/* Flower decorations */}
          <motion.div
            className="absolute -left-3 -top-3"
            variants={flowerVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <Flower className="h-4 w-4 text-pink-400" />
          </motion.div>
          
          <motion.div
            className="absolute -right-3 -top-2"
            variants={flowerVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <Flower className="h-3 w-3 text-purple-400" />
          </motion.div>
          
          <motion.div
            className="absolute -right-2 -bottom-2"
            variants={flowerVariants}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <Flower className="h-4 w-4 text-blue-400" />
          </motion.div>
          
          <motion.div
            className="absolute -left-2 -bottom-3"
            variants={flowerVariants}
            custom={3}
            initial="hidden"
            animate="visible"
          >
            <Flower className="h-3 w-3 text-green-400" />
          </motion.div>
        </>
      )}
      
      <h1 className={`font-bold font-display ${logoSizes[size]} bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text`}>
        Eventure
      </h1>
    </div>
  );
};

export default EventureLogo;
