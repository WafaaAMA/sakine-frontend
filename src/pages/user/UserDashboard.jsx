import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, MapPin, Star, Clock, ArrowRight,
  ClipboardList, Heart, CalendarCheck, Search, User, List
} from "lucide-react";
import { Link } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import { useFavorites } from "@/context/FavoritesContext";

const upcomingBookings = [

  {
    id: "1",
    property: "Modern Scandinavian Apartment",
    location: "Downtown, Manhattan",
    image: property1,
    dateRange: "Jan 15, 2024 - Feb 15, 2024",
    status: "Confirmed",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: "2",
    property: "Industrial Loft with City View",
    location: "Brooklyn Heights",
    image: property2,
    dateRange: "Mar 1, 2024 - Apr 1, 2024",
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-600",
  },
];

const UserDashboard = () => {
  const { favorites } = useFavorites();
  return (

    <DashboardLayout role="user">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, John!</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your rentals.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Rentals */}
          <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CalendarCheck className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">1</div>
            <div className="text-sm text-slate-500 font-medium">Active Rentals</div>
          </Card>

          {/* Upcoming Bookings */}
          <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">2</div>
            <div className="text-sm text-slate-500 font-medium">Upcoming Bookings</div>
          </Card>

          {/* Properties Saved */}
          <Link to="/user/favorites" className="block outline-none">
            <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{favorites.length}</div>
              <div className="text-sm text-slate-500 font-medium">Properties Saved</div>
            </Card>
          </Link>


          {/* Reviews Given */}
          <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">5</div>
            <div className="text-sm text-slate-500 font-medium">Reviews Given</div>
          </Card>
        </div>

        {/* Upcoming Bookings List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Bookings</h2>
            <Link to="/user/bookings" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="p-4 border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative w-full sm:w-32 h-24 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={booking.image}
                      alt={booking.property}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{booking.property}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {booking.location}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.dateRange}
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <Badge className={`${booking.statusColor} border-none font-medium px-3 py-1 rounded-full`}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/properties" className="block">
              <Card className="p-4 border-none shadow-sm hover:shadow-md transition-all hover:bg-slate-50 flex items-center gap-4 cursor-pointer h-full">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Browse Properties</h3>
                  <p className="text-sm text-slate-500">Find your next home</p>
                </div>
              </Card>
            </Link>

            <Link to="/user/profile" className="block">
              <Card className="p-4 border-none shadow-sm hover:shadow-md transition-all hover:bg-slate-50 flex items-center gap-4 cursor-pointer h-full">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Manage Profile</h3>
                  <p className="text-sm text-slate-500">Update your details</p>
                </div>
              </Card>
            </Link>

            <Link to="/user/bookings" className="block">
              <Card className="p-4 border-none shadow-sm hover:shadow-md transition-all hover:bg-slate-50 flex items-center gap-4 cursor-pointer h-full">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <List className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">View Bookings</h3>
                  <p className="text-sm text-slate-500">Check your rentals</p>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;