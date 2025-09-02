import { useState, useEffect } from "react";
import { fetchAudio } from "../api/audioApi";

export default function useAudio() {
    const [audio, setAudio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAudio()
            .then((data) => setAudio(data.data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { audio, loading, error };
}
