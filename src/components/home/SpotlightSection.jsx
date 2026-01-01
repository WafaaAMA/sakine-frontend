import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SpotlightSection = () => {
    return (
        <section className="py-20 bg-[#0F172A] overflow-hidden">
            {/* Dark navy background matching image */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full lg:w-3/5"
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] md:aspect-[16/9] group">
                            <img
                                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
                                alt="Modern Lakefront Villa"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                        {/* Price Badge */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                            className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-[#D4A351] text-white p-6 rounded-t-2xl rounded-bl-2xl rounded-br-none shadow-lg z-10 w-40 text-center"
                        >
                            <div className="text-sm font-semibold mb-1">Starting at</div>
                            <div className="text-3xl font-bold font-serif">$8.5M</div>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-2/5 text-white space-y-8"
                    >
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 px-4 py-1.5 backdrop-blur-sm">
                            Featured Property
                        </Badge>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-2">
                                Modern Lakefront Villa
                            </h2>
                            <div className="flex items-center text-white/80 gap-2 mb-6">
                                <MapPin className="w-4 h-4" />
                                <span>Lake Tahoe, California</span>
                            </div>
                        </div>

                        <p className="text-white/70 leading-relaxed text-lg">
                            This stunning property offers breathtaking views, modern amenities, and an unparalleled living experience. Featuring spacious rooms, premium finishes, and a prime location.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Bed, value: "5", label: "Bedrooms" },
                                { icon: Bath, value: "4", label: "Bathrooms" },
                                { icon: Square, value: "4,200", label: "Sq Ft" }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center border border-white/5"
                                >
                                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#D4A351]" />
                                    <div className="font-bold text-xl">{stat.value}</div>
                                    <div className="text-xs text-white/60">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button className="bg-white text-[#0F172A] hover:bg-white/90 font-semibold px-8 py-6 rounded-lg text-base w-full sm:w-auto" asChild>
                                <Link to="/contact?subject=Schedule a Tour: Modern Lakefront Villa">
                                    Schedule a Tour
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


export default SpotlightSection;

