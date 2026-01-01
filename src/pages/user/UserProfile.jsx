import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, Phone, MapPin, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001"
  });
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleEditProfile = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved.",
    });
  };


  return (
    <DashboardLayout role="user">
      <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and account settings</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Card */}
          <Card className="lg:col-span-1 h-fit shadow-sm border-slate-200">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-9 w-9 bg-[#F59E0B] hover:bg-[#D97706] border-2 border-white shadow-sm"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
                <p className="text-sm text-slate-500 mb-4">Member since Jan 2024</p>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
                  <MapPin className="h-4 w-4" />
                  <span>New York, USA</span>
                </div>

                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Personal Info */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Personal Information</CardTitle>
              <CardDescription>Update your personal details here</CardDescription>
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
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">Email Address</Label>
                  <Input id="email" type="email" value={profile.email} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold text-slate-700">Phone Number</Label>
                  <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} className="bg-slate-50 border-slate-200" />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <Label htmlFor="address" className="font-semibold text-slate-700">Address</Label>
                <Input id="address" value={profile.address} onChange={handleChange} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="mt-8">
                <Button
                  className="bg-slate-900 text-white px-8"
                  onClick={handleEditProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Change Password Section */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-slate-500" />
              <CardTitle className="text-xl font-bold text-slate-900">Change Password</CardTitle>
            </div>
            <CardDescription>Ensure your account stays secure by updating your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="font-semibold text-slate-700">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="font-semibold text-slate-700">New Password</Label>
                <Input id="newPassword" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-semibold text-slate-700">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="........" className="bg-slate-50 border-slate-200" />
              </div>
            </div>

            <Button onClick={handleUpdatePassword} className="bg-[#1E293B] hover:bg-[#0f172a] text-white px-6">
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;