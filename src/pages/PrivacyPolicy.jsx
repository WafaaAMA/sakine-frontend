import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-[#1C1C1C]">
            <Navbar />
            <main className="pt-28 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <header className="border-b border-slate-100 pb-10">
                            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Privacy Policy</h1>
                            <p className="text-[#666666]">Last Updated: December 2024</p>
                        </header>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">1. Introduction</h2>
                            <p className="text-[#666666] leading-relaxed">
                                At SaKiNe, we respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you as to how we look after your personal data when
                                you visit our website (regardless of where you visit it from) and tell you about your
                                privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">2. The Data We Collect</h2>
                            <p className="text-[#666666] leading-relaxed">
                                Personal data, or personal information, means any information about an individual
                                from which that person can be identified. We may collect, use, store and transfer
                                different kinds of personal data about you which we have grouped together as follows:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-[#666666]">
                                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                                <li><strong>Profile Data</strong> includes your username and password, bookings made by you, your interests, preferences, and feedback.</li>
                                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">3. How We Use Your Data</h2>
                            <p className="text-[#666666] leading-relaxed">
                                We will only use your personal data when the law allows us to. Most commonly,
                                we will use your personal data in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-[#666666]">
                                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal or regulatory obligation.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">4. Data Security</h2>
                            <p className="text-[#666666] leading-relaxed">
                                We have put in place appropriate security measures to prevent your personal data
                                from being accidentally lost, used or accessed in an unauthorized way, altered or
                                disclosed. In addition, we limit access to your personal data to those employees,
                                agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">5. Your Legal Rights</h2>
                            <p className="text-[#666666] leading-relaxed">
                                Under certain circumstances, you have rights under data protection laws in relation
                                to your personal data, including the right to receive a copy of the personal data
                                we hold about you and the right to make a complaint at any time to the relevant
                                data protection authority.
                            </p>
                        </section>

                        <footer className="pt-10 border-t border-slate-100">
                            <p className="text-[#666666]">
                                If you have any questions about this privacy policy, please contact us at
                                <a href="mailto:privacy@sakine.com" className="text-[#D4A351] font-bold ml-1">privacy@sakine.com</a>
                            </p>
                        </footer>
                    </motion.div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
