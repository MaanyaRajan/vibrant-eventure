
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Gift,
  Heart,
  Star,
  Users,
  Calendar as CalendarIcon,
  Wallet,
  Clock,
  Flower
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Sample upcoming events data
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Johnson's Wedding", 
      date: "June 15, 2023", 
      type: "wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    { 
      id: 2, 
      title: "Sarah's 30th Birthday", 
      date: "July 8, 2023", 
      type: "birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    { 
      id: 3, 
      title: "Tech Corp Annual Meeting", 
      date: "August 3, 2023", 
      type: "corporate",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
  ];
  
  // Sample performance metrics
  const metrics = [
    { title: "Total Bookings", value: "127", icon: <CalendarDays className="h-5 w-5 text-pink-400" /> },
    { title: "Revenue", value: "$45,231", icon: <Wallet className="h-5 w-5 text-blue-400" /> },
    { title: "Completion Rate", value: "98%", icon: <Clock className="h-5 w-5 text-purple-400" /> },
  ];
  
  // Helper function to get icon by event type
  const getEventIcon = (type: string) => {
    switch(type) {
      case "wedding":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "birthday":
        return <Gift className="h-5 w-5 text-purple-400" />;
      case "anniversary":
        return <Star className="h-5 w-5 text-blue-400" />;
      case "corporate":
        return <Users className="h-5 w-5 text-sky-400" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get event type badge color
  const getEventBadgeClass = (type: string) => {
    switch(type) {
      case "wedding":
        return "bg-pink-400";
      case "birthday":
        return "bg-purple-400";
      case "anniversary":
        return "bg-blue-400";
      case "corporate":
        return "bg-sky-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen dashboard-gradient">
      <Navigation />
      
      <main className="container mx-auto px-4 py-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center font-display gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Dashboard
        </motion.h1>
        
        {/* Decorative flowers */}
        <div className="absolute top-40 right-10 opacity-20 -z-10">
          <Flower size={100} className="text-pink-300 animate-flower-spin" />
        </div>
        <div className="absolute top-60 left-10 opacity-20 -z-10">
          <Flower size={80} className="text-purple-300 animate-flower-spin" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <Card className="md:col-span-1 bg-white/80 backdrop-blur-sm border border-pink-200/50 shadow-lg shadow-pink-100/20">
            <CardHeader>
              <CardTitle className="text-pink-500">Calendar</CardTitle>
              <CardDescription className="text-gray-500">
                View your upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md p-3"
              />
              
              <div className="mt-4">
                <h3 className="text-purple-500 font-medium mb-2">Today's Events</h3>
                <p className="text-gray-500">No events scheduled for today</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Events Section */}
          <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm border border-lavender-300/50 shadow-lg shadow-lavender-100/20">
            <CardHeader>
              <CardTitle className="text-purple-500">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-500">
                Your next scheduled events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="group relative overflow-hidden rounded-lg border border-pink-200/50 shadow-md shadow-pink-100/10"
                  >
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Badge className={`mb-2 ${getEventBadgeClass(event.type)}`}>
                        {getEventIcon(event.type)}
                        <span className="ml-1">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                      </Badge>
                      <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-300">{event.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/booking">
                  <Button className="pink-lavender-gradient hover:opacity-90 text-white">
                    Book a New Event
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Metrics Section */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border border-blue-100 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                    <h3 className="text-2xl font-bold gradient-text mt-1">{metric.value}</h3>
                  </div>
                  <div className="bg-gradient-to-br from-white to-purple-50 p-3 rounded-full shadow-md">
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
