import React, { useEffect, useRef, useContext } from "react";
import { ImageContext } from "../../utils/imageContext.js";
import Slider from "react-slick";
import "./customGalleryHome.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomGalleryHome = ({ reviews = [] }) => {
    //const API_URL = process.env.REACT_APP_API_URL;
    const sliderRef = useRef(null);
    const { getImageUrl } = useContext(ImageContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(0); // reset to first
                sliderRef.current.slickPause(); // if you want autoplay stable
                //sliderRef.current.innerSlider.onWindowResized(); // trigger internal recalc
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const settings = {
        dots: false,
        centerMode: true,
        infinite: true,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        prevArrow: true,
        nextArrow: true,
    };

    const items = reviews
        .filter((review) => review?.includeInReviews === null)
        .reverse()
        .map((r, i) => {
            const rawUrl = r.image?.url || null;
            const optimizedUrl = rawUrl ? getImageUrl(rawUrl, "large") : null;

            return {
                src: optimizedUrl, // still needed for gallery to handle slide sizing
                name: r.fullName || "",
                strapline: r.Strapline.toUpperCase() || "",
                alt: r.fullName || "",
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
                <Slider
                    initialSlide={0}
                    key={reviews.length}
                    {...settings}
                    className="home-slider"
                    ref={sliderRef}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="home-slide"
                            style={{ width: "100%" }}
                        >
                            <img
                                src={item.src}
                                alt={item.name}
                                className="home-img"
                            />
                            <div className="home-strapline">
                                {item.strapline}
                            </div>
                            <h3 className="home-name">{item.name}</h3>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default CustomGalleryHome;
