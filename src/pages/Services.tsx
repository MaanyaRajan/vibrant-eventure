
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Utensils, Landmark, Car, Music, Camera, Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: "decoration",
    title: "Decoration",
    icon: <Landmark className="h-8 w-8 text-primary" />,
    description: "Transform any venue into a breathtaking setting with our custom decoration services.",
    features: [
      "Custom theme design and implementation",
      "Floral arrangements and centerpieces",
      "Lighting design and installation",
      "Table settings and linens",
      "Backdrop and stage design",
      "Balloon and fabric installations",
      "Props and furniture rental",
      "Signage and printed materials",
    ],
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "catering",
    title: "Food & Catering",
    icon: <Utensils className="h-8 w-8 text-primary" />,
    description: "Delight your guests with exquisite cuisine tailored to your event and preferences.",
    features: [
      "Custom menu planning and tasting",
      "Multiple cuisine options",
      "Dietary restrictions accommodation",
      "Professional service staff",
      "Bar and beverage service",
      "Dessert tables and cake design",
      "Food station and buffet setup",
      "Tableware and equipment rental",
    ],
    image: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "transport",
    title: "Transportation",
    icon: <Car className="h-8 w-8 text-primary" />,
    description: "Ensure smooth travel arrangements for you and your guests with our premium transportation services.",
    features: [
      "Luxury vehicle fleet options",
      "Group transportation coordination",
      "Airport pickup and drop-off",
      "Shuttle services between venues",
      "Vintage and specialty vehicles",
      "Chauffeur services",
      "Coordination with venue logistics",
      "Transportation scheduling",
    ],
    image: "https://images.unsplash.com/photo-1519997554313-8dcab6e0e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    icon: <Music className="h-8 w-8 text-primary" />,
    description: "Create unforgettable moments with our diverse entertainment options for any event type.",
    features: [
      "Live bands and musicians",
      "DJs and MC services",
      "Interactive performances",
      "Dance floor and lighting",
      "Photo booths and props",
      "Children's entertainment",
      "Custom playlists and sound equipment",
      "Special effects and pyrotechnics",
    ],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "photography",
    title: "Photography & Video",
    icon: <Camera className="h-8 w-8 text-primary" />,
    description: "Capture every special moment with our professional photography and videography services.",
    features: [
      "Professional photography coverage",
      "Cinematic videography",
      "Drone aerial footage",
      "Photo booth setups",
      "Same-day edits and slideshows",
      "Digital galleries and prints",
      "Custom photo albums",
      "Highlight reels and full-length videos",
    ],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "planning",
    title: "Event Planning",
    icon: <Calendar className="h-8 w-8 text-primary" />,
    description: "Leave every detail to our expert planners for a stress-free and perfectly executed event.",
    features: [
      "Comprehensive event timeline creation",
      "Vendor selection and management",
      "Budget planning and tracking",
      "On-site coordination team",
      "Venue scouting and selection",
      "Guest list management",
      "RSVP tracking and communication",
      "Emergency contingency planning",
    ],
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("decoration");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Comprehensive Event Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              From decoration to catering, transportation to entertainment, we provide everything you need for an unforgettable event experience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="flex flex-col items-center px-3 py-2 gap-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <div className="hidden sm:block">{service.icon}</div>
                    <span>{service.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl font-bold font-display">{service.title} Services</h2>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-6">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="font-bold text-xl mb-4">What We Offer:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {service.features.map((feature, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link to="/booking">
                        <Button>Book This Service</Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline">Request Custom Quote</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="rounded-xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-[400px] object-cover"
                    />
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-display">Service Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bundle our services for a seamless event experience and added value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential",
                price: "$2,499",
                description: "Our basic package for small events",
                features: [
                  "Basic decoration setup",
                  "Standard catering menu",
                  "Photography package (4 hours)",
                  "Audio equipment rental",
                  "Day-of coordination",
                ],
                popular: false,
              },
              {
                name: "Premium",
                price: "$4,999",
                description: "Our most popular comprehensive package",
                features: [
                  "Full-service decoration",
                  "Premium catering with bar service",
                  "Photography & video (8 hours)",
                  "DJ and entertainment",
                  "Transportation coordination",
                  "Full event planning",
                  "Custom digital invitations",
                ],
                popular: true,
              },
              {
                name: "Luxury",
                price: "$8,999+",
                description: "The ultimate all-inclusive experience",
                features: [
                  "Luxury decoration with custom elements",
                  "Gourmet catering with custom menu",
                  "Photography & video (full day)",
                  "Live band & premium entertainment",
                  "VIP transportation fleet",
                  "Comprehensive planning team",
                  "Custom website & printed materials",
                  "VIP guest management",
                  "Post-event keepsake album",
                ],
                popular: false,
              },
            ].map((pkg, index) => (
              <motion.div 
                key={index} 
                className={`rounded-xl overflow-hidden border ${
                  pkg.popular ? "border-primary shadow-lg relative" : "border-gray-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg bg-primary text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className={`p-6 ${pkg.popular ? "bg-gradient-to-b from-primary/40 to-primary/10" : ""}`}>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="mt-2 mb-1">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>
                <div className="p-6 bg-white">
                  <h4 className="text-sm font-medium mb-3">Services included:</h4>
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
                        pkg.popular ? "bg-primary hover:bg-primary/90" : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      Choose Package
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to bring your vision to life. Contact us today to start planning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book a Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
