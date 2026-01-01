import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4A351]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F172A]/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-[12rem] md:text-[15rem] font-bold text-[#0F172A]/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#D4A351] rounded-3xl flex items-center justify-center shadow-xl rotate-12 animate-float">
              <Search className="w-12 h-12 md:w-16 md:h-16 text-white -rotate-12" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 font-serif">
            Lost in the <span className="text-[#D4A351]">Neighborhood?</span>
          </h2>
          <p className="text-[#666666] text-lg mb-10 max-w-md mx-auto leading-relaxed">
            It seems the property you're looking for has been moved or doesn't exist.
            Let's help you find your way back home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" className="h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-8 rounded-xl border-[#E5E5E5] text-[#1C1C1C] hover:bg-white font-bold">
              <Link to="/properties">
                <Search className="w-5 h-5 mr-2" />
                Explore Properties
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-[#E5E5E5]/50"
        >
          <button
            onClick={() => window.history.back()}
            className="text-[#888888] hover:text-[#1C1C1C] transition-colors flex items-center mx-auto text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Previous Page
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;