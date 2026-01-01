import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  TrendingUp,
  Calendar,
  Plus,
  MoreHorizontal,
  Eye,
  Users,
  PenSquare
} from "lucide-react";
import { Link } from "react-router-dom";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  { label: "Total Properties", value: "3", icon: Building2, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Total Earnings", value: "$24,500", icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
  { label: "This Month", value: "$8,500", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Total Bookings", value: "17", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
];

const properties = [
  {
    id: "1",
    title: "Modern Scandinavian Apartment",
    image: property1,
    price: 2500,
    status: "Active",
    statusColor: "bg-green-500",
    views: 458,
    bookings: 12,
  },
  {
    id: "2",
    title: "Industrial Loft with City View",
    image: property2,
    price: 3200,
    status: "Pending",
    statusColor: "bg-orange-500",
    views: 124,
    bookings: 3,
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    image: property3,
    price: 5500,
    status: "Paused",
    statusColor: "bg-gray-500",
    views: 890,
    bookings: 5,
  },
];

const recentBookings = [
  { id: 1, name: "Sarah M.", property: "Modern Apartment", date: "Jan 15 - Feb 15", price: 2500, avatar: "SM", color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "James K.", property: "Luxury Penthouse", date: "Dec 1 - Dec 10", price: 5500, avatar: "JK", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Emily R.", property: "Modern Apartment", date: "Nov 15 - Oct 30", price: 3500, avatar: "ER", color: "bg-purple-100 text-purple-600" },
];

const OwnerDashboard = () => {
  return (
    <DashboardLayout role="owner">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Owner Dashboard</h1>
            <p className="text-slate-500">Manage your properties and earnings</p>
          </div>
          <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white" asChild>
            <Link to="/owner/properties/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Link>
          </Button>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border-none shadow-sm flex flex-col justify-between h-32">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} mb-4`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Your Properties */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Your Properties</h2>
            <Link to="/owner/properties" className="text-sm font-medium text-slate-500 hover:text-slate-900">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <Badge className={`absolute top-3 right-3 ${property.statusColor} border-none text-white`}>
                    {property.status}
                  </Badge>
                </div>
                <div className="p-4 bg-white space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 truncate">{property.title}</h3>
                    <p className="text-sm font-medium text-slate-500">${property.price}/mo</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {property.views}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {property.bookings}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full h-9 text-xs gap-2 bg-slate-50 border-slate-200" asChild>
                    <Link to={`/owner/properties/edit/${property.id}`}>
                      <PenSquare className="w-3 h-3" /> Edit
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Bookings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
            <Link to="/owner/bookings" className="text-sm font-medium text-slate-500 hover:text-slate-900">View All →</Link>
          </div>
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${booking.color}`}>
                      {booking.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{booking.name}</p>
                      <p className="text-xs text-slate-500">{booking.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">${booking.price}</p>
                    <p className="text-xs text-slate-500">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;