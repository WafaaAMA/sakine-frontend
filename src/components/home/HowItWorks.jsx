import { Search, ShieldCheck, CalendarCheck, Key } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Search Properties",
    description: "Browse through our curated collection of verified rental properties across the city.",
    step: "01",
  },
  {
    icon: ShieldCheck,
    title: "Verify & Connect",
    description: "Connect with verified property owners and schedule viewings at your convenience.",
    step: "02",
  },
  {
    icon: CalendarCheck,
    title: "Book Your Stay",
    description: "Choose your rental period and book securely through our trusted platform.",
    step: "03",
  },
  {
    icon: Key,
    title: "Move In",
    description: "Complete the process and move into your new home with complete peace of mind.",
    step: "04",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Renting your dream home has never been easier. Follow these simple steps to get started.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A351] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D4A351]/10 transition-colors">
                  <step.icon className="w-8 h-8 text-[#D4A351]" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
