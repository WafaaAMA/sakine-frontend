import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const articles = [

    {
        id: 1,
        tag: "Renting Guide",
        date: "Dec 15, 2024",
        author: "Emma Watson",
        title: "10 Tips for First-Time Renters",
        content: `
            Renting your first apartment is an exciting milestone, but it can also be overwhelming if you're not prepared. 
            From understanding lease agreements to budgeting for hidden costs, there's a lot to consider. 
            Here are 10 essential tips to help you navigate your first rental experience with confidence.

            1. Determine Your Budget: Before you start looking, calculate how much you can realistically afford. 
            A common rule of thumb is that your rent shouldn't exceed 30% of your gross monthly income.

            2. Check Your Credit Score: Landlords often run credit checks. Knowing your score beforehand 
            allowed you to address any issues or prepare explanations.

            3. Read the Fine Print: Never sign a lease without reading it thoroughly. Pay attention to 
            policies on pets, deposits, and maintenance responsibilities.

            4. Inspect the Property: During the tour, check for any damages, test appliances, and ensure 
            all utilities are working correctly.

            5. Understand the Neighborhood: Spend some time in the area at different times of the day to 
            get a feel for the noise levels, safety, and amenities.
        `,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        tag: "Market Insights",
        date: "Dec 10, 2024",
        author: "James Bond",
        title: "Real Estate Rental Trends 2025",
        content: "Detailed insights into the upcoming rental market trends...",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        tag: "Owner Tips",
        date: "Dec 5, 2024",
        author: "Sarah Mitchell",
        title: "Preparing Your Property for Rent",
        content: "How to make your property appeal to the best tenants...",
        image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop",
    },
];

const BlogDetail = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const article = articles.find(a => a.id === parseInt(id)) || articles[0];

    return (
        <div className="min-h-screen bg-background text-[#1C1C1C]">
            <Navbar />
            <main className="pt-28 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Breadcrumbs / Back */}
                        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-[#888888] hover:text-[#D4A351] transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>

                        {/* Title & Metadata */}
                        <div className="space-y-6 text-center md:text-left">
                            <Badge className="bg-[#F5F2EC] text-[#D4A351] hover:bg-[#F5F2EC] px-4 py-1.5 rounded-full border-0 font-bold uppercase tracking-widest text-[0.6rem]">
                                {article.tag}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[#888888] text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center overflow-hidden">
                                        <User className="w-5 h-5 text-[#D4A351]" />
                                    </div>
                                    <span className="font-bold text-[#1C1C1C]">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {article.date}
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center justify-center gap-4 py-6 border-y border-slate-100">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#888888]">Share This:</span>
                            {[
                                { icon: Facebook, color: "hover:text-blue-600", label: "Facebook" },
                                { icon: Twitter, color: "hover:text-sky-500", label: "Twitter" },
                                { icon: Linkedin, color: "hover:text-blue-700", label: "LinkedIn" },
                                { icon: Share2, color: "hover:text-[#D4A351]", label: "Link" }
                            ].map((social, idx) => (
                                <button
                                    key={idx}
                                    className={`text-[#BBBBBB] transition-colors ${social.color}`}
                                    onClick={() => {
                                        if (social.label === "Link") {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast({
                                                title: "Link Copied!",
                                                description: "Article link has been copied to clipboard.",
                                            });
                                        } else {
                                            toast({
                                                title: `Sharing to ${social.label}`,
                                                description: "Opening share dialog...",
                                            });
                                        }
                                    }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate prose-lg max-w-none">
                            <div className="text-lg text-[#666666] leading-relaxed whitespace-pre-line font-medium">
                                {article.content}
                            </div>
                        </div>

                        {/* Newsletter CTA */}
                        <div className="bg-[#F5F2EC] rounded-[2rem] p-8 md:p-12 mt-16 text-center">
                            <h3 className="text-2xl font-bold font-serif mb-4">Enjoyed this article?</h3>
                            <p className="text-[#666666] mb-8 max-w-md mx-auto">
                                Subscribe to our newsletter and never miss our latest insights and property listings.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="bg-[#1C1C1C] hover:bg-black text-white px-8 h-12 rounded-xl"
                                    onClick={() => {
                                        toast({
                                            title: "Thank you for subscribing!",
                                            description: "You've been added to our mailing list.",
                                        });
                                    }}
                                >
                                    Subscribe Now
                                </Button>
                            </div>
                        </div>

                    </motion.div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default BlogDetail;
