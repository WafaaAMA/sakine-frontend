import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/home/ServicesSection";
import { motion } from "framer-motion";

const Services = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-16">
                <ServicesSection />
            </main>
            <Footer />
        </div>
    );
};

export default Services;
