import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Heart, Share2, MapPin, Bed, Bath, Square, Star,
  Wifi, Car, Dumbbell, Waves, Shield, BadgeCheck, ChevronLeft,
  ChevronRight, User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BookingForm from "@/components/booking/BookingForm";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

const propertyImages = [property1, property2, property3];

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    date: "2 weeks ago",
    rating: 5,
    text: "Absolutely stunning apartment! The views are incredible and the owner was very responsive. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: 2,
    name: "James K.",
    date: "1 month ago",
    rating: 5,
    text: "Perfect location and beautifully maintained. Everything was exactly as described.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const propertyData = {
    id,
    title: "Modern Scandinavian Apartment",
    location: "Downtown, Manhattan",
    price: 2500,
    image: property1,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.9,
    reviews: 128,
    featured: true
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Property link has been copied to clipboard.",
    });
  };



  return (
    <div className="min-h-screen bg-background font-outfit">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden group">
                  <img
                    src={propertyImages[activeImage]}
                    alt="Property Image"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm"
                      onClick={() => toggleFavorite(propertyData)}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                    </Button>
                  </div>

                </div>

                <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {propertyImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 transition-all ${activeImage === index ? "ring-2 ring-accent ring-offset-2" : "opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1 px-3 py-1">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </Badge>
                  <Badge variant="outline" className="text-orange-500 border-orange-500 bg-orange-50 px-3 py-1">
                    Featured
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-foreground">Modern Scandinavian Apartment</h1>

                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Downtown, Manhattan
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 font-medium">
                    <Star className="w-4 h-4 fill-orange-500" />
                    4.9 <span className="text-muted-foreground font-normal">(128 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-6 flex flex-col items-center justify-center gap-2 hover:border-orange-200 transition-colors">
                  <Bed className="w-6 h-6 text-orange-500" />
                  <span className="font-semibold text-lg">2 Bedrooms</span>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center gap-2 hover:border-orange-200 transition-colors">
                  <Bath className="w-6 h-6 text-orange-500" />
                  <span className="font-semibold text-lg">2 Bathrooms</span>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center gap-2 hover:border-orange-200 transition-colors">
                  <Square className="w-6 h-6 text-orange-500" />
                  <span className="font-semibold text-lg">1,200 sqft</span>
                </Card>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">About This Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to this stunning modern apartment located in the heart of Manhattan. This beautifully designed space features floor-to-ceiling windows with panoramic city views, high-end finishes throughout, and a spacious open floor plan perfect for both relaxation and entertaining. The apartment comes fully furnished with designer furniture and includes all modern amenities.
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: Wifi, label: "High-Speed WiFi" },
                    { icon: Car, label: "Parking Included" },
                    { icon: Dumbbell, label: "Fitness Center" },
                    { icon: Waves, label: "Swimming Pool" },
                    { icon: Shield, label: "24/7 Security" },
                  ].map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                      <amenity.icon className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Reviews</h3>
                  <Button
                    variant="link"
                    className="text-orange-500 p-0 font-semibold"
                    onClick={() => toast({ title: "Coming Soon", description: "Full reviews page is under development." })}
                  >
                    View All
                  </Button>

                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-5 border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Booking Card */}
            <div className="lg:col-span-1">
              <BookingForm
                propertyId={id}
                price={2500}
                rating={4.9}
                reviewCount={128}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;