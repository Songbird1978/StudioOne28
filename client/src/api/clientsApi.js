const API_URL = process.env.REACT_APP_API_URL;
// api/clientApi.js
export async function fetchClients() {
    const clientResponse = await fetch(
        `${API_URL}/api/audio-file?/composer?/populate=deep`
    );
    if (!clientResponse.ok) {
        throw new Error("Failed to fetch client");
    }
    return clientResponse.json();
}
