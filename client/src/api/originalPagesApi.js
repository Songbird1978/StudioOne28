//import { buildPopulateQueryManual } from './populateHelper.js';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchPages(slug) {
    const url =
        `${API_URL}/api/pages` +
        `?populate[image]=*` +
        `&populate[contentBlocks][populate]=*&populate=image`;
    //+ `&populate[contentBlocks][on][media.gallery-preview-repeatable][populate][galleryPreview][populate]=image`;

    const pagesResponse = await fetch(url);

    //?populate[contentBlocks][populate]=*&populate=image
    //?populate[contentBlocks][populate]=*&[galleryPreview][populate]=image
    //?populate[contentBlocks][populate]=*&populate[contentBlocks][populate][galleryPreview][populate]=*
    //?populate[contentBlocks][populate][galleryPreview][populate][galleryPreview][populate]=image

    if (!pagesResponse.ok) {
        throw new Error("Failed to fetch page", slug);
    }
    const data = await pagesResponse.json();
    //console.log('Raw API response for pages with slug filter:', data.data);
    return data.data;
}
