import { useState, useEffect } from "react";
import { fetchPages } from "../api/pagesApi.js";

export default function useClients() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPages()
            .then((data) => setPages(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { pages, loading, error };
}
