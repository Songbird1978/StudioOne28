//import { buildPopulateQueryManual } from './populateHelper.js';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchPages() {
    const query = [
        "populate[image][fields]=url,name,alternativeText, formats",
        "populate[contentBlocks][on][media.gallery-preview-repeatable][populate][galleryPreview][populate][image][fields]=url,name,alternativeText,formats",
        "populate[contentBlocks][on][navigation.repeatable-button]=*",
        "populate[contentBlocks][on][elements.table][populate][tableHeaders]=*",
        "populate[contentBlocks][on][elements.table][populate][tableRows]=*",
        "populate[contentBlocks][on][elements.repeatable-para][populate][paragraph]=*",
        "populate[contentBlocks][on][navigation.related-content][populate]=*",
    ].join("&");

    const url = `${API_URL}/api/pages?pagination[pageSize]=100&${query}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch pages");
    }

    const data = await response.json();
    return data.data;
}

/*
    
const components = [
  'media.gallery-preview-repeatable',
  'navigation.repeatable-button',
  'elements.table',
  'elements.repeatable-para',
];

const nestedPopulate = {
  image: '*', // top-level page image
  'media.gallery-preview-repeatable': {
    populate: {
      galleryPreview: {
        populate: {
          image: '*',
          gallery: '*',
          caption: '*',
          galleryUrl: true,
          title: true,
        },
      },
    },
  },
  'navigation.repeatable-button': '*',
  'elements.table': '*',
  'elements.repeatable-para': '*',
};
    
export async function fetchPages(slug) {
  const query = buildPopulateQueryManual(components, nestedPopulate);
  const url = `${API_URL}/api/pages?${query}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pages for slug ${slug}`);
  }

  const data = await response.json();
  console.log('Fetched pages raw:', data.data);

  return data.data;
}
  */
