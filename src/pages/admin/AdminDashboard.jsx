import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Check,
  X,
  MoreHorizontal,
  Clock,
  Home,
  FileText,
  CalendarDays
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [data, setData] = useState({
    stats: { properties: 0, users: 0, bookings: 0, revenue: 0 },
    pendingProperties: [],
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);

  // سحب كل بيانات الداش بورد في طلب واحد [cite: 2026-01-01]
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/stats");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load dashboard data" });
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // وظيفة الموافقة/الرفض للعقارات مباشرة من الداش بورد [cite: 2026-01-01]
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/properties/${id}`, { status: newStatus });
      toast({ title: `Property ${newStatus} successfully` });
      fetchDashboardData(); // تحديث البيانات بعد التغيير
    } catch (error) {
      toast({ variant: "destructive", title: "Update Failed" });
    }
  };

  const statsCards = [
    {
      label: "Total Properties",
      value: data.stats.properties,
      icon: Building2,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Total Users",
      value: data.stats.users,
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Revenue (Confirmed)",
      value: `$${data.stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Bookings",
      value: data.stats.bookings,
      icon: CalendarDays,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time platform performance overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="p-6 border-none shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">{loading ? "..." : stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Pending Approvals</h2>
            <div className="space-y-4">
              {data.pendingProperties.length > 0 ? (
                data.pendingProperties.map((property) => (
                  <Card key={property._id} className="p-4 border-none shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={property.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-slate-900">{property.title}</h3>
                            <p className="text-sm text-slate-500">Owner: {property.owner?.name}</p>
                          </div>
                          <div className="font-bold text-slate-900">${property.price}/mo</div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <Button 
                            onClick={() => handleStatusUpdate(property._id, 'approved')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white h-9"
                          >
                            <Check className="w-4 h-4 mr-2" /> Approve
                          </Button>
                          <Button 
                            onClick={() => handleStatusUpdate(property._id, 'rejected')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white h-9"
                          >
                            <X className="w-4 h-4 mr-2" /> Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-slate-400 italic">No properties waiting for approval.</p>
              )}
            </div>
          </div>

          {/* Recent Activity Section (Last Bookings) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <Card className="p-0 border-none shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {data.recentBookings.map((booking) => (
                  <div key={booking._id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">New Booking</p>
                      <p className="text-xs text-slate-500 truncate">{booking.user?.name} - {booking.property?.title}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;