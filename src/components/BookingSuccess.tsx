
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flower, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessProps {
  isVisible: boolean;
  onClose: () => void;
}

const BookingSuccess = ({ isVisible, onClose }: BookingSuccessProps) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.3
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.4
      }
    }
  };

  const flowersVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({ 
      scale: 1, 
      opacity: 1,
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        delay: 0.6 + (i * 0.1),
        repeat: 5,
        repeatType: "mirror" as const
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: 0.9
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            <div className="relative h-28 mb-6">
              <motion.div 
                className="w-24 h-24 rounded-full bg-green-100 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                variants={circleVariants}
              >
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-green-500"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M17 30L25 38L43 20"
                    variants={checkVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </motion.div>

              {/* Animated flowers around the check */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={flowersVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute"
                  style={{
                    left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
                    top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Flower
                    size={i % 2 ? 16 : 20}
                    className={
                      i % 4 === 0 ? "text-pink-400" :
                      i % 4 === 1 ? "text-purple-400" :
                      i % 4 === 2 ? "text-blue-400" :
                      "text-green-400"
                    }
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={textVariants} initial="hidden" animate="visible">
              <h2 className="text-2xl font-bold font-display mb-2 bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                Event Booked Successfully!
              </h2>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                <PartyPopper className="h-5 w-5 text-pink-500" />
                <p className="text-gray-600">
                  We're excited to make your event special
                </p>
                <PartyPopper className="h-5 w-5 text-blue-500" />
              </div>

              <p className="text-gray-500 mb-6">
                A confirmation email with all the details has been sent to your registered email address.
              </p>

              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Return to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingSuccess;
