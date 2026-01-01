import { ArrowRight, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Renters */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 md:p-10">
            <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Looking for a Home?
            </h3>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Browse thousands of verified rental properties. Find your perfect home with our smart search tools and connect directly with trusted owners.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/properties">
                Browse Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* For Owners */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 md:p-10">
            <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Own a Property?
            </h3>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              List your property for free and connect with verified tenants. Our platform handles everything from booking to commission management.
            </p>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/register?role=owner">
                List Your Property
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;