import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Building2, LogIn, LogOut, Users, Briefcase, FileText, Send, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Mock user and notifications
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Setting to true to show notifications for demo
  const notifications = [
    { id: 1, title: "New Message", description: "You have a new message from Sarah.", time: "2m ago" },
    { id: 2, title: "Booking Confirmed", description: "Your booking for Scandinavian Apt is confirmed.", time: "1h ago" },
    { id: 3, title: "Price Drop", description: "A property in your favorites has a price drop!", time: "5h ago" },
  ];

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "Properties", icon: Building2 },
    { href: "/agents", label: "Agents", icon: Users },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/contact", label: "Contact", icon: Send },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
  };



  // Removed TypeScript type annotation ': string'
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SaKiNe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${isActive(link.href)
                  ? "text-[#D4A351]"
                  : "text-[#666666] hover:text-[#1C1C1C]"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4A351] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth & Notifications Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn && (
              <div className="relative mr-2">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-muted transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-[#666666] hover:text-[#1C1C1C]" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-[#E5E5E5] rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-[#F5F2EC] flex items-center justify-between">
                        <h4 className="font-bold text-[#1C1C1C]">Notifications</h4>
                        <span className="text-xs text-[#D4A351] font-semibold cursor-pointer">Mark all as read</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className="p-4 border-b border-[#F5F2EC] last:border-0 hover:bg-[#F5F2EC]/30 transition-colors cursor-pointer">
                            <h5 className="text-sm font-bold text-[#1C1C1C] mb-1">{notif.title}</h5>
                            <p className="text-xs text-[#666666] mb-2">{notif.description}</p>
                            <span className="text-[10px] text-[#888888] font-medium">{notif.time}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-[#F5F2EC]/50 text-center">
                        <button className="text-xs font-bold text-[#1C1C1C] hover:text-[#D4A351] transition-colors">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/user/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden py-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(link.href)
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border my-2" />
                {isLoggedIn && (
                  <div className="px-4 py-2 border-b border-border">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="flex items-center justify-between w-full py-2 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Notifications</span>
                      </div>
                      <Badge variant="secondary" className="bg-[#F5F2EC] text-[#D4A351] border-0">
                        {notifications.length}
                      </Badge>
                    </button>

                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-2 space-y-2"
                        >
                          {notifications.map(notif => (
                            <div key={notif.id} className="p-3 bg-muted/30 rounded-xl">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="text-xs font-bold text-foreground">{notif.title}</h5>
                                <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-tight">{notif.description}</p>
                            </div>
                          ))}
                          <button className="w-full py-2 text-xs font-bold text-[#D4A351] hover:underline">
                            View All Notifications
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted"
                    >
                      <LogIn className="w-5 h-5" />
                      Login
                    </Link>
                    <Button variant="hero" className="mx-4 mt-2" asChild>
                      <Link to="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/user/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted"
                    >
                      <Building2 className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </nav>
  );
};

export default Navbar;