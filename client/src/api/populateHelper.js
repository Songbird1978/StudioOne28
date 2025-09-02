/**
 * Builds a Strapi populate query string for page fetching.
 * @param {string[]} components - Array of component names to fully populate
 * @param {Object} nestedPopulate - Object describing nested populates per component.
 * @returns {string} Query string to append to Strapi API URL.
 */
export function buildPopulateQueryManual(
    components,
    nestedPopulate = {},
    prefix = ""
) {
    const parts = [];

    // Always include top-level populate for page image
    if (!prefix) {
        parts.push(`populate[image]=*`);
    }

    components.forEach((component) => {
        const populateObj = nestedPopulate[component];

        if (populateObj) {
            if (populateObj === "*") {
                parts.push(
                    `populate[${prefix}contentBlocks][on][${component}][populate]=*`
                );
            } else if (typeof populateObj === "object") {
                Object.entries(populateObj.populate || {}).forEach(
                    ([key, val]) => {
                        if (val === "*") {
                            parts.push(
                                `populate[${prefix}contentBlocks][on][${component}][populate][${key}]=*`
                            );
                        } else if (typeof val === "object") {
                            const child = buildPopulateQueryManual(
                                [],
                                val,
                                `${prefix}contentBlocks][on][${component}][populate][${key}][`
                            );
                            if (child) {
                                parts.push(child);
                            }
                        }
                    }
                );
            }
        } else {
            // default: just populate the component fully
            parts.push(
                `populate[${prefix}contentBlocks][on][${component}][populate]=*`
            );
        }
    });

    // Filter out empty parts so we never get &&
    return parts.filter(Boolean).join("&");
}
