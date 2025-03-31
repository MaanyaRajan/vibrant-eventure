
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Gift, Users, UserPlus, Star } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sparkles, Float } from "@react-three/drei";

const GoldSparkle = () => {
  return (
    <Sparkles 
      count={50}
      scale={10}
      size={4}
      speed={0.3}
      color="#FFD700"
    />
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const eventTypes = [
    {
      name: "Weddings",
      icon: <Calendar className="h-10 w-10 text-amber-400" />,
      color: "from-amber-400/20 to-amber-500/20",
      link: "/events/wedding",
      description: "Elegant ceremonies and receptions for your perfect day"
    },
    {
      name: "Birthdays",
      icon: <Gift className="h-10 w-10 text-amber-400" />,
      color: "from-amber-400/20 to-amber-500/20",
      link: "/events/birthday",
      description: "Memorable celebrations for all ages and preferences"
    },
    {
      name: "Corporate",
      icon: <Users className="h-10 w-10 text-amber-400" />,
      color: "from-amber-400/20 to-amber-500/20",
      link: "/events/corporate",
      description: "Professional events from meetings to galas and conferences"
    },
    {
      name: "Anniversaries",
      icon: <Star className="h-10 w-10 text-amber-400" />,
      color: "from-amber-400/20 to-amber-500/20",
      link: "/events/anniversary",
      description: "Special milestone celebrations to honor your journey"
    },
  ];
  
  const testimonials = [
    {
      quote: "Majestic Moments transformed our wedding into an absolute dream. Every detail was perfect!",
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col">
        <Navigation />
        
        <div className="relative flex-grow flex flex-col items-center justify-center overflow-hidden">
          {/* Decorative top corner ornaments */}
          <img 
            src="/lovable-uploads/b1716c6b-58e9-4358-a615-f46bd7e4475b.png" 
            alt="Majestic Moments" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-amber-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Majestic Moments
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl italic mb-12 text-amber-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Occasions, Our Commitments
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/booking">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8">
                  Book an Event
                </Button>
              </Link>
              <Link to="/themes">
                <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-500/20">
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
              <a href="#services" className="text-amber-400 hover:text-amber-300">
                <div className="w-8 h-12 border-2 border-amber-400 rounded-full flex justify-center items-start p-1">
                  <motion.div 
                    className="w-1 h-2 bg-amber-400 rounded-full"
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
      <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-amber-400">Exceptional Event Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  <div className={`bg-gradient-to-br ${event.color} backdrop-blur-sm border border-amber-500/20 rounded-xl p-8 h-full hover:border-amber-400/50 transition-all duration-300`}>
                    <div className="mb-4">
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-amber-300">{event.name}</h3>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3D Effects Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <Canvas className="z-0">
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <GoldSparkle />
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-amber-400">Magical Themes</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our collection of meticulously crafted themes for every occasion
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <Link to="/themes">
              <Button size="lg" className="bg-amber-400 text-black hover:bg-amber-500">
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
              className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-amber-500/20 p-8 rounded-xl hover:border-amber-400/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Wedding Themes</h3>
              <p className="text-gray-300 mb-4">
                From elegant classic to romantic rustic, we create the perfect atmosphere for your special day.
              </p>
              <Link to="/themes/wedding" className="text-amber-400 hover:text-amber-300 flex items-center">
                Explore Wedding Themes
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-amber-500/20 p-8 rounded-xl hover:border-amber-400/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Birthday Themes</h3>
              <p className="text-gray-300 mb-4">
                Vibrant celebrations for all ages with personalized decor and entertainment.
              </p>
              <Link to="/themes/birthday" className="text-amber-400 hover:text-amber-300 flex items-center">
                Explore Birthday Themes
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-amber-500/20 p-8 rounded-xl hover:border-amber-400/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Corporate Themes</h3>
              <p className="text-gray-300 mb-4">
                Professional, innovative designs for corporate events, galas, and conferences.
              </p>
              <Link to="/themes/corporate" className="text-amber-400 hover:text-amber-300 flex items-center">
                Explore Corporate Themes
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-amber-400">Client Testimonials</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                className="bg-black/50 backdrop-blur-sm border border-amber-500/20 p-8 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-amber-300">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-400 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Ready to Create Your Majestic Moment?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let us transform your vision into an unforgettable experience. Book a consultation with our event planning experts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-black text-amber-400 hover:bg-gray-900">
                Register Now
              </Button>
            </Link>
            <Link to="/booking">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10">
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
