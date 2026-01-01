import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit, Trash2, MapPin, Bed, Bath, Square, Eye, Pause } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import propertiesImage from "@/assets/hero-building.jpg"; // Placeholder for 4th if needed

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Manhattan, New York",
    price: 2500,
    beds: 3,
    baths: 2,
    sqft: 1200,
    image: property1,
    status: "Active",
    statusColor: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    bookings: 12,
  },
  {
    id: 2,
    title: "Cozy Studio with City View",
    location: "Brooklyn, New York",
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 650,
    image: property2,
    status: "Active",
    statusColor: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    bookings: 8,
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Midtown, New York",
    price: 5500,
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: property3,
    status: "Pending Approval",
    statusColor: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
    bookings: 0,
  },
  {
    id: 4,
    title: "Modern Family Home",
    location: "Queens, New York",
    price: 3200,
    beds: 4,
    baths: 3,
    sqft: 1800,
    image: propertiesImage,
    status: "Paused",
    statusColor: "bg-orange-500 hover:bg-orange-600 text-white border-orange-500",
    bookings: 5,
  },
];

const OwnerProperties = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState(mockProperties);

  const handleDelete = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: "Property Deleted",
      description: "The property has been removed from your listings.",
      variant: "destructive",
    });
  };

  const handlePause = (id) => {
    setProperties(properties.map(p => {
      if (p.id === id) {
        const newStatus = p.status === "Active" ? "Paused" : "Active";
        const newColor = newStatus === "Active"
          ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
          : "bg-orange-500 hover:bg-orange-600 text-white border-orange-500";
        return { ...p, status: newStatus, statusColor: newColor };
      }
      return p;
    }));
    toast({
      title: "Status Updated",
      description: "Property listing status has been updated.",
    });
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Properties</h1>
            <p className="text-slate-500 text-sm">Manage your property listings</p>
          </div>
          <Link to="/owner/properties/add">
            <Button className="bg-[#1E293B] hover:bg-[#0f172a] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search properties..."
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${property.statusColor} border-none font-medium px-2.5 py-0.5`}>
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm backdrop-blur-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to={`/property/${property.id}`} className="cursor-pointer w-full flex items-center py-2.5">
                          <Eye className="w-4 h-4 mr-2.5" /> View Listing
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/owner/properties/edit/${property.id}`} className="cursor-pointer w-full flex items-center py-2.5">
                          <Edit className="w-4 h-4 mr-2.5" /> Edit Property
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer w-full flex items-center py-2.5"
                        onClick={() => handlePause(property.id)}
                      >
                        <Pause className="w-4 h-4 mr-2.5" /> {property.status === "Active" ? "Pause Listing" : "Resume Listing"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer w-full flex items-center py-2.5"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2.5" /> Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 truncate">{property.title}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-600 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" /> {property.beds}
                    <span className="text-slate-400 text-xs ml-0.5">beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" /> {property.baths}
                    <span className="text-slate-400 text-xs ml-0.5">baths</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square className="w-4 h-4" /> {property.sqft}
                    <span className="text-slate-400 text-xs ml-0.5">sqft</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="font-bold text-lg text-orange-500">
                    ${property.price.toLocaleString()}<span className="text-xs font-normal text-slate-400">/month</span>
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {property.bookings} bookings
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerProperties;