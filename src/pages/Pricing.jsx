import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            description: "Perfect for individual owners listing single properties.",
            features: [
                "Up to 2 property listings",
                "Basic analytics",
                "Standard customer support",
                "5 high-quality images per property",
                "Verified owner badge"
            ],
            buttonText: "Get Started",
            popular: false
        },
        {
            name: "Professional",
            price: "$49",
            period: "/month",
            description: "Ideal for landlords with a growing portfolio.",
            features: [
                "Up to 15 property listings",
                "Advanced insight analytics",
                "Priority email support",
                "20 images per property",
                "Featured listing placement",
                "Automated booking management",
                "Tenant screening tools"
            ],
            buttonText: "Start Free Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "$149",
            period: "/month",
            description: "For real estate agencies and large property managers.",
            features: [
                "Unlimited property listings",
                "Full analytics suite",
                "24/7 dedicated support",
                "Unlimited professional images",
                "Multi-user agent accounts",
                "Custom branding on listings",
                "API access & integrations",
                "Premium spotlight placements"
            ],
            buttonText: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-16">
                {/* Hero */}
                <section className="py-24 bg-[#F5F2EC] text-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1C1C1C] mb-6">
                                Transparent Pricing for <span className="text-[#D4A351]">Every Property Owner</span>
                            </h1>
                            <p className="text-[#666666] text-lg leading-relaxed">
                                Choose the plan that best fits your needs. No hidden fees, cancel anytime.
                                Join 8,000+ satisfied property owners today.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Plans */}
                <section className="py-24 bg-white -mt-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative p-10 rounded-[2.5rem] border ${plan.popular
                                        ? "bg-[#0F172A] text-white border-[#D4A351] shadow-2xl scale-105 z-10"

                                        : "bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#D4A351]/50 shadow-sm"
                                        } transition-all flex flex-col`}
                                >
                                    {plan.popular && (
                                        <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4A351] hover:bg-[#D4A351] text-white px-4 py-1.5 rounded-full border-0">
                                            Most Popular
                                        </Badge>
                                    )}

                                    <div className="mb-8">
                                        <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-[#1C1C1C]"}`}>
                                            {plan.name}
                                        </h3>
                                        <p className={`${plan.popular ? "text-white/70" : "text-[#666666]"}`}>
                                            {plan.description}
                                        </p>
                                    </div>

                                    <div className="mb-8 flex items-baseline gap-1">
                                        <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-[#1C1C1C]"}`}>
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className={`${plan.popular ? "text-white/60" : "text-[#666666]"}`}>
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? "bg-[#D4A351] text-white" : "bg-[#F5F2EC] text-[#D4A351]"
                                                    }`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className={`text-sm ${plan.popular ? "text-white/80" : "text-[#666666]"}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className={`w-full h-14 rounded-xl font-bold text-lg ${plan.popular
                                        ? "bg-[#D4A351] hover:bg-[#C29241] text-white"
                                        : "bg-[#1C1C1C] hover:bg-black text-white"
                                        }`} asChild>
                                        <Link to={plan.name === "Enterprise" ? "/contact?subject=Enterprise Plan Inquiry" : `/register?role=owner&plan=${plan.name.toLowerCase()}`}>
                                            {plan.buttonText}
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Preview */}
                <section className="py-24 bg-[#F5F2EC]">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <HelpCircle className="w-12 h-12 text-[#D4A351] mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-[#1C1C1C] mb-4 font-serif">Frequently Asked Questions</h2>
                            <p className="text-[#666666] mb-8">
                                Have more questions about our plans or services? Visit our full FAQ page for more detailed information.
                            </p>
                            <Button variant="outline" className="border-[#D4A351] text-[#D4A351] hover:bg-[#D4A351] hover:text-white px-8 h-12 rounded-xl" asChild>
                                <Link to="/faq">Browse All FAQs</Link>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
