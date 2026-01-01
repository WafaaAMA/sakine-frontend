import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Search, MessageSquare, X, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const mockBookings = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Apartment",
    propertyImage: property1,
    location: "Manhattan, New York",
    dateRange: "Feb 15, 2024 - Mar 15, 2024",
    totalPrice: 2500,
    status: "Upcoming",
    statusColor: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
    ownerName: "Michael Johnson",
    ownerAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    ownerRole: "Property Owner",
  },
  {
    id: 2,
    propertyTitle: "Cozy Studio with City View",
    propertyImage: property2,
    location: "Brooklyn, New York",
    dateRange: "Jan 1, 2024 - Jan 31, 2024",
    totalPrice: 1800,
    status: "Active",
    statusColor: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    ownerName: "Sarah Williams",
    ownerAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    ownerRole: "Property Owner",
  },
  {
    id: 3,
    propertyTitle: "Luxury Penthouse Suite",
    propertyImage: property3,
    location: "Midtown, New York",
    dateRange: "Nov 1, 2023 - Dec 1, 2023",
    totalPrice: 5500,
    status: "Completed",
    statusColor: "bg-orange-500 hover:bg-orange-600 text-white border-orange-500",
    ownerName: "David Chen",
    ownerAvatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    ownerRole: "Property Owner",
  },
];

const UserBookings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [bookings, setBookings] = useState(mockBookings);

  const handleCancel = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled", statusColor: "bg-red-500 hover:bg-red-600 text-white border-red-500" } : b));
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled.",
    });
  };

  const handleContact = (name) => {
    toast({
      title: "Opening Chat",
      description: `Connecting you with ${name}...`,
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || booking.status === activeTab;
    return matchesSearch && matchesTab;
  });


  const tabs = ["All", "Upcoming", "Active", "Completed", "Cancelled"];

  return (
    <DashboardLayout role="user">
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1 text-sm">View and manage your rental bookings</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="p-0 border overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="w-full md:w-72 h-48 md:h-auto relative">
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg text-foreground">{booking.propertyTitle}</h3>
                      <Badge className={`${booking.statusColor} font-normal px-2.5`}>{booking.status}</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {booking.location}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {booking.dateRange}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.ownerAvatar} />
                        <AvatarFallback>{booking.ownerName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Hosted by {booking.ownerName}</p>
                        <p className="text-xs text-muted-foreground">{booking.ownerRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-500">${booking.totalPrice.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground uppercase">Total</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                  <Button variant="outline" size="sm" className="h-9" asChild>
                    <Link to={`/property/${booking.id}`}>
                      View Property
                    </Link>
                  </Button>

                  {booking.status === "Upcoming" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleCancel(booking.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}

                  {booking.status === "Active" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2"
                      onClick={() => handleContact(booking.ownerName)}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact Owner
                    </Button>
                  )}

                  {booking.status === "Completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2"
                      onClick={() => toast({ title: "Review", description: "Taking you to the review form..." })}
                    >
                      <Star className="w-4 h-4" />
                      Leave Review
                    </Button>
                  )}

                </div>

              </div>
            </Card>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserBookings;