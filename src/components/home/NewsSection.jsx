import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const articles = [
    {
        id: 1,
        tag: "Renting Guide",
        date: "Dec 15, 2024",
        title: "10 Tips for First-Time Renters",
        description: "Essential advice to navigate your first rental experience with confidence.",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        tag: "Market Insights",
        date: "Dec 10, 2024",
        title: "Real Estate Rental Trends 2025",
        description: "What to expect from the rental market in the coming year.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        tag: "Owner Tips",
        date: "Dec 5, 2024",
        title: "Preparing Your Property for Rent",
        description: "Professional tips to make your property stand out to tenants.",
        image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const NewsSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
                >
                    <div>
                        <span className="text-[#D4A351] font-medium text-sm w-full block mb-2">
                            Our Blog
                        </span>
                        <h2 className="text-4xl font-bold font-serif text-[#1C1C1C]">
                            Latest News & Insights
                        </h2>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center text-[#1C1C1C] font-medium hover:text-[#D4A351] transition-colors group">
                        View All Articles
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.id}`}
                            className="group cursor-pointer block"
                        >
                            <motion.div variants={itemVariants}>
                                {/* Image */}
                                <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-3">
                                    <Badge variant="secondary" className="bg-[#F5F2EC] text-[#1C1C1C] hover:bg-[#EBE5DA] rounded-lg px-3 py-1 font-medium border-0">
                                        {article.tag}
                                    </Badge>
                                    <div className="flex items-center text-[#888888]">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {article.date}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold font-serif text-[#1C1C1C] mb-3 group-hover:text-[#D4A351] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-[#666666] leading-relaxed text-sm">
                                    {article.description}
                                </p>
                            </motion.div>
                        </Link>

                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 md:hidden"
                >
                    <Link to="/blog" className="flex items-center justify-center text-[#1C1C1C] font-medium hover:text-[#D4A351] transition-colors">
                        View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsSection;

