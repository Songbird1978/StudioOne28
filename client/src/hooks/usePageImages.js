import { useEffect, useState } from "react";
import { fetchPageBySlug } from "../api/pagesApi.js";

export default function usePageImageBySlug(slug) {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        fetchPageBySlug(slug)
            .then((data) => setPage(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [slug]);

    return { page, loading, error };
}
