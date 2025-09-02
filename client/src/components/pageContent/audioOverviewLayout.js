//import { fetchAudio } from "../../api/audioApi.js";
//import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";

import AudioPreview from "../../components/contentBlocks/audioPreview.js";

import "./pageContent.css";

function AudioOverviewLayout({ page = [], pages }) {
    console.log("content blocks for this page:", page);

    return (
        <div className="layoutContainer">
            <div className="pageTitle" style={{ "--titleColor": page.bgcolor }}>
                {page.title}
            </div>
            <p className="audioOverviewPara">{page.description}</p>
            <section className="galleryOptions">
                <div className="contentBlocks">
                    <AudioPreview page={page} pages={pages} />
                </div>
            </section>
        </div>
    );
}

export default AudioOverviewLayout;
