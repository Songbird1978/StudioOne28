const API_URL = process.env.REACT_APP_API_URL;
// api/linksApi.js
export async function fetchReviews() {
    const ReviewsResponse = await fetch(
        `${API_URL}/api/reviews?pagination[pageSize]=100&populate=*`
    );
    if (!ReviewsResponse.ok) {
        throw new Error("Failed to fetch reviews");
    }
    return ReviewsResponse.json();
}
