const API_URL = process.env.REACT_APP_API_URL;

export async function fetchGalleryBySlug(slug) {
    const query = [
        "populate[gallery][fields]=name,alternativeText,caption,url,formats",
        "pagination[pageSize]=100",
    ].join("&");

    const url = `${API_URL}/api/galleries?filters[slug][$eq]=${slug}&${query}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to fetch gallery: ${slug}`);
    const data = await res.json();
    return data.data[0] || null;
}
