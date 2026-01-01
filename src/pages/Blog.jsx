import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsSection from "@/components/home/NewsSection";
import { motion } from "framer-motion";

const Blog = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-12 bg-white border-b"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mb-4">Latest Blog & News</h1>
                        <p className="text-[#666666] max-w-2xl mx-auto text-lg">Stay updated with the latest trends, tips, and insights in the real estate market.</p>
                    </div>
                </motion.div>
                <NewsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
