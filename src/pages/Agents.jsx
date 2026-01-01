import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrustedAdvisors from "@/components/home/TrustedAdvisors";
import { motion } from "framer-motion";

const Agents = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-12 bg-[#F5F2EC]"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mb-4">Our Professional Agents</h1>
                        <p className="text-[#666666] max-w-2xl mx-auto text-lg">Meet our team of experienced real estate professionals dedicated to helping you find your perfect home.</p>
                    </div>
                </motion.div>
                <TrustedAdvisors />
            </main>
            <Footer />
        </div>
    );
};

export default Agents;
