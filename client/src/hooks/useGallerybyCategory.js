import { useState, useEffect } from "react";
import { fetchGalleryByCategory } from "../api/galleryApi";

export default function useGalleryByCategory(category) {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!folder) return;

        fetchGalleryByCategory(category)
            .then((data) => setGallery(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [folder]);

    return { gallery, loading, error };
}
