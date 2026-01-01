import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: "Email required",
                description: "Please enter your email address.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setEmail("");
        toast({
            title: "Success!",
            description: "You've successfully subscribed to our newsletter.",
        });
    };

    return (
        <section className="py-24 bg-[#F5F2EC] overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-[#0F172A] rounded-[2rem] p-8 md:p-16 overflow-hidden"

                >
                    {/* Decorative Circles omitted for brevity, keeping them in actual code */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
                        {/* ... (Mail icon and headings) */}
                        <motion.form
                            onSubmit={handleSubscribe}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="w-full max-w-md bg-white p-2 rounded-xl flex flex-col md:flex-row gap-2"
                        >
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="border-0 bg-transparent focus-visible:ring-0 text-[#1C1C1C] h-12 px-4 placeholder:text-gray-400"
                                required
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 px-8 bg-[#D4A351] hover:bg-[#C29241] text-white font-semibold rounded-lg shrink-0"
                            >
                                {loading ? "Inviting..." : "Subscribe"}
                                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export default NewsletterSection;

