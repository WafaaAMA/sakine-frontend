import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, CheckCircle, Clock, DollarSign, Search, Eye, X, Check, MoreVertical } from "lucide-react";
import { useState } from "react";

const stats = [
    { label: "Total Bookings", value: "5", icon: Calendar, color: "text-slate-600", bg: "bg-slate-100" },
    { label: "Confirmed", value: "2", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending", value: "1", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Net Earnings", value: "$3,600", icon: DollarSign, color: "text-orange-600", bg: "bg-orange-100" },
];

const bookings = [
    {
        id: "BK001",
        property: "Luxury Downtown Apartment",
        tenant: "John Smith",
        checkIn: "2024-02-15",
        checkOut: "2024-02-20",
        amount: "$750",
        status: "Confirmed",
        statusColor: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    },
    {
        id: "BK002",
        property: "Cozy Studio near Park",
        tenant: "Sarah Johnson",
        checkIn: "2024-02-18",
        checkOut: "2024-02-21",
        amount: "$450",
        status: "Pending",
        statusColor: "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200",
    },
    {
        id: "BK003",
        property: "Modern Family Home",
        tenant: "Mike Wilson",
        checkIn: "2024-03-10",
        checkOut: "2024-03-15",
        amount: "$1200",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    },
    {
        id: "BK004",
        property: "Luxury Penthouse",
        tenant: "Emily Brown",
        checkIn: "2024-04-01",
        checkOut: "2024-04-05",
        amount: "$5000",
        status: "Cancelled",
        statusColor: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
    },
    {
        id: "BK005",
        property: "Beachfront Villa",
        tenant: "David Lee",
        checkIn: "2024-05-01",
        checkOut: "2024-05-10",
        amount: "$3200",
        status: "Confirmed",
        statusColor: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    },
];

const OwnerBookings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout role="owner">
            <div className="space-y-8 animate-fade-in">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
                    <p className="text-slate-500">Manage and track bookings for your properties</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6 border-slate-200 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by property, tenant, or booking ID..."
                            className="pl-10 bg-white border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-white border-slate-200">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Bookings Table */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-white">
                        <h2 className="font-bold text-lg text-slate-900">Booking History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="font-semibold text-slate-700">Booking ID</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Property</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Tenant</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Check-in</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Check-out</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.map((booking) => (
                                    <TableRow key={booking.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-900">{booking.id}</TableCell>
                                        <TableCell className="font-medium text-slate-700">{booking.property}</TableCell>
                                        <TableCell className="text-slate-600">{booking.tenant}</TableCell>
                                        <TableCell className="text-slate-600">{booking.checkIn}</TableCell>
                                        <TableCell className="text-slate-600">{booking.checkOut}</TableCell>
                                        <TableCell className="font-medium text-slate-900">{booking.amount}</TableCell>
                                        <TableCell>
                                            <Badge className={`${booking.statusColor} border shadow-none px-3 py-0.5 rounded-full font-medium`}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {booking.status === "Pending" && (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-slate-700">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default OwnerBookings;
