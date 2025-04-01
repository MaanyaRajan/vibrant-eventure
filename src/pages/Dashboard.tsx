
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
  Clock
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
    { title: "Total Bookings", value: "127", icon: <CalendarDays className="h-5 w-5 text-amber-500" /> },
    { title: "Revenue", value: "$45,231", icon: <Wallet className="h-5 w-5 text-amber-500" /> },
    { title: "Completion Rate", value: "98%", icon: <Clock className="h-5 w-5 text-amber-500" /> },
  ];
  
  // Helper function to get icon by event type
  const getEventIcon = (type: string) => {
    switch(type) {
      case "wedding":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "birthday":
        return <Gift className="h-5 w-5 text-orange-500" />;
      case "anniversary":
        return <Star className="h-5 w-5 text-purple-500" />;
      case "corporate":
        return <Users className="h-5 w-5 text-blue-500" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get event type badge color
  const getEventBadgeClass = (type: string) => {
    switch(type) {
      case "wedding":
        return "bg-pink-500";
      case "birthday":
        return "bg-orange-500";
      case "anniversary":
        return "bg-purple-500";
      case "corporate":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center font-display text-amber-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Dashboard
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <Card className="md:col-span-1 bg-black/50 border border-amber-500/20 text-white">
            <CardHeader>
              <CardTitle className="text-amber-400">Calendar</CardTitle>
              <CardDescription className="text-gray-400">
                View your upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-black/50 text-white rounded-md p-3"
              />
              
              <div className="mt-4">
                <h3 className="text-amber-400 font-medium mb-2">Today's Events</h3>
                <p className="text-gray-300">No events scheduled for today</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Events Section */}
          <Card className="md:col-span-2 bg-black/50 border border-amber-500/20 text-white">
            <CardHeader>
              <CardTitle className="text-amber-400">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-400">
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
                    className="group relative overflow-hidden rounded-lg border border-amber-500/20"
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
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
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
            <Card key={index} className="bg-black/50 border border-amber-500/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{metric.title}</p>
                    <h3 className="text-2xl font-bold text-amber-400 mt-1">{metric.value}</h3>
                  </div>
                  <div className="bg-black/50 p-3 rounded-full">
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
