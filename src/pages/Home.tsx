
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Gift, Users, UserPlus, Star, Flower } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles, Float } from "@react-three/drei";

// Sparkling effect for the floral theme
const FloralSparkle = () => {
  return (
    <Sparkles 
      count={100}
      scale={10}
      size={4}
      speed={0.3}
      color="#F9A8D4"
    />
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const eventTypes = [
    {
      name: "Weddings",
      icon: <Calendar className="h-10 w-10 text-floral-pink" />,
      color: "from-floral-pink/20 to-floral-rose/20",
      link: "/events/wedding",
      description: "Elegant ceremonies and receptions for your perfect day"
    },
    {
      name: "Birthdays",
      icon: <Gift className="h-10 w-10 text-floral-lilac" />,
      color: "from-floral-lilac/20 to-floral-lavender/20",
      link: "/events/birthday",
      description: "Memorable celebrations for all ages and preferences"
    },
    {
      name: "Corporate",
      icon: <Users className="h-10 w-10 text-floral-mint" />,
      color: "from-floral-mint/20 to-floral-sage/20",
      link: "/events/corporate",
      description: "Professional events from meetings to galas and conferences"
    },
    {
      name: "Anniversaries",
      icon: <Star className="h-10 w-10 text-floral-rose" />,
      color: "from-floral-rose/20 to-floral-pink/20",
      link: "/events/anniversary",
      description: "Special milestone celebrations to honor your journey"
    },
  ];
  
  const testimonials = [
    {
      quote: "They transformed our wedding into an absolute dream. Every detail was perfect!",
      author: "Sarah & Michael",
      event: "Wedding",
      rating: 5
    },
    {
      quote: "The best birthday party my daughter has ever had. The decorations were magical!",
      author: "Jennifer T.",
      event: "Birthday",
      rating: 5
    },
    {
      quote: "Our corporate gala was executed flawlessly. Highly recommend their services.",
      author: "Robert L.",
      event: "Corporate Event",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen floral-background">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col">
        <Navigation />
        
        <div className="relative flex-grow flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative flower elements */}
          <div className="absolute inset-0 floral-pattern opacity-30"></div>
          
          {/* Floating flowers in the background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.4
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
                <Flower 
                  size={30 + Math.random() * 50} 
                  className={`animate-flower-spin ${
                    i % 4 === 0 ? "text-floral-pink" : 
                    i % 4 === 1 ? "text-floral-lilac" : 
                    i % 4 === 2 ? "text-floral-mint" : 
                    "text-floral-lavender"
                  }`} 
                />
              </motion.div>
            ))}
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Blooming Events
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl italic mb-12 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Creating unforgettable moments with floral elegance
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/booking">
                <Button size="lg" className="floral-button px-8">
                  Book an Event
                </Button>
              </Link>
              <Link to="/themes">
                <Button size="lg" variant="outline" className="border-pink-400 text-pink-500 hover:bg-pink-50 shadow-md shadow-pink-200/20">
                  Explore Themes
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <a href="#services" className="text-pink-500 hover:text-pink-600">
                <div className="w-8 h-12 border-2 border-pink-400 rounded-full flex justify-center items-start p-1">
                  <motion.div 
                    className="w-1 h-2 bg-pink-400 rounded-full"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display gradient-text">Exceptional Event Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we create unforgettable experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Link to={event.link} className="block">
                  <div className={`bg-gradient-to-br ${event.color} backdrop-blur-sm border border-pink-200/40 rounded-xl p-8 h-full hover:border-pink-300/50 transition-all duration-300 floral-card`}>
                    <div className="mb-4">
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-700">{event.name}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3D Effects Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-lavender-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Canvas className="z-0">
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <FloralSparkle />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display gradient-text">Magical Themes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our collection of meticulously crafted themes for every occasion
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <Link to="/themes">
              <Button size="lg" className="floral-button">
                View All Themes
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="floral-card p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Wedding Themes</h3>
              <p className="text-gray-600 mb-4">
                From elegant classic to romantic rustic, we create the perfect atmosphere for your special day.
              </p>
              <Link to="/themes/wedding" className="text-pink-500 hover:text-pink-600 flex items-center">
                Explore Wedding Themes
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="floral-card p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Birthday Themes</h3>
              <p className="text-gray-600 mb-4">
                Vibrant celebrations for all ages with personalized decor and entertainment.
              </p>
              <Link to="/themes/birthday" className="text-pink-500 hover:text-pink-600 flex items-center">
                Explore Birthday Themes
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="floral-card p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-700">Corporate Themes</h3>
              <p className="text-gray-600 mb-4">
                Professional, innovative designs for corporate events, galas, and conferences.
              </p>
              <Link to="/themes/corporate" className="text-pink-500 hover:text-pink-600 flex items-center">
                Explore Corporate Themes
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-lavender-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display gradient-text">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our clients say about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/70 backdrop-blur-sm border border-pink-200/40 p-8 rounded-xl shadow-lg shadow-pink-100/30"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-pink-400 fill-pink-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-700">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-200 to-rose-200 text-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Ready to Create Your Memorable Event?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let us transform your vision into an unforgettable experience. Book a consultation with our event planning experts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-50 shadow-lg shadow-pink-300/20">
                Register Now
              </Button>
            </Link>
            <Link to="/booking">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
