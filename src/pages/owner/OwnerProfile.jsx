import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ShieldCheck, Lock, Upload, Camera, MapPin, Mail, Phone, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const OwnerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "Michael",
    lastName: "Johnson",
    company: "Johnson Properties LLC",
    email: "michael.j@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, Los Angeles, CA 90001",
    bio: "Experienced property owner with over 10 years in the real estate market. Specializing in luxury apartments and family homes."
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Profile Updated",
      description: "Business information has been successfully saved.",
    });
  };

  const handleUpdatePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your security credentials have been updated.",
    });
  };

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Owner Profile</h1>
          <p className="text-slate-500">Manage your profile and verification status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <Card className="lg:col-span-1 h-fit border-none shadow-sm">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <AvatarFallback className="text-2xl">MJ</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-9 w-9 bg-[#F59E0B] hover:bg-[#D97706] border-2 border-white shadow-sm"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <h2 className="text-xl font-bold text-slate-900">Michael Johnson</h2>
                <p className="text-sm text-slate-500 mb-2">Property Owner since 2023</p>
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none gap-1 px-3 py-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Owner
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
                  <MapPin className="h-4 w-4" />
                  <span>Los Angeles, CA</span>
                </div>

                <div className="w-full space-y-4 text-left border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>michael.j@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>+1 (555) 987-6543</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-slate-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-900">5</div>
                    <div className="text-xs text-slate-500">Properties Listed</div>
                  </div>
                  <div className="text-center border-l border-r border-slate-100">
                    <div className="text-lg font-bold text-slate-900">124</div>
                    <div className="text-xs text-slate-500">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1">
                      4.8 <Star className="w-3 h-3 text-[gold] fill-[gold]" />
                    </div>
                    <div className="text-xs text-slate-500">Average Rating</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Business Info */}
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Business Information</CardTitle>
              <CardDescription>Update your business and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-semibold text-slate-700">First Name</Label>
                  <Input id="firstName" value={profile.firstName} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-semibold text-slate-700">Last Name</Label>
                  <Input id="lastName" value={profile.lastName} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="font-semibold text-slate-700">Company Name (Optional)</Label>
                <Input id="company" value={profile.company} onChange={handleChange} className="bg-slate-50 border-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">Email Address</Label>
                  <Input id="email" type="email" value={profile.email} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold text-slate-700">Phone Number</Label>
                  <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-semibold text-slate-700">Business Address</Label>
                <Input id="address" value={profile.address} onChange={handleChange} className="bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-semibold text-slate-700">Bio / Description</Label>
                <Textarea id="bio" className="bg-slate-50 border-slate-200 min-h-[100px]" value={profile.bio} onChange={handleChange} />
              </div>

              <Button onClick={handleUpdateProfile} disabled={loading} className="bg-[#1E293B] hover:bg-[#0f172a] text-white px-6">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>

          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Verification Status */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-slate-500" />
                <CardTitle className=" text-lg font-bold text-slate-900">Verification Status</CardTitle>
              </div>
              <CardDescription>Complete verification to build trust with tenants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Identity Verification</p>
                    <p className="text-xs text-slate-500">Government-issued ID verified</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone Verification</p>
                    <p className="text-xs text-slate-500">Phone number confirmed</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Business License</p>
                    <p className="text-xs text-slate-500">Upload your business license</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-3 w-3" /> Upload
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-slate-500" />
                <CardTitle className="text-lg font-bold text-slate-900">Security</CardTitle>
              </div>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPass" className="font-semibold text-slate-700">Current Password</Label>
                <Input id="currentPass" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPass" className="font-semibold text-slate-700">New Password</Label>
                <Input id="newPass" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPass" className="font-semibold text-slate-700">Confirm Password</Label>
                <Input id="confirmPass" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
              <Button onClick={handleUpdatePassword} className="w-full bg-[#1E293B] hover:bg-[#0f172a] text-white mt-2">
                Update Password
              </Button>

            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default OwnerProfile;