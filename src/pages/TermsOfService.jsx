import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const TermsOfService = () => {
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
                            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Terms of Service</h1>
                            <p className="text-[#666666]">Last Updated: December 2024</p>
                        </header>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">1. Acceptance of Terms</h2>
                            <p className="text-[#666666] leading-relaxed">
                                By accessing and using SaKiNe, you agree to be bound by these Terms of Service
                                and all applicable laws and regulations. If you do not agree with any of these
                                terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">2. Use License</h2>
                            <p className="text-[#666666] leading-relaxed">
                                Permission is granted to temporarily download one copy of the materials (information or software)
                                on SaKiNe's website for personal, non-commercial transitory viewing only.
                            </p>
                            <p className="text-[#666666] leading-relaxed">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <ul className="list-disc pl-6 space-y-3 text-[#666666]">
                                <li>Modify or copy the materials.</li>
                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                                <li>Attempt to decompile or reverse engineer any software contained on SaKiNe's website.</li>
                                <li>Remove any copyright or other proprietary notations from the materials.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">3. Disclaimer</h2>
                            <p className="text-[#666666] leading-relaxed">
                                The materials on SaKiNe's website are provided on an 'as is' basis. SaKiNe makes
                                no warranties, expressed or implied, and hereby disclaims and negates all other
                                warranties including, without limitation, implied warranties or conditions of
                                merchantability, fitness for a particular purpose, or non-infringement of
                                intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">4. Limitations</h2>
                            <p className="text-[#666666] leading-relaxed">
                                In no event shall SaKiNe or its suppliers be liable for any damages (including,
                                without limitation, damages for loss of data or profit, or due to business
                                interruption) arising out of the use or inability to use the materials on
                                SaKiNe's website.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">5. Property Listings</h2>
                            <p className="text-[#666666] leading-relaxed">
                                SaKiNe does not guarantee the accuracy, completeness, or timeliness of any property
                                listings. Users are responsible for verifying all information before entering into
                                any rental agreements.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold font-serif">6. Governing Law</h2>
                            <p className="text-[#666666] leading-relaxed">
                                These terms and conditions are governed by and construed in accordance with the
                                laws of the jurisdiction in which SaKiNe operates and you irrevocably submit to
                                the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>

                        <footer className="pt-10 border-t border-slate-100">
                            <p className="text-[#666666]">
                                For any questions regarding these terms, please contact us at
                                <a href="mailto:legal@sakine.com" className="text-[#D4A351] font-bold ml-1">legal@sakine.com</a>
                            </p>
                        </footer>
                    </motion.div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
