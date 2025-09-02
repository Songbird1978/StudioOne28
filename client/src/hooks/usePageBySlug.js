import { useEffect, useState } from "react";
import { fetchPages } from "../api/pagesApi.js";

export default function usePagebySlug() {
    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPages()
            .then((data) => {
                setPage(data.data);
                console.log("fetched page data", JSON.stringify(data, null, 2));
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { page, loading, error };
}
