import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGalleryBySlug } from "../../api/galleryBySlug.js";
import GalleryPreview from "../contentBlocks/galleryPreview.js";

import Gallery from "../../components/gallery/gallery.js";

//import "../../components/gallery/gallery.css";
import "./pageContent.css";

function GalleryDetail({ page, cards }) {
    const [gallery, setGallery] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        fetchGalleryBySlug(slug).then(setGallery);
    }, [slug]);

    console.log("current gallery:", gallery);

    if (!gallery) return <div>Loading...</div>;

    return (
        <div className="layoutContainer">
            <div className="pageTitle" style={{ "--titleColor": page.bgcolor }}>
                {page.title}
            </div>
            <p className="pagePara">{page.description}</p>

            <section className="galleryOptions">
                <Gallery gallery={gallery.gallery} page={page} />
            </section>
            <GalleryPreview page={page} cards={cards} />
        </div>
    );
}

export default GalleryDetail;
