const API_URL = process.env.REACT_APP_API_URL;
// api/audioByCategoryApi.js
export async function fetchAudioByCategory(category) {
    const response = await fetch(
        `${API_URL}/api/audio-files?populate=*&filters[category][$eq]=${category}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch audio files by category");
    }
    return response.json();
}
