import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "./customGalleryHome.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomGalleryHome = ({ reviews = [] }) => {
    //const API_URL = process.env.REACT_APP_API_URL;
    const sliderRef = useRef(null);

    useEffect(() => {
        // Give Slick time to mount before forcing a recalc
        const timer = setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(0); // jump to first slide
            }
            window.dispatchEvent(new Event("resize")); // force width recalculation
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const settings = {
        dots: false,
        centerMode: true,
        infinite: true,
        autoplay: true,
        speed: 2500,
        duration: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        prevArrow: false,
        nextArrow: false,
    };

    const items = reviews
        .filter((review) => review?.includeInReviews === null)
        .map((r, i) => ({
            src: r.image?.url ? `${r.image.url}` : null, // still needed for gallery to handle slide sizing
            name: r.fullName,
            strapline: r.Strapline.toUpperCase() || null,
            alt: r.fullName,
            id: r.id,
            key: i,
        }));

    if (!items || items.length === 0) return null;

    return (
        <>
            <div
                className="galleryHomeContainer"
                style={{
                    "--imageUrl": `url(https://res.cloudinary.com/dbrcftp5l/image/upload/v1757251295/film_c9b0de7591.png)`,
                }}
                alt="background"
            >
                <Slider
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
