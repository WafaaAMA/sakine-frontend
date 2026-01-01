import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import property1 from "@/assets/property-1.jpg";

const OwnerEditProperty = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        description: "",
    });

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setFormData({
                title: "Modern Downtown Apartment",
                type: "apartment",
                price: "2500",
                location: "Manhattan, New York",
                bedrooms: "3",
                bathrooms: "2",
                area: "1200",
                description: "A beautiful apartment in the heart of the city with amazing views and modern amenities.",
            });
            setLoadingData(false);
        }, 1000);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Property Updated",
                description: "Property details have been successfully updated.",
            });
            navigate("/owner/properties");
        }, 1500);
    };

    if (loadingData) {
        return (
            <DashboardLayout role="owner">
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="owner">
            <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/owner/properties">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Property</h1>
                        <p className="text-slate-500 text-sm">Update property details</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Property Information</CardTitle>
                                <CardDescription>Basic details about your property</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Property Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Property Type</Label>
                                        <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="apartment">Apartment</SelectItem>
                                                <SelectItem value="house">House</SelectItem>
                                                <SelectItem value="studio">Studio</SelectItem>
                                                <SelectItem value="villa">Villa</SelectItem>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price">Monthly Rent ($)</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        className="min-h-[120px]"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Features & Amenities</CardTitle>
                                <CardDescription>Property specifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bedrooms">Bedrooms</Label>
                                        <Input
                                            id="bedrooms"
                                            name="bedrooms"
                                            type="number"
                                            value={formData.bedrooms}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bathrooms">Bathrooms</Label>
                                        <Input
                                            id="bathrooms"
                                            name="bathrooms"
                                            type="number"
                                            value={formData.bathrooms}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="area">Area (sqft)</Label>
                                        <Input
                                            id="area"
                                            name="area"
                                            type="number"
                                            value={formData.area}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Media & Actions */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle>Property Images</CardTitle>
                                <CardDescription>Manage your property photos</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="aspect-video relative rounded-lg overflow-hidden group">
                                        <img src={property1} alt="Property" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs">
                                            Change
                                        </div>
                                    </div>
                                    <div className="aspect-video rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-dashed border-slate-300">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                        <Upload className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <h4 className="font-medium text-slate-900 text-sm">Upload more photos</h4>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="bg-[#1E293B] hover:bg-[#0f172a] text-white w-full h-11" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                            <Button type="button" variant="outline" className="w-full h-11" onClick={() => navigate("/owner/properties")}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default OwnerEditProperty;
