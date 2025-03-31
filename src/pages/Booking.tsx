
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const preselectedTheme = searchParams.get("theme");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventTheme: preselectedTheme || "",
    guestCount: "",
    date: undefined as Date | undefined,
    venueType: "",
    services: [] as string[],
    budget: "",
    message: "",
  });

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = [...prev.services];
      if (services.includes(service)) {
        return { ...prev, services: services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...services, service] };
      }
    });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
        });
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Booking Request Submitted",
        description: "We've received your booking request and will contact you soon!",
      });
      setSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate Event" },
    { value: "anniversary", label: "Anniversary" },
    { value: "other", label: "Other" },
  ];

  const venues = [
    { value: "indoor", label: "Indoor Venue" },
    { value: "outdoor", label: "Outdoor Venue" },
    { value: "both", label: "Both Indoor & Outdoor" },
    { value: "undecided", label: "Undecided" },
  ];

  const budgetRanges = [
    { value: "2000-5000", label: "$2,000 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-20000", label: "$10,000 - $20,000" },
    { value: "20000+", label: "$20,000+" },
  ];

  const serviceOptions = [
    { value: "decoration", label: "Decoration & Design" },
    { value: "catering", label: "Catering & Food" },
    { value: "transportation", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "photography", label: "Photography & Video" },
    { value: "planning", label: "Full Event Planning" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 pt-20 pb-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-2 font-display">Book Your Event</h1>
              <p className="text-gray-600 mb-6">
                Fill out the form below to start planning your extraordinary event with us.
              </p>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {["Personal Details", "Event Information", "Services & Budget", "Review & Submit"].map(
                    (label, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center ${
                          index < step ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 ${
                            index + 1 === step
                              ? "bg-primary text-white"
                              : index + 1 < step
                              ? "bg-primary/20 text-primary"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {index + 1 < step ? <ChevronRight className="h-5 w-5" /> : index + 1}
                        </div>
                        <span className="text-xs hidden sm:block">{label}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-2 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Personal Details</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email address"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Event Information */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Event Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => handleSelectChange("eventType", value)}
                        >
                          <SelectTrigger id="eventType" className="mt-1">
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
                        <Label htmlFor="eventTheme">Preferred Theme</Label>
                        <Input
                          id="eventTheme"
                          name="eventTheme"
                          value={formData.eventTheme}
                          onChange={handleChange}
                          placeholder="Enter your preferred theme or style"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Estimated Guest Count *</Label>
                        <Input
                          id="guestCount"
                          name="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={handleChange}
                          required
                          placeholder="How many guests do you expect?"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Preferred Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.date ? (
                                format(formData.date, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.date}
                              onSelect={handleDateChange}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="venueType">Venue Preference</Label>
                        <Select
                          value={formData.venueType}
                          onValueChange={(value) => handleSelectChange("venueType", value)}
                        >
                          <SelectTrigger id="venueType" className="mt-1">
                            <SelectValue placeholder="Select venue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {venues.map((venue) => (
                              <SelectItem key={venue.value} value={venue.value}>
                                {venue.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Services & Budget */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Services & Budget</h2>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Services Required</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {serviceOptions.map((service) => (
                            <div key={service.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={service.value}
                                checked={formData.services.includes(service.value)}
                                onChange={() => handleServiceToggle(service.value)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <Label htmlFor={service.value} className="cursor-pointer">
                                {service.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <RadioGroup
                          value={formData.budget}
                          onValueChange={(value) => handleSelectChange("budget", value)}
                          className="mt-2"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {budgetRanges.map((range) => (
                              <div key={range.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={range.value} id={range.value} />
                                <Label htmlFor={range.value} className="cursor-pointer">
                                  {range.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="message">Additional Details</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your vision for the event..."
                          className="mt-1 h-32"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Review Your Booking Request</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Personal Details</h3>
                          <p className="mt-1">{formData.name}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Event Information</h3>
                          <p className="mt-1">
                            {eventTypes.find((t) => t.value === formData.eventType)?.label || "Not specified"}
                          </p>
                          <p>
                            Date: {formData.date ? format(formData.date, "PPP") : "Not specified"}
                          </p>
                          <p>Guests: {formData.guestCount || "Not specified"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Requested Services</h3>
                          <ul className="mt-1 list-disc list-inside">
                            {formData.services.length > 0 ? (
                              formData.services.map((service) => (
                                <li key={service}>
                                  {serviceOptions.find((s) => s.value === service)?.label}
                                </li>
                              ))
                            ) : (
                              <li>No services selected</li>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Budget Range</h3>
                          <p className="mt-1">
                            {budgetRanges.find((b) => b.value === formData.budget)?.label ||
                              "Not specified"}
                          </p>
                        </div>
                      </div>
                      {formData.message && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Additional Details</h3>
                          <p className="mt-1">{formData.message}</p>
                        </div>
                      )}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-4">
                          By submitting this form, you agree to our Terms of Service and Privacy
                          Policy. We'll contact you shortly to discuss your event in detail.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={submitting} className="ml-auto">
                      {submitting ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
