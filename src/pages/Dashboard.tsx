
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar as CalendarIcon, Clock, MapPin, Users, CheckCircle, PenLine, Trash2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Smith Wedding",
      date: new Date(2023, 5, 15),
      location: "Grand Plaza Hotel",
      guests: 150,
      status: "confirmed",
      type: "wedding",
    },
    {
      id: 2,
      title: "Tech Corp Annual Meeting",
      date: new Date(2023, 6, 10),
      location: "Innovation Center",
      guests: 80,
      status: "pending",
      type: "corporate",
    },
    {
      id: 3,
      title: "Johnson's 50th Birthday",
      date: new Date(2023, 7, 22),
      location: "Riverside Gardens",
      guests: 50,
      status: "confirmed",
      type: "birthday",
    },
  ];

  // Mock data for past events
  const pastEvents = [
    {
      id: 4,
      title: "Robinsons Anniversary Party",
      date: new Date(2023, 1, 14),
      location: "Hilltop Vineyard",
      guests: 30,
      status: "completed",
      type: "anniversary",
    },
    {
      id: 5,
      title: "Winter Corporate Retreat",
      date: new Date(2023, 0, 22),
      location: "Mountain Lodge",
      guests: 45,
      status: "completed",
      type: "corporate",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "wedding":
        return <Badge className="bg-event-wedding">Wedding</Badge>;
      case "birthday":
        return <Badge className="bg-event-birthday">Birthday</Badge>;
      case "corporate":
        return <Badge className="bg-event-corporate">Corporate</Badge>;
      case "anniversary":
        return <Badge className="bg-event-anniversary">Anniversary</Badge>;
      default:
        return <Badge>Event</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="pt-20 pb-10 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-display">Your Dashboard</h1>
            <p className="text-gray-600">Manage your events and bookings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    highlightedDates={[
                      new Date(2023, 5, 15),
                      new Date(2023, 6, 10),
                      new Date(2023, 7, 22),
                    ]}
                  />
                  <div className="mt-4">
                    <h3 className="font-medium text-sm text-gray-500 mb-2">Upcoming Events</h3>
                    <div className="space-y-2">
                      {upcomingEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-100">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>{event.title}</span>
                          <span className="text-gray-500 ml-auto">
                            {format(event.date, "MMM d")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <PenLine className="mr-2 h-4 w-4" />
                      New Event Request
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Guest Lists
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      Browse Venues
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      View All Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                {getEventTypeBadge(event.type)}
                                {getStatusBadge(event.status)}
                              </div>
                              <div className="text-gray-500 space-y-1">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  <span>{format(event.date, "EEEE, MMMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>3:00 PM - 11:00 PM</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span>{event.guests} Guests</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap sm:flex-col gap-2 sm:text-right">
                              <Button>View Details</Button>
                              <Button variant="outline">Modify Event</Button>
                            </div>
                          </div>
                          {event.status === "pending" && (
                            <div className="mt-4 pt-4 border-t flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-yellow-500" />
                              <span className="text-sm text-gray-600">
                                Awaiting final confirmation. We'll contact you soon.
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                  <div className="space-y-4">
                    {pastEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                {getEventTypeBadge(event.type)}
                                {getStatusBadge(event.status)}
                              </div>
                              <div className="text-gray-500 space-y-1">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  <span>{format(event.date, "EEEE, MMMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span>{event.guests} Guests</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap sm:flex-col gap-2 sm:text-right">
                              <Button variant="outline">View Photos</Button>
                              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
