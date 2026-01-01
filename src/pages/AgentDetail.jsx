import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Star, MapPin, Mail, Phone, Calendar, BadgeCheck, ArrowLeft, Facebook, Twitter, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import { useToast } from "@/hooks/use-toast";

const advisors = [
    {
        id: 1,
        name: "James Richardson",
        role: "Senior Agent",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
        rating: 4.9,
        reviews: 128,
        propertiesCount: 42,
        experience: "12 Years",
        email: "james.r@sakine.com",
        phone: "+1 (555) 123-4567",
        bio: "Specializing in premium residential properties across Manhattan, James brings over a decade of experience and deep market knowledge to every client interaction.",
        listings: [
            { id: 1, title: "Modern Scandinavian Apartment", price: 2500, location: "Downtown, Manhattan", image: property1 },
            { id: 2, title: "Industrial Loft with City View", price: 3200, location: "Brooklyn Heights", image: property2 }
        ]
    }
];

const AgentDetail = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const agent = advisors.find(a => a.id === parseInt(id)) || advisors[0];

    return (
        <div className="min-h-screen bg-background text-[#1C1C1C]">
            <Navbar />
            <main className="pt-28 pb-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Header / Back */}
                        <Link to="/agents" className="inline-flex items-center text-sm font-medium text-[#888888] hover:text-[#D4A351] transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to All Agents
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Left: Profile Card */}
                            <div className="lg:col-span-1 space-y-6">
                                <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white">
                                    <div className="aspect-[3/4] overflow-hidden">
                                        <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="text-center">
                                            <h1 className="text-3xl font-bold font-serif mb-2">{agent.name}</h1>
                                            <p className="text-[#D4A351] font-medium">{agent.role}</p>
                                        </div>
                                        <div className="flex items-center justify-around py-4 border-y border-slate-100">
                                            <div className="text-center">
                                                <div className="font-bold text-xl">{agent.rating}</div>
                                                <div className="text-xs text-[#888888] uppercase tracking-wider">Rating</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-xl">{agent.experience}</div>
                                                <div className="text-xs text-[#888888] uppercase tracking-wider">Experience</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-xl">{agent.propertiesCount}</div>
                                                <div className="text-xs text-[#888888] uppercase tracking-wider">Deals</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm text-[#666666]">
                                                <Mail className="w-4 h-4 text-[#D4A351]" />
                                                {agent.email}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-[#666666]">
                                                <Phone className="w-4 h-4 text-[#D4A351]" />
                                                {agent.phone}
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-4">
                                            {[
                                                { icon: Facebook, label: "Facebook" },
                                                { icon: Twitter, label: "Twitter" },
                                                { icon: Instagram, label: "Instagram" }
                                            ].map((social, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        toast({
                                                            title: `Connecting to ${social.label}`,
                                                            description: `Opening ${agent.name.split(' ')[0]}'s profile...`,
                                                        });
                                                    }}
                                                    className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#D4A351] hover:border-[#D4A351] transition-all"
                                                >
                                                    <social.icon className="w-4 h-4" />
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                </Card>
                            </div>

                            {/* Right: Info & Listings */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-[#F5F2EC] text-[#D4A351] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                        <BadgeCheck className="w-4 h-4" /> Professional Profile
                                    </div>
                                    <h2 className="text-4xl font-bold font-serif tracking-tight">About {agent.name.split(' ')[0]}</h2>
                                    <p className="text-lg text-[#666666] leading-relaxed">
                                        {agent.bio}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 bg-[#F5F2EC] rounded-2xl flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-[#D4A351]" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-[#666666]">Available for Meetings</div>
                                                <div className="font-bold">Mon - Fri, 9AM - 6PM</div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-[#F5F2EC] rounded-2xl flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-[#D4A351]" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-[#666666]">Primary Location</div>
                                                <div className="font-bold">Manhattan, NY</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Listings Section */}
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold font-serif">Active Listings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {agent.listings.map((listing) => (
                                            <Link key={listing.id} to={`/property/${listing.id}`} className="block group h-full">
                                                <Card className="overflow-hidden border-0 shadow-lg rounded-3xl group h-full">
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#1C1C1C]">
                                                            ${listing.price}/mo
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-lg mb-1 group-hover:text-[#D4A351] transition-colors">{listing.title}</h4>
                                                        <div className="flex items-center text-xs text-[#888888] gap-1">
                                                            <MapPin className="w-3 h-3" /> {listing.location}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>

                                    <Button asChild className="w-full h-14 rounded-2xl border-2 border-[#D4A351] text-[#D4A351] bg-transparent hover:bg-[#D4A351] hover:text-white transition-all font-bold group">
                                        <Link to="/properties">
                                            View All My Properties
                                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                                <Star className="w-4 h-4 ml-2 fill-current" />
                                            </motion.span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AgentDetail;
