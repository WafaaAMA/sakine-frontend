import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Building2,
    Clock,
    CheckCircle,
    XCircle,
    Search,
    Eye
} from "lucide-react";
import { useState, useEffect } from "react"; // ضفنا useEffect [cite: 2025-12-31]
import axios from "axios"; // تأكدي من عمل npm install axios [cite: 2025-12-31]
import { useToast } from "@/hooks/use-toast";

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "approved":
            return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
        case "pending":
            return "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200";
        case "rejected":
            return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
        default:
            return "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";
    }
};

const AdminProperties = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [propertiesList, setPropertiesList] = useState([]); // تبدأ مصفوفة فارغة [cite: 2026-01-01]
    const [loading, setLoading] = useState(true);

    // 1. جلب البيانات من السيرفر عند تحميل الصفحة [cite: 2025-12-31]
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/properties");
            setPropertiesList(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching properties:", error);
            toast({ title: "Error", description: "Failed to load properties from server", variant: "destructive" });
            setLoading(false);
        }
    };

    // 2. تحديث الحالة في الداتابيز (Approve/Reject) [cite: 2025-12-31]
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/properties/${id}/status`, {
                status: newStatus.toLowerCase()
            });
            
            // تحديث القائمة محلياً بعد نجاح طلب الباك إند [cite: 2026-01-01]
            setPropertiesList(prev => prev.map(p => 
                p._id === id ? { ...p, status: newStatus.toLowerCase() } : p
            ));

            toast({
                title: `Property ${newStatus}`,
                description: `The property status has been updated to ${newStatus}.`,
            });
        } catch (error) {
            toast({ title: "Update Failed", description: "Could not update status", variant: "destructive" });
        }
    };

    // 3. حساب الإحصائيات ديناميكياً [cite: 2026-01-01]
    const stats = [
        { label: "Total Properties", value: propertiesList.length, icon: Building2, iconColor: "text-slate-600", bgColor: "bg-slate-100" },
        { label: "Pending Review", value: propertiesList.filter(p => p.status === 'pending').length, icon: Clock, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
        { label: "Approved", value: propertiesList.filter(p => p.status === 'approved').length, icon: CheckCircle, iconColor: "text-green-500", bgColor: "bg-green-50" },
        { label: "Rejected", value: propertiesList.filter(p => p.status === 'rejected').length, icon: XCircle, iconColor: "text-red-500", bgColor: "bg-red-50" },
    ];

    const filteredProperties = propertiesList.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (property.owner?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true : property.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Properties Management</h1>
                    <p className="text-slate-500 mt-1">Review and manage property listings</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6 border-none shadow-sm flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search properties, owners..."
                            className="pl-10 bg-slate-50 border-slate-200 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-slate-50 border-slate-200">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Properties Table */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">Property Listings</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-900 font-semibold">
                                <tr>
                                    <th className="p-4">Property</th>
                                    <th className="p-4">Owner</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Submitted</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="6" className="p-10 text-center">Loading properties...</td></tr>
                                ) : filteredProperties.map((property) => (
                                    <tr key={property._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                                                    <img src={property.images?.[0] || "/placeholder-property.jpg"} alt={property.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{property.title}</div>
                                                    <div className="text-xs text-slate-500">{property.location?.city}, {property.location?.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900">{property.owner?.name || "Unknown"}</div>
                                            <div className="text-xs text-slate-500">{property.owner?.email || "No Email"}</div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-900">
                                            ${property.price?.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`${getStatusColor(property.status)} border px-3 py-1 rounded-full font-medium capitalize`}>
                                                {property.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 font-medium">
                                            {new Date(property.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {property.status === "pending" && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 bg-green-500 hover:bg-green-600 text-white"
                                                            onClick={() => handleStatusUpdate(property._id, "Approved")}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 bg-red-500 hover:bg-red-600 text-white"
                                                            onClick={() => handleStatusUpdate(property._id, "Rejected")}
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                                        </Button>
                                                    </>
                                                )}
                                                <Button variant="ghost" size="sm" className="font-medium text-slate-700">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>
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

export default AdminProperties;