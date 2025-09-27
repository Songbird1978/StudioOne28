import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ImageContext } from "../../utils/imageContext.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./customGalleryHome.css";

const CustomGalleryHome = ({ reviews = [] }) => {
    //const API_URL = process.env.REACT_APP_API_URL;
    const Navigate = useNavigate();
    const { getImageUrl } = useContext(ImageContext);

    const items = reviews
        .filter((review) => review?.includeInReviews === null)
        .map((r, i) => {
            const rawUrl = r.image?.url || null;
            const optimizedUrl = rawUrl ? getImageUrl(rawUrl, "large") : null;

            return {
                src: optimizedUrl, // still needed for gallery to handle slide sizing
                name: r.fullName,
                strapline: r.Strapline.toUpperCase() || null,
                straplineLink: r.straplineLink,
                alt: r.fullName,
                id: r.id,
                key: i,
            };
        });

    if (!items || items.length === 0) return null;

    return (
        <>
            <div className="galleryHomeContainer">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 10, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    speed={5000}
                    className="home-slider"
                >
                    {items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="home-slide"
                                key={i}
                                style={{
                                    backgroundImage: `url(${item.src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 40%",
                                    backgroundBlendMode: "soft-light",
                                    filter: "opacity(0.8)",
                                }}
                            ></div>
                            {item.links && (
                                <button
                                    className="review-btn"
                                    target="_blank"
                                    onClick={() => {
                                        window.location.href = `${item.links.linkURL}`;
                                    }}
                                >
                                    {item.links.name}
                                </button>
                            )}
                            <div
                                className="home-strapline"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    Navigate(`/page${item.straplineLink}`);
                                }}
                            >
                                {item.strapline}
                            </div>
                            <h3 className="home-name">{item.name}</h3>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default CustomGalleryHome;
