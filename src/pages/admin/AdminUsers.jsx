import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  CheckCircle,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 1. دالة جلب البيانات من الباك إند [cite: 2025-12-31]
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({
        title: "Error",
        description: "Failed to load users database",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. دالة الحذف [cite: 2025-12-31]
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        toast({
          title: "Success",
          description: "User has been deleted successfully",
        });
        fetchUsers(); // إعادة تحميل البيانات لتحديث الجدول والتوتال [cite: 2025-12-31]
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not delete user",
          variant: "destructive",
        });
      }
    }
  };

  // 3. منطق الفلترة والبحث [cite: 2025-12-31]
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const role = user.role?.toLowerCase();
    const matchesTab =
      activeTab === "all" ? true :
      activeTab === "renters" ? role === "user" :
      activeTab === "owners" ? role === "owner" : true;

    return matchesSearch && matchesTab;
  });

  // 4. الإحصائيات (عرض Total Users فقط كما طلبتِ) [cite: 2025-12-31]
  const stats = [
    {
      label: "Total Users",
      value: users.length, // محسوب ديناميكياً [cite: 2025-12-31]
      icon: Users,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  if (loading) return <div className="p-10 text-center font-bold">Connecting to Database...</div>;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Users Management</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all platform users</p>
        </div>

        {/* Dynamic Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border-none shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 border-none focus-visible:ring-0 bg-transparent h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent p-0 gap-2 h-auto flex-wrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white bg-slate-100 rounded-lg px-4 py-2">All Users</TabsTrigger>
              <TabsTrigger value="renters" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white bg-slate-100 rounded-lg px-4 py-2">Renters</TabsTrigger>
              <TabsTrigger value="owners" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white bg-slate-100 rounded-lg px-4 py-2">Owners</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Users Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold">
                <tr>
                  <th className="p-4 pl-6">User</th>
                  <th className="p-4 text-center">Role</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Verified</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline" className="capitalize font-normal border-slate-300">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500 text-white rounded-full px-3 py-0.5 text-xs font-medium border-none">
                        Active
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                       <CheckCircle className={`w-5 h-5 mx-auto ${user.role === 'admin' ? 'text-green-500' : 'text-slate-300'}`} />
                    </td>
                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-slate-400" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleDelete(user._id)} 
                            className="text-red-600 font-medium cursor-pointer"
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;