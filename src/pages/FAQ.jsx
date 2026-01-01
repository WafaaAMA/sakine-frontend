import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const faqs = [
        {
            category: "General",
            questions: [
                {
                    q: "What is SaKiNe?",
                    a: "SaKiNe is a premium property rental platform that connects verified property owners with quality tenants, ensuring a smooth and secure rental process for everyone."
                },
                {
                    q: "How do I create an account?",
                    a: "You can sign up by clicking the 'Get Started' button in the navbar. Choose whether you're a renter or a property owner during the registration process."
                },
                {
                    q: "Is there a mobile app?",
                    a: "Currently, we focus on providing a high-quality web experience that is fully responsive and optimized for mobile browsers. A dedicated mobile app is in our roadmap."
                }
            ]
        },
        {
            category: "For Renters",
            questions: [
                {
                    q: "How do I book a property?",
                    a: "Once you find a property you love, use the booking form on the property detail page to select your dates and submit your request. The owner will review and confirm your booking."
                },
                {
                    q: "What are the common fees?",
                    a: "As a renter, you pay the monthly rent and a small service fee to SaKiNe for platform maintenance and security features. Any security deposits are managed through our secure escrow system."
                },
                {
                    q: "How can I contact a property owner?",
                    a: "You can send messages directly to property owners through the 'Contact Owner' button available on active bookings in your dashboard."
                }
            ]
        },
        {
            category: "For Owners",
            questions: [
                {
                    q: "How much does it cost to list a property?",
                    a: "We offer several tiers, starting with a free plan for single listings. Professional and Enterprise plans offer more features for larger portfolios. Check our Pricing page for details."
                },
                {
                    q: "How do I become a verified owner?",
                    a: "Verification requires submitting a government-issued ID and proof of property ownership. Once our team reviews these documents, you'll receive the 'Verified' badge."
                },
                {
                    q: "How do I receive payments?",
                    a: "Payments are processed through our secure payment gateway and deposited directly into your linked bank account after the necessary commission deductions."
                }
            ]
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const allQuestions = faqs.flatMap((category, cIdx) =>
        category.questions.map((q, qIdx) => ({
            ...q,
            id: `${cIdx}-${qIdx}`,
            category: category.category
        }))
    );

    const filteredFaqs = searchQuery
        ? allQuestions.filter(f =>
            f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allQuestions;

    return (
        <div className="min-h-screen bg-background text-[#1C1C1C]">
            <Navbar />
            <main className="pt-20">
                <section className="py-24 bg-[#F5F2EC]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-bold font-serif mb-6"
                            >
                                How can we <span className="text-[#D4A351]">help you?</span>
                            </motion.h1>
                            <p className="text-[#666666] text-lg mb-10">
                                Search our frequently asked questions to find quick answers to common queries.
                            </p>

                            <div className="relative max-w-xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    className="h-14 pl-12 rounded-2xl border-0 shadow-lg bg-white focus-visible:ring-1 focus-visible:ring-[#D4A351]"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            {searchQuery ? (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold mb-6">Search Results</h2>
                                    {filteredFaqs.length > 0 ? (
                                        filteredFaqs.map((faq) => (
                                            <div key={faq.id} className="border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#D4A351]/30 transition-all">
                                                <button
                                                    onClick={() => toggleAccordion(faq.id)}
                                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F5F2EC]/50 transition-colors"
                                                >
                                                    <span className="font-bold text-lg pr-4">{faq.q}</span>
                                                    {activeIndex === faq.id ? <Minus className="w-5 h-5 shrink-0" /> : <Plus className="w-5 h-5 shrink-0" />}
                                                </button>
                                                <AnimatePresence>
                                                    {activeIndex === faq.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-6 pt-0 text-[#666666] leading-relaxed border-t border-[#F5F2EC]">
                                                                {faq.a}
                                                                <div className="mt-4">
                                                                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4A351] bg-[#F5F2EC] px-2 py-1 rounded">
                                                                        {faq.category}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20">
                                            <p className="text-lg text-[#666666]">No answers found for "{searchQuery}". Try a different keyword.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                faqs.map((category, cIdx) => (
                                    <div key={cIdx} className="mb-16">
                                        <h2 className="text-2xl font-bold mb-8 font-serif border-l-4 border-[#D4A351] pl-4">{category.category}</h2>
                                        <div className="space-y-4">
                                            {category.questions.map((faq, qIdx) => {
                                                const id = `${cIdx}-${qIdx}`;
                                                return (
                                                    <div key={id} className="border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#D4A351]/30 transition-all">
                                                        <button
                                                            onClick={() => toggleAccordion(id)}
                                                            className={`w-full flex items-center justify-between p-6 text-left transition-colors ${activeIndex === id ? "bg-[#F5F2EC]/50" : "hover:bg-[#F5F2EC]/30"}`}
                                                        >
                                                            <span className="font-bold text-lg pr-4">{faq.q}</span>
                                                            {activeIndex === id ? <Minus className="w-5 h-5 shrink-0" /> : <Plus className="w-5 h-5 shrink-0 text-[#D4A351]" />}
                                                        </button>
                                                        <AnimatePresence>
                                                            {activeIndex === id && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="p-6 pt-0 text-[#666666] leading-relaxed border-t border-[#F5F2EC]">
                                                                        {faq.a}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-[#1C1C1C] text-white">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 font-serif">Still have questions?</h2>
                            <p className="text-white/60 text-lg mb-10">
                                If you couldn't find the answer you were looking for, our support team is ready to help you directly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact">
                                    <button className="bg-[#D4A351] hover:bg-[#C29241] text-white px-8 h-14 rounded-xl font-bold transition-all transform hover:scale-105 w-full sm:w-auto">
                                        Send Us an Email
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        toast({
                                            title: "Live Chat Unavailable",
                                            description: "Live chat support is currently offline. Please send us an email!",
                                        });
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white px-8 h-14 rounded-xl font-bold transition-all"
                                >
                                    Live Chat Support
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
