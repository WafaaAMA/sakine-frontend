import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserBookings from "./pages/user/UserBookings";
import UserFavorites from "./pages/user/UserFavorites";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

import OwnerProfile from "./pages/owner/OwnerProfile";
import OwnerProperties from "./pages/owner/OwnerProperties";
import OwnerAddProperty from "./pages/owner/OwnerAddProperty";
import OwnerEditProperty from "./pages/owner/OwnerEditProperty";
import OwnerBookings from "./pages/owner/OwnerBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminBookings from "./pages/admin/AdminBookings";
import NotFound from "./pages/NotFound";
import Agents from "./pages/Agents";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BlogDetail from "./pages/BlogDetail";
import AgentDetail from "./pages/AgentDetail";



import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/layout/PageTransition";
import { FavoritesProvider } from "./context/FavoritesContext";


const queryClient = new QueryClient();

import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/properties" element={<PageTransition><Properties /></PageTransition>} />
        <Route path="/property/:id" element={<PageTransition><PropertyDetail /></PageTransition>} />
        <Route path="/agents" element={<PageTransition><Agents /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/agent/:id" element={<PageTransition><AgentDetail /></PageTransition>} />

        <Route path="/user/dashboard" element={<PageTransition><UserDashboard /></PageTransition>} />
        <Route path="/user/profile" element={<PageTransition><UserProfile /></PageTransition>} />
        <Route path="/user/bookings" element={<PageTransition><UserBookings /></PageTransition>} />
        <Route path="/user/favorites" element={<PageTransition><UserFavorites /></PageTransition>} />
        <Route path="/owner/dashboard" element={<PageTransition><OwnerDashboard /></PageTransition>} />
        <Route path="/owner/profile" element={<PageTransition><OwnerProfile /></PageTransition>} />
        <Route path="/owner/properties" element={<PageTransition><OwnerProperties /></PageTransition>} />
        <Route path="/owner/properties/add" element={<PageTransition><OwnerAddProperty /></PageTransition>} />
        <Route path="/owner/properties/edit/:id" element={<PageTransition><OwnerEditProperty /></PageTransition>} />
        <Route path="/owner/bookings" element={<PageTransition><OwnerBookings /></PageTransition>} />
        <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/admin/users" element={<PageTransition><AdminUsers /></PageTransition>} />
        <Route path="/admin/properties" element={<PageTransition><AdminProperties /></PageTransition>} />
        <Route path="/admin/bookings" element={<PageTransition><AdminBookings /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>

        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
