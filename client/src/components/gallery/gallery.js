import React from "react";
import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import FullScreen from "./fullScreen.js";

function Gallery({ gallery }) {
    //const API_URL = process.env.REACT_APP_API_URL;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isOpen, setModalOpen] = useState(false);

    //console.log("gallery in gallery", gallery);

    // Track window size changes
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getBestImage = (image) => {
        if (windowWidth < 600 && image?.formats?.small)
            return image.formats.small.url;
        if (windowWidth < 1200 && image?.formats?.medium)
            return image.formats.medium.url;
        if (image?.formats?.large) return image.formats.large.url;

        return image.url;
    };

    // Sort images by height (tallest first) to help balance columns
    const sortedGallery = [...gallery].sort((a, b) => b.height - a.height);

    return (
        <>
            <ResponsiveMasonry
                columnsCountBreakPoints={{
                    350: 1, // phones
                    750: 2, // tablets
                    900: 3, // desktops
                }}
            >
                <Masonry
                    columnsCount={3}
                    gutter="10px"
                    className="masonryContainer"
                >
                    {sortedGallery.map((image) => {
                        const imagePath = getBestImage(image);
                        const imageUrl = imagePath ? `${imagePath}` : null;
                        const imageAlt = image?.name || "image";

                        return (
                            <img
                                onClick={() => {
                                    setSelectedImg({ ...image, url: imageUrl });
                                    setModalOpen(true);
                                }}
                                src={imageUrl}
                                key={image.id}
                                alt={imageAlt}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    background:
                                        "#" +
                                        Math.floor(
                                            Math.random() * 16777215
                                        ).toString(16),
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            />
                        );
                    })}
                </Masonry>
            </ResponsiveMasonry>

            <FullScreen
                image={selectedImg?.url}
                imageAlt={selectedImg?.name}
                isOpen={isOpen}
                setModalOpen={setModalOpen}
            />
        </>
    );
}

export default Gallery;
