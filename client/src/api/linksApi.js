const API_URL = process.env.REACT_APP_API_URL;
// api/linksApi.js
export async function fetchLinks() {
    const linkResponse = await fetch(`${API_URL}/api/links?populate=*`);
    if (!linkResponse.ok) {
        throw new Error("Failed to fetch links");
    }
    return linkResponse.json();
}
