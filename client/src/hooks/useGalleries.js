import { useState, useEffect } from "react";
import { fetchGalleries } from "../api/galleriesApi";

export default function useGalleries() {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGalleries()
            .then((data) => setGalleries(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { galleries, loading, error };
}
