import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ImageContext } from "../../utils/imageContext.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./customGalleryHome.css";

const CustomGalleryHome = ({ reviews = [] }) => {
    //const API_URL = process.env.REACT_APP_API_URL;

    const { getImageUrl } = useContext(ImageContext);

    const items = reviews
        .filter((review) => review?.includeInReviews === null)
        .map((r, i) => {
            const rawUrl = r.image?.url || null;
            const optimizedUrl = rawUrl ? getImageUrl(rawUrl, "card") : null;

            return {
                src: optimizedUrl, // still needed for gallery to handle slide sizing
                name: r.fullName,
                strapline: r.Strapline.toUpperCase() || null,
                alt: r.fullName,
                id: r.id,
                key: i,
            };
        });

    if (!items || items.length === 0) return null;

    const cloudinaryUrl =
        "https://res.cloudinary.com/dbrcftp5l/image/upload/v1757251295/film_c9b0de7591.png";

    const bgUrl = getImageUrl(cloudinaryUrl, "large");

    return (
        <>
            <div
                className="galleryHomeContainer"
                style={{
                    "--imageUrl": `url(${bgUrl})`,
                }}
                alt="background"
            >
                <Swiper
                    modules={{ Autoplay, Pagination, Navigation }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="home-slider"
                >
                    {items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="home-slide"
                                style={{
                                    backgroundImage: `url(${item.src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="home-strapline">
                                    {item.strapline}
                                </div>
                                <h3 className="home-name">{item.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default CustomGalleryHome;
