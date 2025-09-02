import { useState, useEffect } from "react";
import { fetchAudioByCategory } from "../api/audioApi";

export default function useAudioByCategory(category) {
    const [audioFiles, setAudioFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) return;

        fetchAudioByCategory(category)
            .then((data) => setAudioFiles(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [category]);

    return { audioFiles, loading, error };
}
