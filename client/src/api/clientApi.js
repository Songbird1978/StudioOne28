const API_URL = process.env.REACT_APP_API_URL;
// api/clientApi.js
export async function fetchClient() {
    const clientResponse = await fetch(`${API_URL}/api/clients?populate=*`);
    if (!clientResponse.ok) {
        throw new Error("Failed to fetch client");
    }
    return clientResponse.json();
}
