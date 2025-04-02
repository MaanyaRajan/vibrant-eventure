
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Flower } from "lucide-react";
import { motion } from "framer-motion";
import BookingReceipt from "@/components/BookingReceipt";
import BookingSuccess from "@/components/BookingSuccess";

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedTheme = searchParams.get("theme") || "";

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    theme: preSelectedTheme,
    date: "",
    time: "",
    location: "",
    guests: "",
    message: "",
    addons: [] as { name: string; price: string }[],
  });

  // Simulated addons
  const availableAddons = [
    { id: "photo", name: "Photography Package", price: "$499" },
    { id: "catering", name: "Premium Catering", price: "$899" },
    { id: "music", name: "Live Music", price: "$699" },
    { id: "decor", name: "Extra Decorations", price: "$299" },
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleAddonToggle = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: format(selectedDate, "PPP") }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add selected addons to form data
    const addonsData = availableAddons.filter(addon => 
      selectedAddons.includes(addon.id)
    );
    
    setFormData(prev => ({
      ...prev,
      addons: addonsData
    }));
    
    // Show receipt
    setShowReceipt(true);
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setShowReceipt(false);
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        theme: "",
        date: "",
        time: "",
        location: "",
        guests: "",
        message: "",
        addons: [],
      });
      setDate(undefined);
      setSelectedAddons([]);
    }, 1500);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  // Event type options
  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate Event" },
    { value: "anniversary", label: "Anniversary" },
  ];

  // Theme options based on event type
  const themeOptions = {
    wedding: [
      { value: "classic-elegance", label: "Classic Elegance" },
      { value: "rustic-romance", label: "Rustic Romance" },
      { value: "garden-bliss", label: "Garden Bliss" },
      { value: "modern-minimalist", label: "Modern Minimalist" },
      { value: "fairytale-fantasy", label: "Fairytale Fantasy" },
    ],
    birthday: [
      { value: "vintage-carnival", label: "Vintage Carnival" },
      { value: "tropical-paradise", label: "Tropical Paradise" },
      { value: "glamorous-gold", label: "Glamorous Gold" },
      { value: "neon-nights", label: "Neon Nights" },
      { value: "cosmic-adventure", label: "Cosmic Adventure" },
    ],
    corporate: [
      { value: "tech-innovation", label: "Tech Innovation" },
      { value: "classic-professional", label: "Classic Professional" },
      { value: "creative-collaboration", label: "Creative Collaboration" },
      { value: "sustainable-future", label: "Sustainable Future" },
      { value: "industrial-chic", label: "Industrial Chic" },
    ],
    anniversary: [
      { value: "romantic-reminiscence", label: "Romantic Reminiscence" },
      { value: "enchanted-evening", label: "Enchanted Evening" },
      { value: "globe-trotters", label: "Globe Trotters" },
      { value: "platinum-celebration", label: "Platinum Celebration" },
      { value: "retro-revival", label: "Retro Revival" },
    ],
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navigation />

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
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
              repeatType: "mirror" as const
            }}
          >
            <Flower 
              size={30 + Math.random() * 50} 
              className={`${
                i % 5 === 0 ? "text-pink-300" : 
                i % 5 === 1 ? "text-purple-300" : 
                i % 5 === 2 ? "text-blue-300" : 
                i % 5 === 3 ? "text-green-300" : 
                "text-yellow-300"
              }`}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex-grow container mx-auto py-16 px-4 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Book Your Event
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to start planning your perfect event. Our team of experienced event planners will work with you to create a memorable experience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-pink-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventType" className="text-gray-700">Event Type</Label>
                    <Select 
                      value={formData.eventType} 
                      onValueChange={(value) => handleSelectChange("eventType", value)}
                    >
                      <SelectTrigger className="bg-white/70 border-pink-200 focus:ring-pink-400">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme" className="text-gray-700">Event Theme</Label>
                    <Select 
                      value={formData.theme} 
                      onValueChange={(value) => handleSelectChange("theme", value)}
                      disabled={!formData.eventType}
                    >
                      <SelectTrigger className="bg-white/70 border-pink-200 focus:ring-pink-400">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.eventType && 
                          themeOptions[formData.eventType as keyof typeof themeOptions]?.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                              {theme.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-700">Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full bg-white/70 border-pink-200 text-left font-normal",
                            !date && "text-gray-400"
                          )}
                        >
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-gray-700">Event Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-gray-700">Event Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="Venue name or address"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="guests" className="text-gray-700">Number of Guests</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="Estimated number of guests"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700">Additional Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white/70 border-pink-200 focus-visible:ring-pink-400"
                      placeholder="Any special requests or additional information"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 block mb-3">Optional Add-ons</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {availableAddons.map((addon) => (
                    <div 
                      key={addon.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddons.includes(addon.id)
                          ? "bg-purple-100 border-purple-300"
                          : "bg-white/70 border-gray-200 hover:border-pink-200"
                      }`}
                      onClick={() => handleAddonToggle(addon.id)}
                    >
                      <div className="flex items-start">
                        <div className={`w-4 h-4 rounded-full mr-2 mt-1 flex-shrink-0 ${
                          selectedAddons.includes(addon.id) ? "bg-purple-500" : "border border-gray-300"
                        }`}>
                          {selectedAddons.includes(addon.id) && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-purple-600">{addon.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg shadow-lg shadow-purple-200"
                >
                  Submit Booking Request
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Receipt Modal */}
      <BookingReceipt
        event={{
          name: formData.eventType.charAt(0).toUpperCase() + formData.eventType.slice(1),
          date: formData.date,
          time: formData.time,
          location: formData.location,
          guests: parseInt(formData.guests) || 0,
          theme: themeOptions[formData.eventType as keyof typeof themeOptions]?.find(t => t.value === formData.theme)?.label || formData.theme,
          price: "$1,999.00",
          addons: formData.addons,
        }}
        isVisible={showReceipt}
        onClose={() => setShowReceipt(false)}
        onPay={handlePayment}
      />

      {/* Success Modal */}
      <BookingSuccess
        isVisible={showSuccess}
        onClose={closeSuccess}
      />

      <Footer />
    </div>
  );
};

export default Booking;
