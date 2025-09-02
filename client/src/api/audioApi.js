const API_URL = process.env.REACT_APP_API_URL;
// api/audioApi.js
export async function fetchAudio() {
    const audioResponse = await fetch(
        `${API_URL}/api/audio-files?pagination[pageSize]=100&populate=*`
    );
    if (!audioResponse.ok) {
        throw new Error("Failed to fetch audio");
    }
    return audioResponse.json();
}
