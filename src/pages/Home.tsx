
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, PartyPopper, Briefcase, Heart, Users, Utensils, Car, Music } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Add the framer-motion dependency
<lov-add-dependency>framer-motion@^11.1.0</lov-add-dependency>

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        heroRef.current.style.opacity = `${1 - scrollPosition / 700}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const eventTypes = [
    {
      title: "Weddings",
      icon: <Heart className="h-8 w-8 text-event-wedding" />,
      description: "Make your special day unforgettable with our premium wedding planning services.",
      color: "bg-event-wedding/10",
      link: "/events/wedding",
      image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
      title: "Birthdays",
      icon: <PartyPopper className="h-8 w-8 text-event-birthday" />,
      description: "Celebrate another year with a party that will be remembered for years to come.",
      color: "bg-event-birthday/10",
      link: "/events/birthday",
      image: "https://images.unsplash.com/photo-1532117892279-e4a9f4b50826?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
      title: "Corporate",
      icon: <Briefcase className="h-8 w-8 text-event-corporate" />,
      description: "Impress clients and motivate teams with our professional corporate event solutions.",
      color: "bg-event-corporate/10",
      link: "/events/corporate",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
      title: "Anniversaries",
      icon: <Calendar className="h-8 w-8 text-event-anniversary" />,
      description: "Commemorate your journey together with an anniversary celebration that honors your love.",
      color: "bg-event-anniversary/10",
      link: "/events/anniversary",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  const services = [
    { 
      title: "Event Decoration", 
      icon: <Users className="h-6 w-6" />,
      description: "Transform any venue with our stunning decoration themes and custom designs." 
    },
    { 
      title: "Catering & Food", 
      icon: <Utensils className="h-6 w-6" />,
      description: "Delight your guests with gourmet menus crafted by our expert culinary team." 
    },
    { 
      title: "Transportation", 
      icon: <Car className="h-6 w-6" />,
      description: "Luxury vehicles and reliable transportation solutions for you and your guests." 
    },
    { 
      title: "Entertainment", 
      icon: <Music className="h-6 w-6" />,
      description: "Live bands, DJs, performers, and more to keep your event lively and memorable." 
    },
  ];

  const testimonials = [
    {
      quote: "Eventure transformed our wedding day into a fairy tale. Every detail was perfect!",
      author: "Sarah & David",
      event: "Wedding",
      image: "https://images.unsplash.com/photo-1523996507021-160340de0f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
      quote: "Our corporate retreat was a huge success thanks to the Eventure team's professionalism.",
      author: "Michael Johnson",
      event: "Corporate Retreat",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
      quote: "My daughter's sweet 16 was beyond our expectations. The themes were amazing!",
      author: "Jennifer Lewis",
      event: "Birthday Party",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center"
          style={{ filter: 'brightness(0.7)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        
        <div className="container mx-auto px-4 z-20" ref={heroRef}>
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Creating Magical Moments for Every Occasion
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From intimate gatherings to grand celebrations, we design and deliver 
              unforgettable experiences tailored to your unique vision.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book Your Event
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-display">
              Specialized in All Types of Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whatever the occasion, our experienced team is dedicated to creating a customized 
              experience that exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                className="event-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="event-card-content">
                  <div className={`${event.color} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                    {event.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-display">{event.title}</h3>
                  <p className="text-white/80 mb-4">{event.description}</p>
                  <Link to={event.link}>
                    <Button variant="default" className="bg-white text-gray-900 hover:bg-white/90">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-display">
              Comprehensive Event Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From concept to execution, we provide everything you need for a seamless and 
              spectacular event experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/services" className="text-primary font-medium hover:underline">
                  Learn more
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">What Our Clients Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from those who have experienced the magic of our event planning services.
            </p>
          </div>

          <div className="relative h-[400px] md:h-[350px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 flex flex-col md:flex-row items-center transition-opacity duration-1000 ${
                  index === currentTestimonial ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentTestimonial ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full md:w-1/2 p-6 md:p-8">
                  <svg 
                    className="w-12 h-12 text-primary/60 mb-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z"/>
                  </svg>
                  <p className="text-xl md:text-2xl mb-6 leading-relaxed font-display italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.event}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-full">
                  <div className="h-full relative overflow-hidden rounded-xl md:rounded-r-2xl">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-3 w-3 mx-1 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to Start Planning Your Event?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Our team is ready to bring your vision to life.
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

export default Home;
