import DashboardLayout from "@/components/layout/DashboardLayout";
import { useFavorites } from "@/context/FavoritesContext";
import PropertyCard from "@/components/properties/PropertyCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserFavorites = () => {
    const { favorites } = useFavorites();

    return (
        <DashboardLayout role="user">
            <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900">My Favorites</h1>
                    <p className="text-slate-500">Properties you've loved and saved for later</p>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((property) => (
                            <PropertyCard key={property.id} {...property} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">No favorites yet</h2>
                        <p className="text-slate-500 mb-8 max-w-sm text-center">
                            Explore our wide range of properties and click the heart icon to save your favorites here.
                        </p>
                        <Button asChild className="bg-[#D4A351] hover:bg-[#C29241] text-white px-8 h-12 rounded-xl font-semibold">
                            <Link to="/properties">Explore Properties</Link>
                        </Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserFavorites;
