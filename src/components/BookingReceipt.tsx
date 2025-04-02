
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingReceiptProps {
  event: {
    name: string;
    date: string;
    time: string;
    location: string;
    guests: number;
    theme: string;
    price: string;
    addons: { name: string; price: string }[];
  };
  isVisible: boolean;
  onClose: () => void;
  onPay: () => void;
}

const BookingReceipt = ({ event, isVisible, onClose, onPay }: BookingReceiptProps) => {
  // Calculate total
  const addonsTotal = event.addons.reduce(
    (sum, addon) => sum + parseFloat(addon.price.replace("$", "")),
    0
  );
  const basePrice = parseFloat(event.price.replace("$", ""));
  const total = basePrice + addonsTotal;

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Decorative top border */}
            <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-t-2xl"></div>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Flower size={40} className="text-pink-500 mx-auto mb-2" />
                </motion.div>
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold font-display bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
                  variants={itemVariants}
                >
                  Your Event Booking
                </motion.h2>
                <motion.p 
                  className="text-gray-500"
                  variants={itemVariants}
                >
                  Please review your booking details before proceeding to payment
                </motion.p>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                variants={itemVariants}
              >
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700 border-b border-gray-200 pb-2">Event Details</h3>
                  
                  <div>
                    <p className="text-sm text-gray-500">Event Name</p>
                    <p className="font-medium">{event.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{event.date} at {event.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Number of Guests</p>
                    <p className="font-medium">{event.guests}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700 border-b border-gray-200 pb-2">Theme & Add-ons</h3>
                  
                  <div>
                    <p className="text-sm text-gray-500">Selected Theme</p>
                    <p className="font-medium">{event.theme}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Add-ons</p>
                    {event.addons.length > 0 ? (
                      <ul className="space-y-1">
                        {event.addons.map((addon, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{addon.name}</span>
                            <span className="font-medium">{addon.price}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No add-ons selected</p>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-50 p-4 rounded-xl mb-6"
                variants={itemVariants}
              >
                <h3 className="font-bold text-gray-700 mb-3">Price Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Package Price</span>
                    <span>{event.price}</span>
                  </div>
                  
                  {addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Add-ons Total</span>
                      <span>${addonsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                    <span>Total Price</span>
                    <span className="text-pink-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col-reverse sm:flex-row gap-4 justify-end"
                variants={itemVariants}
              >
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-gray-200 text-gray-700 hover:bg-gray-100"
                >
                  Go Back
                </Button>
                <Button 
                  onClick={onPay}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Proceed to Payment
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingReceipt;
