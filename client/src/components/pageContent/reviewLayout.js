import "./pageContent.css";
import "../contentBlocks/contentBlock.css";
import RepeatableButtonBlock from "../contentBlocks/repeatableButtonBlock.js";
import RelatedContentBlock from "../contentBlocks/relatedContentBlock.js";
import TableBlock from "../contentBlocks/tableBlock.js";
import RepeatablePara from "../contentBlocks/repeatablePara.js";
//import { fetchAudio } from "../../api/audioApi.js";
//import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomGallery from "../customGallery/customGallery.js";

function ReviewLayout({ page, imageUrl, imageAlt, reviews, pages }) {
    const { contentBlocks = [] } = page;

    console.log("reviews from APP", reviews);

    //console.log("content Block from page", contentBlocks);

    //if (!reviews) return <div>Loading...</div>;

    return (
        <div
            className="layoutContainer"
            style={{ "--imageUrl": `url(${imageUrl})` }}
            alt={imageAlt}
        >
            <div className="pageBanner">
                <div
                    className="pageTitle"
                    style={{
                        "--titleColor": page.bgcolor,
                    }}
                >
                    {page.title}
                </div>
                <p className="pagePara" id="infoLayoutPara">
                    {page.description}
                </p>
                <CustomGallery reviews={reviews} />
                <div className="contentBlocks">
                    <TableBlock table={contentBlocks} page={page} />

                    <Link to="/page/reviews">
                        <RepeatablePara para={contentBlocks} page={page} />
                    </Link>
                    <RepeatableButtonBlock
                        buttons={contentBlocks}
                        page={page}
                        pages={pages}
                    />
                    <RelatedContentBlock content={contentBlocks} page={page} />
                </div>
            </div>
        </div>
    );
}

export default ReviewLayout;
