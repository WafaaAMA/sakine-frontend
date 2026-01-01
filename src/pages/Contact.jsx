import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const Contact = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({
            title: "Message Sent!",
            description: "We've received your message and will get back to you soon.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <section className="py-24 bg-[#F5F2EC]">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full lg:w-2/5 space-y-8"
                            >
                                <div>
                                    <span className="text-[#D4A351] font-medium text-sm uppercase tracking-wider">
                                        Contact Us
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mt-4 mb-6">
                                        Let's Talk About Your New Home
                                    </h1>
                                    <p className="text-[#666666] text-lg leading-relaxed">
                                        Have questions about a property or our services? Our team is here to help you every step of the way.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-transparent hover:border-[#D4A351] transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] flex items-center justify-center group-hover:bg-[#D4A351] transition-colors">
                                            <Mail className="w-5 h-5 text-[#D4A351] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#888888]">Email Us</p>
                                            <p className="text-lg font-bold text-[#1C1C1C]">hello@sakine.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-transparent hover:border-[#D4A351] transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] flex items-center justify-center group-hover:bg-[#D4A351] transition-colors">
                                            <Phone className="w-5 h-5 text-[#D4A351] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#888888]">Call Us</p>
                                            <p className="text-lg font-bold text-[#1C1C1C]">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-transparent hover:border-[#D4A351] transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] flex items-center justify-center group-hover:bg-[#D4A351] transition-colors">
                                            <MapPin className="w-5 h-5 text-[#D4A351] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#888888]">Visit Us</p>
                                            <p className="text-lg font-bold text-[#1C1C1C]">123 Real Estate St, New York</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full lg:w-3/5"
                            >
                                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#E5E5E5]">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-bold text-[#1C1C1C]">Full Name</label>
                                                <Input id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="h-14 border-[#E5E5E5] focus-visible:ring-[#D4A351] rounded-xl" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-bold text-[#1C1C1C]">Email Address</label>
                                                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="h-14 border-[#E5E5E5] focus-visible:ring-[#D4A351] rounded-xl" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-bold text-[#1C1C1C]">Subject</label>
                                            <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="What is this regarding?" className="h-14 border-[#E5E5E5] focus-visible:ring-[#D4A351] rounded-xl" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-bold text-[#1C1C1C]">Message</label>
                                            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="How can we help?" className="min-h-[160px] border-[#E5E5E5] focus-visible:ring-[#D4A351] rounded-xl" required />
                                        </div>
                                        <Button type="submit" disabled={loading} className="w-full h-14 bg-[#D4A351] hover:bg-[#C29241] text-white font-bold rounded-xl text-lg">
                                            {loading ? "Sending..." : "Send Message"}
                                            {!loading && <Send className="w-5 h-5 ml-2" />}
                                        </Button>
                                    </form>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
