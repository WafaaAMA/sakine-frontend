import { Heart, MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { motion } from "framer-motion";


const PropertyCard = (props) => {
  const {
    id,
    title,
    location,
    price,
    image,
    bedrooms,
    bathrooms,
    area,
    rating,
    reviews,
    featured,
  } = props;

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(props);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all shadow-md active:scale-90 z-10"
          >
            <Heart className={`w-4 h-4 transition-colors ${favorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </button>

          {/* Featured Badge */}
          {featured && (
            <Badge className="absolute top-3 left-3 bg-accent-gradient text-accent-foreground border-0">
              Featured
            </Badge>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between h-[calc(100%-14rem)]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-accent transition-colors">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" />
                <span>{bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="w-4 h-4" />
                <span>{area} sqft</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-foreground">${price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <Button variant="default" size="sm" asChild>
              <Link to={`/property/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

};

export default PropertyCard;