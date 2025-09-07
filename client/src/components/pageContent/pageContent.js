import { useParams } from "react-router-dom";
//import usePageBySlug from '../../hooks/usePageBySlug';
import PageContainer from "../../components/pageContainer/pageContainer.js";
import InfoLayout from "../pageContent/infoLayout.js";
import GalleryOverviewLayout from "./galleryOverviewLayout.js";
import GalleryDetailLayout from "../pageContent/galleryDetailLayout";
import AudioOverviewLayout from "../pageContent/audioOverviewLayout";
import AudioDetailLayout from "../pageContent/audioDetailLayout";
import ClientLayout from "./clientLayout.js";
import ReviewLayout from "./reviewLayout.js";

import "./pageContent.css";

function PageContent({ pages, reviews }) {
    const { slug } = useParams();
    const currentPage = pages.find((page) => page.slug === slug);

    //console.log("current page :", currentPage);
    //console.log("pages in pageContent:", pages);

    if (!currentPage) return <div>Page not found</div>;

    //const API_URL = process.env.REACT_APP_API_URL;
    const image = currentPage.image;
    const imageUrl = image?.url ? `${image.url}` : null;
    const imageAlt = image?.alternativeText || "image";

    const layoutMap = {
        infoLayout: InfoLayout,
        galleryOverviewLayout: GalleryOverviewLayout,
        galleryDetailLayout: GalleryDetailLayout,
        audioOverviewLayout: AudioOverviewLayout,
        audioDetailLayout: AudioDetailLayout,
        clientLayout: ClientLayout,
        reviewLayout: ReviewLayout,
    };

    const Layout = layoutMap[currentPage.pageLayout] || ClientLayout;

    return (
        <PageContainer style={{ boxShadow: "var(--classyBox)" }}>
            <Layout
                reviews={reviews}
                pages={pages}
                page={currentPage}
                imageUrl={imageUrl}
                imageAlt={imageAlt}
            />
        </PageContainer>
    );
}

export default PageContent;
