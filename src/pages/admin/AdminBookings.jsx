import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Eye,
    MoreVertical,
    CalendarDays,
    CreditCard,
    Ban
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

// Mock Data
const mockBookings = [
    {
        id: "BK-001",
        property: "Modern Downtown Apartment",
        image: property1,
        renter: "Alice Cooper",
        owner: "John Smith",
        checkIn: "2024-02-15",
        checkOut: "2024-02-20",
        status: "Confirmed",
        amount: "1,250",
        paymentStatus: "Paid",
    },
    {
        id: "BK-002",
        property: "Cozy Studio Near Park",
        image: property2,
        renter: "Bob Dylan",
        owner: "Sarah Johnson",
        checkIn: "2024-03-01",
        checkOut: "2024-03-05",
        status: "Pending",
        amount: "800",
        paymentStatus: "Pending",
    },
    {
        id: "BK-003",
        property: "Luxury Penthouse Suite",
        image: property3,
        renter: "Charlie Watts",
        owner: "Michael Brown",
        checkIn: "2024-01-10",
        checkOut: "2024-01-15",
        status: "Completed",
        amount: "3,500",
        paymentStatus: "Paid",
    },
    {
        id: "BK-004",
        property: "Family Home with Garden",
        image: property1,
        renter: "David Bowie",
        owner: "Emily Davis",
        checkIn: "2024-02-05",
        checkOut: "2024-02-12",
        status: "Cancelled",
        amount: "1,400",
        paymentStatus: "Refunded",
    },
    {
        id: "BK-005",
        property: "Waterfront Condo",
        image: property2,
        renter: "Elton John",
        owner: "David Wilson",
        checkIn: "2024-04-10",
        checkOut: "2024-04-17",
        status: "Confirmed",
        amount: "2,100",
        paymentStatus: "Paid",
    },
];

const stats = [
    {
        label: "Total Bookings",
        value: "156",
        icon: CalendarDays,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        label: "Confirmed",
        value: "42",
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-50",
    },
    {
        label: "Pending",
        value: "15",
        icon: Clock,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        label: "Cancelled",
        value: "8",
        icon: Ban,
        iconColor: "text-red-500",
        bgColor: "bg-red-50",
    },
];

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case "confirmed":
            return "bg-green-100 text-green-700 border-green-200";
        case "pending":
            return "bg-orange-100 text-orange-700 border-orange-200";
        case "completed":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "cancelled":
            return "bg-red-100 text-red-700 border-red-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

const AdminBookings = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [bookings, setBookings] = useState(mockBookings);

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.renter.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" ? true : booking.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleCancelBooking = (id) => {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: "Cancelled", paymentStatus: "Refunded" } : b));
        toast({
            title: "Booking Cancelled",
            description: "The booking has been successfully cancelled.",
        });
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Bookings Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage all property reservations</p>
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
                            placeholder="Search bookings, renters..."
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
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Bookings Table */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-900 font-semibold">
                                <tr>
                                    <th className="p-4 pl-6">Booking ID</th>
                                    <th className="p-4">Property</th>
                                    <th className="p-4">Renter / Owner</th>
                                    <th className="p-4">Dates</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6 font-medium text-slate-900">
                                            {booking.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                                                    <img src={booking.image} alt={booking.property} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="max-w-[150px] truncate font-medium text-slate-900" title={booking.property}>
                                                    {booking.property}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-slate-900 font-medium">{booking.renter}</div>
                                            <div className="text-xs text-slate-500">Owner: {booking.owner}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col text-xs">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.checkIn}</span>
                                                <span className="flex items-center gap-1 text-slate-400">to {booking.checkOut}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-900">
                                            ${booking.amount}
                                            <div className="text-xs font-normal text-slate-500 flex items-center gap-1 mt-0.5">
                                                <CreditCard className="w-3 h-3" /> {booking.paymentStatus}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`${getStatusColor(booking.status)} border px-2.5 py-0.5 rounded-full text-xs font-medium`}>
                                                {booking.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="w-4 h-4 mr-2" /> View Details
                                                    </DropdownMenuItem>
                                                    {booking.status !== "Cancelled" && (
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleCancelBooking(booking.id)}>
                                                            <Ban className="w-4 h-4 mr-2" /> Cancel Booking
                                                        </DropdownMenuItem>
                                                    )}
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

export default AdminBookings;
