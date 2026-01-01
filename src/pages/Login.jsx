import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultRole = searchParams.get("role") || "renter";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(defaultRole === "user" ? "renter" : defaultRole);

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate based on role for demonstration
    if (role === 'owner') navigate('/owner/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-24 pb-16 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-[450px] mx-auto">
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl">

              {/* Tabs */}
              <Tabs defaultValue={role} onValueChange={setRole} className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 rounded-lg h-auto">
                  <TabsTrigger
                    value="renter"
                    className="py-2.5 rounded-md text-slate-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all"
                  >
                    Renter
                  </TabsTrigger>
                  <TabsTrigger
                    value="owner"
                    className="py-2.5 rounded-md text-slate-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all"
                  >
                    Owner
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="py-2.5 rounded-md text-slate-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all"
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form className="space-y-6" onSubmit={handleLogin}>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-900 font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-900 font-semibold">Password</Label>
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({ title: "Forgot Password", description: "Password reset link will be sent to your email soon." });
                      }}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Forgot password?
                    </Link>

                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 pr-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <Button className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-slate-500 font-medium tracking-wider">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl"
                  onClick={() => toast({ title: "Google Login", description: "Google authentication is coming soon!" })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">

                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl"
                  onClick={() => toast({ title: "GitHub Login", description: "GitHub authentication is coming soon!" })}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center mt-8 text-slate-500 text-sm">
                Don't have an account?{" "}
                <Link to={`/register?role=${role === 'renter' ? 'user' : role}`} className="text-orange-500 font-semibold hover:text-orange-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;