import React from "react";
import "./home.css";
//import PageContainer from "../../components/pageContainer/pageContainer.js";
import CustomGalleryHome from "../../components/customGallery/customGalleryHome.js";

function Home({ reviews = [] }) {
    if (!reviews || reviews.length === 0) {
        return <p>Loading...</p>;
    } else
        return (
            <>
                <CustomGalleryHome reviews={reviews} />
            </>
        );
}

export default Home;
