import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/properties/PropertyCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const featuredProperties = [
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
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Curated For You
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Properties
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Handpicked premium rentals that meet our highest standards for quality and comfort.
            </p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto group">
            <Link to="/properties">
              View All Properties
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
            >
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
