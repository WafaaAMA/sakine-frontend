import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Building2, Users, Trophy, Target, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const About = () => {
    const stats = [
        { label: "Years Experience", value: "12+" },
        { label: "Properties Managed", value: "5000+" },
        { label: "Happy Clients", value: "10k+" },
        { label: "Total Agents", value: "50+" },
    ];

    const values = [
        {
            title: "Trust & Transparency",
            description: "We believe in honest communication and transparent transactions for all our clients.",
            icon: CheckCircle2
        },
        {
            title: "Expert Guidance",
            description: "Our team of seasoned professionals provides expert advice to help you make informed decisions.",
            icon: Target
        },
        {
            title: "Customer Centric",
            description: "Your needs are our priority. We strive to provide personalized service that exceeds expectations.",
            icon: Users
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-16">
                {/* Hero section */}
                <section className="relative py-24 overflow-hidden bg-[#0F172A]">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[#D4A351] font-semibold uppercase tracking-widest text-sm mb-4 block"
                            >
                                Our Journey
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif"
                            >
                                Redefining the Way You Find <span className="text-[#D4A351]">Your Perfect Home</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/80 text-lg md:text-xl leading-relaxed mb-8"
                            >
                                Since 2012, SaKiNe has been at the forefront of the real estate industry,
                                combining innovation with traditional values to provide an unparalleled property search experience.
                            </motion.p>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                        <img src={heroImage} alt="About Us" className="w-full h-full object-cover opacity-20 contrast-125" />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0F172A] to-[#0F172A]" />
                    </div>
                </section>

                {/* Stats section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-8 rounded-2xl bg-[#F5F2EC] border border-transparent hover:border-[#D4A351] transition-all"
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-2">{stat.value}</div>
                                    <div className="text-[#666666] font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 bg-[#F5F2EC]">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2 relative">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                                        alt="Our Office"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#D4A351] rounded-3xl -z-10" />
                            </div>
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-6 font-serif">Our Mission</h2>
                                    <p className="text-[#666666] text-lg leading-relaxed">
                                        To simplify the real estate experience through cutting-edge technology and human-centric service,
                                        making the dream of finding a perfect home accessible to everyone. We aim to build a platform where
                                        trust is the foundation of every transaction.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        <Trophy className="w-8 h-8 text-[#D4A351] mb-4" />
                                        <h3 className="font-bold text-lg mb-2">Award Winning</h3>
                                        <p className="text-sm text-[#666666]">Recognized as the best real estate platform for 3 consecutive years.</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        <Building2 className="w-8 h-8 text-[#D4A351] mb-4" />
                                        <h3 className="font-bold text-lg mb-2">Wide Network</h3>
                                        <p className="text-sm text-[#666666]">Connecting you to properties in over 50 cities nationwide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-6 font-serif">The Values That Drive Us</h2>
                            <p className="text-[#666666] text-lg">
                                Our values define who we are and how we work. They are the compass that guides us in delivering
                                excellence to our clients every single day.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-10 rounded-[2rem] bg-[#F5F2EC] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-[#D4A351]/20 group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-[#D4A351] transition-colors">
                                        <value.icon className="w-8 h-8 text-[#D4A351] group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1C1C1C] mb-4">{value.title}</h3>
                                    <p className="text-[#666666] leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
