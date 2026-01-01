import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { toast } = useToast();

    // Load favorites from localStorage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem("sakine_favorites");
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("sakine_favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (property) => {
        const isExist = favorites.find((fav) => fav.id === property.id);
        if (isExist) {
            setFavorites(favorites.filter((fav) => fav.id !== property.id));
            toast({
                title: "Removed from favorites",
                description: `${property.title} has been removed from your favorites.`,
            });
        } else {
            setFavorites([...favorites, property]);
            toast({
                title: "Added to favorites",
                description: `${property.title} has been added to your favorites.`,
            });
        }
    };

    const isFavorite = (id) => favorites.some((fav) => fav.id === id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
