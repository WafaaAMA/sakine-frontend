import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Home,
  Calendar,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const userNav = [
  { href: "/user/dashboard", label: "Dashboard", icon: Home },
  { href: "/user/bookings", label: "My Bookings", icon: Calendar },
  { href: "/user/favorites", label: "My Favorites", icon: Heart },
  { href: "/user/profile", label: "Profile", icon: User },
];


const ownerNav = [
  { href: "/owner/dashboard", label: "Dashboard", icon: Home },
  { href: "/owner/properties", label: "My Properties", icon: Building2 },
  { href: "/owner/bookings", label: "Bookings", icon: Calendar },
  { href: "/owner/profile", label: "Profile", icon: User },
];

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
];

const DashboardLayout = ({ children, role }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const nav = role === "user" ? userNav : role === "owner" ? ownerNav : adminNav;
  const title = role === "user" ? "Renter" : role === "owner" ? "Owner" : "Admin";

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 lg:w-20"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              {sidebarOpen && (
                <div>
                  <span className="font-bold text-foreground">SaKiNe</span>
                  <span className="text-xs text-muted-foreground block">{title} Portal</span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive(item.href)
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
              <Link to="/login">
                <LogOut className="w-5 h-5 mr-2" />
                {sidebarOpen && "Sign Out"}
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64 h-9 bg-muted/50 border-0" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
              </button>
              <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center">
                <span className="text-sm font-semibold text-accent-foreground">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;