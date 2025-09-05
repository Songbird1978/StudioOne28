import "./pageContent.css";

import GalleryPreview from "../../components/contentBlocks/galleryPreview.js";

function GalleryOverviewLayout({ page = [] }) {
    const { contentBlocks = [] } = page;
    //console.log("content blocks for this page:", page);

    return (
        <div className="layoutContainer">
            <div className="pageTitle" style={{ "--titleColor": page.bgcolor }}>
                {page.title}
            </div>
            <p className="pagePara">{page.description}</p>
            <section className="galleryOptions">
                {contentBlocks.map((block, i) => {
                    return (
                        <div className="contentBlocks" key={i}>
                            <GalleryPreview
                                cards={block.galleryPreview}
                                page={page}
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

export default GalleryOverviewLayout;
