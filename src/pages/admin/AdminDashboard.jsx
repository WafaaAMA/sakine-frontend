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
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const stats = [
  {
    label: "Total Properties",
    value: "1,245",
    change: "+12%",
    icon: Building2,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    label: "Total Users",
    value: "8,432",
    change: "+8%",
    icon: Users,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Revenue (MTD)",
    value: "$124,500",
    change: "+22%",
    icon: DollarSign,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    label: "Commission",
    value: "$12,450",
    change: "+15%",
    icon: TrendingUp,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
];

const pendingProperties = [
  {
    id: "1",
    title: "Downtown Studio Apartment",
    owner: "Michael Chen",
    image: property1,
    submittedAt: "2 hours ago",
    price: 1800,
  },
  {
    id: "2",
    title: "Beachfront Villa",
    owner: "Sarah Johnson",
    image: property2,
    submittedAt: "5 hours ago",
    price: 12000,
  },
];

const recentActivity = [
  { id: "1", action: "New user registered", user: "Emily R.", time: "10 min ago", type: "user" },
  { id: "2", action: "Property approved", property: "Luxury Loft", time: "1 hour ago", type: "property" },
  { id: "3", action: "New booking", guest: "James K.", time: "2 hours ago", type: "booking" },
  { id: "4", action: "Owner verified", user: "David P.", time: "3 hours ago", type: "user" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of platform performance and pending actions.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Pending Approvals</h2>
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {pendingProperties.map((property) => (
                <Card key={property.id} className="p-4 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{property.title}</h3>
                          <p className="text-sm text-slate-500">by <span className="text-slate-700 font-medium">{property.owner}</span></p>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                            <Clock className="w-3 h-3" /> {property.submittedAt}
                          </div>
                        </div>
                        <div className="font-bold text-slate-900">
                          ${property.price}/mo
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white h-9 rounded-lg">
                          <Check className="w-4 h-4 mr-2" /> Approve
                        </Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white h-9 rounded-lg">
                          <X className="w-4 h-4 mr-2" /> Reject
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <Card className="p-0 border-none shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === "user" ? "bg-blue-50 text-blue-500" :
                        activity.type === "property" ? "bg-green-50 text-green-500" :
                          "bg-orange-50 text-orange-500"
                      }`}>
                      {activity.type === "user" ? <Users className="w-5 h-5" /> :
                        activity.type === "property" ? <Home className="w-5 h-5" /> :
                          <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500 truncate">{activity.user || activity.property || activity.guest}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Platform Overview Chart */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Platform Overview</h2>
          <Card className="p-6 border-none shadow-sm h-80 flex items-center justify-center bg-slate-50 rounded-xl">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Chart visualization would go here</p>
            </div>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;