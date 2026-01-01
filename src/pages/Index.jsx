import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServicesSection from "@/components/home/ServicesSection";
import SpotlightSection from "@/components/home/SpotlightSection";

import HowItWorks from "@/components/home/HowItWorks";
import TrustedAdvisors from "@/components/home/TrustedAdvisors";
import NewsSection from "@/components/home/NewsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <ServicesSection />
        <SpotlightSection />

        <HowItWorks />
        <TrustedAdvisors />
        <NewsSection />
        <CTASection />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
