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
    Eye,
    MoreHorizontal
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const stats = [
    {
        label: "Total Properties",
        value: "5",
        icon: Building2,
        iconColor: "text-slate-600",
        bgColor: "bg-slate-100",
    },
    {
        label: "Pending Review",
        value: "2",
        icon: Clock,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        label: "Approved",
        value: "1",
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-50",
    },
    {
        label: "Rejected",
        value: "1",
        icon: XCircle,
        iconColor: "text-red-500",
        bgColor: "bg-red-50",
    },
];

const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        address: "Downtown, New York",
        owner: "John Smith",
        ownerEmail: "john@example.com",
        price: "2,500",
        status: "Pending",
        submitted: "2024-01-15",
        image: property1,
    },
    {
        id: 2,
        title: "Cozy Studio Near Park",
        address: "Central Park, New York",
        owner: "Sarah Johnson",
        ownerEmail: "sarah@example.com",
        price: "1,800",
        status: "Approved",
        submitted: "2024-01-10",
        image: property2,
    },
    {
        id: 3,
        title: "Luxury Penthouse Suite",
        address: "Upper East Side, New York",
        owner: "Michael Brown",
        ownerEmail: "michael@example.com",
        price: "8,500",
        status: "Pending",
        submitted: "2024-01-18",
        image: property3,
    },
    {
        id: 4,
        title: "Family Home with Garden",
        address: "Brooklyn, New York",
        owner: "Emily Davis",
        ownerEmail: "emily@example.com",
        price: "4,200",
        status: "Rejected",
        submitted: "2024-01-08",
        image: property1,
    },
    {
        id: 5,
        title: "Waterfront Condo",
        address: "Battery Park, New York",
        owner: "David Wilson",
        ownerEmail: "david@example.com",
        price: "5,500",
        status: "Approved", // Assuming "Passed" in image means Approved
        submitted: "2024-01-12",
        image: property2,
    },
];

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
    const [propertiesList, setPropertiesList] = useState(properties);

    // Filter Logic
    const filteredProperties = propertiesList.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.owner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true : property.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = (id, newStatus) => {
        setPropertiesList(propertiesList.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        ));
        toast({
            title: `Property ${newStatus}`,
            description: `The property has been marked as ${newStatus.toLowerCase()}.`,
        });
    };

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
                                {filteredProperties.map((property) => (
                                    <tr key={property.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                                                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{property.title}</div>
                                                    <div className="text-xs text-slate-500">{property.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900">{property.owner}</div>
                                            <div className="text-xs text-slate-500">{property.ownerEmail}</div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-900">
                                            ${property.price}/mo
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`${getStatusColor(property.status)} border px-3 py-1 rounded-full font-medium`}>
                                                {property.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 font-medium">
                                            {property.submitted}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {property.status === "Pending" && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 bg-green-500 hover:bg-green-600 text-white"
                                                            onClick={() => handleStatusUpdate(property.id, "Approved")}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 bg-red-500 hover:bg-red-600 text-white"
                                                            onClick={() => handleStatusUpdate(property.id, "Rejected")}
                                                        >
                                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                                        </Button>
                                                    </>
                                                )}
                                                <Button variant="ghost" size="sm" className="font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
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
