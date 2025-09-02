const API_URL = process.env.REACT_APP_API_URL;
// api/galleriesApi.js
export async function fetchGalleries() {
    const query = [
        "fields=id,slug,galleryName,galleryCategory",
        "populate[gallery][fields]=url,name,alternativeText,caption,formats",
    ].join("&");

    const url = `${API_URL}/api/galleries?pagination[pageSize]=100&${query}`;

    const galleryResponse = await fetch(url);
    if (!galleryResponse.ok) {
        throw new Error("Failed to fetch galleries");
    }
    const data = await galleryResponse.json();
    //console.log('gallery data from galleries', data.data);
    return data.data;
}
