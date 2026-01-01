import { Star, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const advisors = [
  {
    id: 1,
    name: "James Richardson",
    role: "Senior Agent",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    rating: 4.9,
    properties: 42,
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Luxury Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    rating: 4.8,
    properties: 38,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Investment Advisor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    rating: 4.9,
    properties: 35,
  },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const TrustedAdvisors = () => {
  return (
    <section className="py-24 bg-[#F5F2EC] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A351] font-medium text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mt-4 mb-4">
            Start Your Journey With Our Amazing Agents
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto text-lg leading-relaxed">
            Our experienced agents are dedicated to helping you find your perfect property with personalized service and expert knowledge.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {advisors.map((advisor, index) => (
            <Link key={advisor.id} to={`/agent/${advisor.id}`} className="block group">
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden border-0 shadow-none bg-transparent group">
                  {/* Image */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  {/* Info */}
                  <div className="px-2">
                    <h3 className="font-bold text-2xl font-serif text-[#1C1C1C] mb-1 group-hover:text-[#D4A351] transition-colors">
                      {advisor.name}
                    </h3>
                    <p className="text-[#666666] mb-4">
                      {advisor.role}
                    </p>
                    <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                      <div className="flex items-center gap-1.5 text-[#D4A351] font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        {advisor.rating}
                      </div>
                      <div className="text-sm text-[#888888] font-medium">
                        {advisor.properties} Properties
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button variant="outline" className="bg-white hover:bg-white/50 border-[#E5E5E5] text-[#1C1C1C] px-8 h-12 rounded-lg font-medium" asChild>
            <Link to="/agents" className="flex items-center">
              View All Agents
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>


      </div>
    </section>
  );
};

export default TrustedAdvisors;

