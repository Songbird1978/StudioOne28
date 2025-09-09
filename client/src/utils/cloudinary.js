const cloudName = "dbrcftp5l"; // 🔴 Replace with your Cloudinary cloud name
const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;

export function cloudinaryUrl(url, width = 800, options = "") {
    if (!url) return null;

    // Extract public ID by removing domain and version prefix
    // e.g. https://res.cloudinary.com/<cloud>/image/upload/v1699999999/folder/image.jpg
    const parts = url.split("/upload/");
    if (parts.length < 2) return url; // fallback to original

    let pathAndFilename = parts[1];
    // Remove version prefix if present
    pathAndFilename = pathAndFilename.replace(/^v\d+\//, "");

    // Build optimized URL
    let transform = `f_auto,q_auto,w_${width}`;
    if (options) transform += `,${options}`;

    return `${baseUrl}${transform}/${pathAndFilename}`;
}
