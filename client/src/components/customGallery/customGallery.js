import React, { useContext } from "react";
import { ImageContext } from "../../utils/imageContext.js";
//import { useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./customGallery.css";

const CustomGallery = ({ reviews = [] }) => {
    //console.log("Reviews from reviewLayout:", reviews);
    const { getImageUrl } = useContext(ImageContext);

    //console.log("reviews as array", reviews);
    //console.log("LINKS from review", reviews[0].links[0].linkURL);
    //const navigate = useNavigate();
    //const API_URL = process.env.REACT_APP_API_URL;
    // transform data into gallery items
    const items = reviews
        .filter((review) => review?.includeInReviews)
        .map((r, i) => {
            const rawImageUrl = r.image?.url || null;
            const optimizedImageUrl = rawImageUrl
                ? getImageUrl(rawImageUrl, "card")
                : null;

            const rawBgUrl = r.backgroundImg?.url || null;
            const optimizedBgUrl = rawBgUrl
                ? getImageUrl(rawBgUrl, "card")
                : null;
            //console.log("optimized images", optimizedBgUrl);

            return {
                original: optimizedImageUrl, // still needed for gallery to handle slide sizing
                renderItem: () => (
                    <div
                        className="review-slide"
                        key={i}
                        style={{
                            "--imageUrl": optimizedBgUrl
                                ? `url(${optimizedBgUrl})`
                                : "none",
                        }}
                        alt={r.fullName}
                    >
                        {optimizedImageUrl && (
                            <img
                                src={optimizedImageUrl}
                                alt={r.fullName}
                                className="review-img"
                                loading="lazy"
                            />
                        )}
                        <div className="review-content">
                            <p key={i} className="para-comment">
                                '{r.comment}'
                            </p>
                            {r.links[0] && (
                                <button
                                    className="review-btn"
                                    target="_blank"
                                    onClick={() => {
                                        window.location.href = `${r.links[0].linkURL}`;
                                    }}
                                >
                                    {r.links[0].name}
                                </button>
                            )}
                        </div>
                        <h3 className="review-name">{r.fullName}</h3>
                    </div>
                ),
            };
        });

    return (
        <div className="galleryContainer" id="gallery">
            {items.length > 0 ? (
                <ImageGallery
                    height="100vh"
                    width="auto"
                    items={items}
                    showPlayButton={true}
                    showThumbnails={false}
                    showFullscreenButton={true}
                    autoPlay={false}
                    slideInterval={10000}
                    additionalClass="custom-gallery"
                    style={{ padding: "20px" }}
                />
            ) : (
                <p>Loading reviews...</p>
            )}
        </div>
    );
};

export default CustomGallery;
