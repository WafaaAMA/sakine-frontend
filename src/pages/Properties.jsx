import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, Grid3X3, List, MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const allProperties = [
  {
    id: "1",
    title: "Modern Scandinavian Apartment",
    location: "Downtown, Manhattan",
    price: 2500,
    image: property1,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.9,
    reviews: 128,
    featured: true,
  },
  {
    id: "2",
    title: "Industrial Loft with City View",
    location: "Brooklyn Heights",
    price: 3200,
    image: property2,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    rating: 4.8,
    reviews: 96,
    featured: true,
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    location: "Upper East Side",
    price: 8500,
    image: property3,
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    rating: 5.0,
    reviews: 64,
    featured: true,
  },
  {
    id: "4",
    title: "Cozy Studio in Midtown",
    location: "Midtown, Manhattan",
    price: 1800,
    image: property1,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    rating: 4.6,
    reviews: 155,
    featured: false,
  },
  {
    id: "5",
    title: "Spacious Family Home",
    location: "Queens",
    price: 4200,
    image: property2,
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    rating: 4.7,
    reviews: 72,
    featured: false,
  },
  {
    id: "6",
    title: "Modern Duplex Apartment",
    location: "SoHo",
    price: 5500,
    image: property3,
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    rating: 4.9,
    reviews: 89,
    featured: false,
  },
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("location") || "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");
  const [bedroomFilter, setBedroomFilter] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const loc = searchParams.get("location");
    const typ = searchParams.get("type");
    if (loc) setSearchTerm(loc);
    if (loc) setLocationFilter(loc);
    if (typ) setTypeFilter(typ);
  }, [searchParams]);

  // Filter Logic
  const filteredProperties = allProperties.filter(property => {
    // Search Term
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filters
    const matchesLocation = locationFilter === "" || property.location.toLowerCase().includes(locationFilter.toLowerCase());

    // In a real app property type would be a property field
    const matchesType = typeFilter === "all" ? true : property.title.toLowerCase().includes(typeFilter.toLowerCase()) || property.id === "1"; // Mock match

    const matchesBedrooms = bedroomFilter === "any" ? true : property.bedrooms >= parseInt(bedroomFilter);
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

    return matchesSearch && matchesLocation && matchesType && matchesBedrooms && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0; // Default newest (mock id order)
  });

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setTypeFilter("all");
    setBedroomFilter("any");
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#1E293B] pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Browse Properties
          </h1>
          <p className="text-slate-300 mb-8">
            Discover your perfect rental from our collection of verified properties.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search by location, property name..."
                className="pl-12 h-14 bg-white border-none rounded-lg text-base shadow-lg text-slate-900 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="h-14 px-8 bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600 backdrop-blur-sm gap-2 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="p-6 bg-white rounded-xl shadow-xl animate-in fade-in slide-in-from-top-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Any location"
                      className="pl-9 h-11 bg-slate-50 border-slate-200 focus:border-slate-400 focus:ring-0"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Property Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Type</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Bedrooms</label>
                  <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+ Bedroom</SelectItem>
                      <SelectItem value="2">2+ Bedrooms</SelectItem>
                      <SelectItem value="3">3+ Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-900">Price Range</label>
                    <span className="text-xs font-medium text-slate-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 10000]}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    2 filters applied
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-900 gap-2 h-auto p-0 hover:bg-transparent"
                    onClick={clearFilters}
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </Button>
                </div>
                <Button
                  className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-8 h-11"
                  onClick={() => {
                    setShowFilters(false);
                    toast({
                      title: "Filters Applied",
                      description: `Found ${filteredProperties.length} properties matching your criteria.`,
                    });
                  }}
                >
                  Apply Filters
                </Button>

              </div>
            </div>
          )}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="text-slate-600 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredProperties.length}</span> properties
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white border-slate-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-16 flex justify-center gap-2">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-600 hover:text-slate-900"
            onClick={() => toast({ title: "Page Updated", description: "You are already on the first page." })}
          >
            Previous
          </Button>
          <Button className="bg-[#1E293B] text-white hover:bg-[#0f172a]">1</Button>
          {[2, 3].map((page) => (
            <Button
              key={page}
              variant="outline"
              className="border-slate-200 text-slate-600 hover:text-slate-900"
              onClick={() => toast({ title: `Page ${page}`, description: `Moving to page ${page}... (Demo purposes)` })}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="border-slate-200 text-slate-600 hover:text-slate-900"
            onClick={() => toast({ title: "Next Page", description: "Loading more properties..." })}
          >
            Next
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;