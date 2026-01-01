import { Link } from "react-router-dom";
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (platform) => (e) => {
    e.preventDefault();
    toast({
      title: `Connecting to ${platform}`,
      description: "Our social media pages will be available soon!",
    });
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">SaKiNe</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in finding the perfect rental property. We connect tenants with verified property owners.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={handleSocialClick(social.label)}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A351] hover:text-white transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Properties", href: "/properties" },
                { label: "Agents", href: "/agents" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-white/70 hover:text-[#D4A351] transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Property Owners */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Owners</h4>
            <ul className="space-y-3">
              {[
                { label: "List Your Property", href: "/owner/properties/add" },
                { label: "Owner Dashboard", href: "/owner/dashboard" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQs", href: "/faq" }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-white/70 hover:text-[#D4A351] transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-[#D4A351]" />
                <span>123 Business District, City, Country</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#D4A351]" />
                <span>support@sakine.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#D4A351]" />
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2024 SaKiNe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
