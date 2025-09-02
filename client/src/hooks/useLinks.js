import { useState, useEffect } from "react";
import { fetchLinks } from "../api/linksApi.js";

export default function useLinks() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLinks()
            .then((data) => setLinks(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { links, loading, error };
}
