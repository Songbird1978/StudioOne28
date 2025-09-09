import { createContext } from "react";
import { cloudinaryUrl } from "./cloudinary";

// Optional: App-wide defaults
const DEFAULT_WIDTHS = {
    large: 1200,
    card: 600,
    thumbnail: 300,
};

export const getImageUrl = (url, type) =>
    cloudinaryUrl(url, DEFAULT_WIDTHS[type] || 800);

export const ImageContext = createContext({
    getImageUrl,
});
