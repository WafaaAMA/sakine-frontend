import { motion } from "framer-motion";
import { Home, ShieldCheck, BadgeDollarSign, Headphones, FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
    // ... (same as before)

    {
        icon: Search,
        title: "Property Discovery",
        description: "Our advanced search tools help you find exactly what you're looking for with precision and ease.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description: "Every property on our platform is personally verified to ensure quality and authenticity for your peace of mind.",
    },
    {
        icon: BadgeDollarSign,
        title: "Investment Advice",
        description: "Get expert insights and financial guidance on property investments to maximize your returns.",
    },
    {
        icon: Home,
        title: "Property Management",
        description: "Full-service management for owners, from tenant screening to maintenance and legal documentation.",
    },
    {
        icon: FileText,
        title: "Legal Support",
        description: "Our legal team ensures all contracts and agreements are transparent and compliant with local laws.",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Round-the-clock assistance for both tenants and owners to resolve any issues immediately.",
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

const ServicesSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D4A351] font-medium text-sm uppercase tracking-wider">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mt-4 mb-4">
                        Comprehensive Real Estate Solutions
                    </h2>
                    <p className="text-[#666666] max-w-2xl mx-auto text-lg leading-relaxed">
                        We provide a wide range of services to ensure a seamless and rewarding experience for both renters and property owners.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <Link key={index} to={`/contact?subject=Service Inquiry: ${service.title}`} className="block group">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-2xl bg-[#F5F2EC] hover:bg-[#EBE5DA] transition-all duration-300 group h-full"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:bg-[#D4A351] transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-[#D4A351] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-[#1C1C1C] mb-3 group-hover:text-[#D4A351] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-[#666666] leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
