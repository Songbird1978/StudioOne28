import React from "react";
//import { useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./customGallery.css";

const CustomGallery = ({ reviews = [] }) => {
    //console.log("Reviews from reviewLayout:", reviews);

    //console.log("reviews as array", reviews);
    //console.log("LINKS from review", reviews[0].links[0].linkURL);
    //const navigate = useNavigate();
    //const API_URL = process.env.REACT_APP_API_URL;
    // transform data into gallery items
    const items = reviews
        .filter((review) => review?.includeInReviews)
        .map((r, i) => ({
            original: r.image?.url ? `${r.image.url}` : null, // still needed for gallery to handle slide sizing
            renderItem: () => (
                <div
                    className="review-slide"
                    key={i}
                    style={{
                        "--imageUrl": `url(${r.backgroundImg?.url})`,
                    }}
                    alt={r.fullName}
                >
                    <img
                        src={`${r.image.url}`}
                        alt={r.fullName}
                        className="review-img"
                    />
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
        }));

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
                    autoPlay={true}
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
