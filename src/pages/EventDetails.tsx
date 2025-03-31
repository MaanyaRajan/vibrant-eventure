
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface EventData {
  title: string;
  description: string;
  banner: string;
  color: string;
  features: string[];
  showcaseImages: string[];
}

const eventData: Record<string, EventData> = {
  wedding: {
    title: "Wedding Events",
    description: "Your dream wedding begins with our expert planning team. From intimate ceremonies to grand celebrations, we'll help you create a day that reflects your love story perfectly.",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    color: "from-event-wedding/40 to-event-wedding/10",
    features: [
      "Customized wedding themes and design",
      "Venue selection and coordination",
      "Full catering and bar services",
      "Entertainment and music planning",
      "Photography and videography",
      "Transportation for wedding party",
      "Wedding cake design",
      "Guest accommodations",
    ],
    showcaseImages: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
  },
  birthday: {
    title: "Birthday Celebrations",
    description: "Make your special day unforgettable with our creative birthday planning services. From themed parties to sophisticated soirées, we'll create a celebration as unique as you are.",
    banner: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    color: "from-event-birthday/40 to-event-birthday/10",
    features: [
      "Age-appropriate theme design",
      "Custom invitations and announcements",
      "Venue decoration and setup",
      "Entertainment and activities",
      "Custom cake and dessert tables",
      "Photography and memory capture",
      "Party favors and gifts",
      "Day-of coordination",
    ],
    showcaseImages: [
      "https://images.unsplash.com/photo-1464347971179-68f71ee5a2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1530071100468-90a35b86b681?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
  },
  corporate: {
    title: "Corporate Events",
    description: "Elevate your company's profile with our professional corporate event planning. From team-building activities to formal galas, we create experiences that reflect your company's values and goals.",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    color: "from-event-corporate/40 to-event-corporate/10",
    features: [
      "Brand integration and corporate identity",
      "Venue selection and negotiation",
      "Audio-visual technical setup",
      "Professional registration services",
      "Catering and refreshments",
      "Transportation logistics",
      "Speaker and talent management",
      "Post-event analysis and reporting",
    ],
    showcaseImages: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
  },
  anniversary: {
    title: "Anniversary Celebrations",
    description: "Celebrate your journey together with our thoughtfully planned anniversary events. Whether it's a milestone year or an annual tradition, we'll help you honor your love and commitment.",
    banner: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    color: "from-event-anniversary/40 to-event-anniversary/10",
    features: [
      "Personalized anniversary themes",
      "Memorable venue selection",
      "Romantic decor and ambiance",
      "Gourmet dining experiences",
      "Photography and videography",
      "Custom anniversary gifts",
      "Entertainment and music",
      "Vow renewal ceremonies",
    ],
    showcaseImages: [
      "https://images.unsplash.com/photo-1496072935825-c83cbd585c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1530214879133-81492e005003?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    ],
  },
};

const packages = [
  {
    name: "Essential",
    price: "$2,499",
    description: "Perfect for smaller, intimate gatherings",
    features: [
      "Event planning consultation",
      "Basic venue decoration",
      "Standard catering options",
      "4-hour event coordination",
      "Basic photography package",
    ],
    recommended: false,
  },
  {
    name: "Premium",
    price: "$4,999",
    description: "Our most popular package for mid-sized events",
    features: [
      "Comprehensive planning service",
      "Premium venue decoration",
      "Gourmet catering with menu tasting",
      "8-hour event coordination",
      "Professional photography & videography",
      "Custom invitations",
      "Transportation coordination",
    ],
    recommended: true,
  },
  {
    name: "Luxury",
    price: "$8,999",
    description: "The ultimate experience for your special occasion",
    features: [
      "Dedicated senior event planner",
      "Luxury venue decoration with custom elements",
      "Premium catering with custom menu development",
      "Full-day event coordination with assistant",
      "Complete photography & videography package",
      "Custom website & digital invitations",
      "VIP transportation service",
      "Post-event keepsake album",
      "Personalized favors for guests",
    ],
    recommended: false,
  },
];

const EventDetails = () => {
  const { eventType } = useParams<{ eventType: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventType && eventData[eventType]) {
      setEvent(eventData[eventType]);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [eventType]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative pt-16">
        <div className="h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="mb-2 flex items-center text-white/80">
                  <Link to="/" className="hover:text-white">Home</Link>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <Link to="/#events" className="hover:text-white">Events</Link>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span>{event.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                  {event.title}
                </h1>
                <p className="text-xl text-white/90 max-w-xl">{event.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/themes/${eventType}`}>
                    <Button className="bg-primary hover:bg-primary/90">
                      Explore Themes
                    </Button>
                  </Link>
                  <Link to="/booking">
                    <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                      Check Availability
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-4 font-display">About Our {event.title}</h2>
                  <p className="text-gray-700 mb-6">
                    At Eventure, we specialize in creating memorable {eventType} events tailored to your unique vision and preferences. 
                    Our experienced team of event planners will guide you through every step of the process, from concept to execution,
                    ensuring that your special occasion exceeds your expectations.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-3">Why Choose Us for Your {eventType.charAt(0).toUpperCase() + eventType.slice(1)}</h3>
                  <ul className="space-y-3 mb-6">
                    {event.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-bold mb-3">Our Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      { step: "Consultation", desc: "We begin with understanding your vision and requirements." },
                      { step: "Planning", desc: "Develop a detailed plan tailored to your preferences and budget." },
                      { step: "Execution", desc: "Seamlessly coordinate all aspects for a stress-free event." },
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className={`p-6 rounded-xl bg-gradient-to-b ${event.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="font-bold text-2xl mb-1">{index + 1}</div>
                        <h4 className="font-bold mb-2">{item.step}</h4>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Event Details</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium">Available Dates</div>
                        <p className="text-gray-600 text-sm">Year-round availability with seasonal themes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium">Event Duration</div>
                        <p className="text-gray-600 text-sm">4-12 hours, depending on package</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium">Locations</div>
                        <p className="text-gray-600 text-sm">Indoor & outdoor venues throughout the city</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium">Guest Capacity</div>
                        <p className="text-gray-600 text-sm">From intimate gatherings to 500+ guests</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h3 className="text-xl font-bold mb-3">Custom Themes</h3>
                    <p className="text-gray-700 mb-4">
                      We offer a variety of themes for your {eventType} event. Visit our themes page to explore the options.
                    </p>
                    <Link to={`/themes/${eventType}`}>
                      <Button className="w-full">View Themes</Button>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-xl font-bold mb-3">Ready to Start?</h3>
                    <p className="text-gray-700 mb-4">
                      Book a consultation with our expert event planners to discuss your vision.
                    </p>
                    <Link to="/booking">
                      <Button className="w-full">Book Consultation</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="packages">
              <h2 className="text-2xl font-bold mb-6 font-display">Our {event.title} Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {packages.map((pkg, index) => (
                  <motion.div 
                    key={index} 
                    className={`rounded-xl overflow-hidden border ${
                      pkg.recommended ? "border-primary shadow-lg relative" : "border-gray-200"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {pkg.recommended && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg bg-primary text-white px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className={`p-6 ${pkg.recommended ? "bg-gradient-to-b " + event.color : ""}`}>
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      <div className="mt-2 mb-1">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{pkg.description}</p>
                    </div>
                    <div className="p-6 bg-white">
                      <h4 className="text-sm font-medium mb-3">What's included:</h4>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/booking">
                        <Button 
                          className={`w-full ${
                            pkg.recommended ? "bg-primary hover:bg-primary/90" : "bg-gray-900 hover:bg-gray-800"
                          }`}
                        >
                          Choose Plan
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Need a Custom Package?</h3>
                <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
                  We understand that every event is unique. Contact us to create a custom package that meets your specific requirements and budget.
                </p>
                <Link to="/contact">
                  <Button variant="outline">Contact for Custom Quote</Button>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <h2 className="text-2xl font-bold mb-6 font-display">Gallery of Past {event.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.showcaseImages.concat(event.showcaseImages).slice(0, 9).map((image, index) => (
                  <motion.div 
                    key={index} 
                    className="rounded-xl overflow-hidden aspect-square group cursor-pointer relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src={image} 
                      alt={`${event.title} example ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Star className="h-10 w-10 mx-auto mb-2" />
                        <p className="font-medium">View Details</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Ready to Plan Your {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Let our expert team help you create an unforgettable experience tailored to your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book a Consultation
              </Button>
            </Link>
            <Link to={`/themes/${eventType}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Event Themes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetails;
