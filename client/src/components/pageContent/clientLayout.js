import "./pageContent.css";
import "../contentBlocks/contentBlock.css";
import RepeatableButtonBlock from "../contentBlocks/repeatableButtonBlock.js";
import RelatedContentBlock from "../contentBlocks/relatedContentBlock.js";
import TableBlock from "../contentBlocks/tableBlock.js";
import RepeatablePara from "../contentBlocks/repeatablePara.js";
import { fetchAudio } from "../../api/audioApi.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ClientLayout({ page, imageUrl, imageAlt, pages }) {
    const { contentBlocks = [] } = page;
    const [audioFiles, setAudioFiles] = useState(null);
    const tracks = audioFiles;

    console.log("repeatable buttons", contentBlocks);

    useEffect(() => {
        //fetchAudio
        let mounted = true;
        fetchAudio().then((data) => {
            if (mounted) {
                setAudioFiles(data.data);
                console.log("audio data from app", data.data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    console.log("current audioFiles in client pages", audioFiles);
    console.log("tracks from client pages", tracks);

    if (!tracks) return <div>Loading...</div>;

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
                <div className="contentBlocks">
                    <TableBlock table={contentBlocks} page={page} />

                    <div className="clientList">
                        {tracks
                            .filter(
                                (track, index, self) =>
                                    index ===
                                    self.findIndex(
                                        (t) => t.composer === track.composer
                                    )
                            )
                            .map((track, i) => {
                                const API_URL = process.env.REACT_APP_API_URL;
                                const image =
                                    track?.artwork?.formats?.thumbnail;
                                const imageUrl = image?.url
                                    ? `${API_URL}${image.url}`
                                    : null;
                                const imageAlt =
                                    image?.alternativeText || "image";

                                return (
                                    <Link
                                        to={`${track.linkURL}`}
                                        className="clientCard" //also using this from gallery (cards to display preview and link to page / audio players)
                                        key={i}
                                        style={{
                                            "--bgcolor": page.bgcolor,
                                        }} //this the current page background color
                                    >
                                        {imageUrl ? (
                                            <img
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                }}
                                                src={imageUrl}
                                                alt={imageAlt}
                                                key={track.id}
                                                className="clientImage"
                                            />
                                        ) : (
                                            <div className="clientImage">
                                                Loading...
                                            </div>
                                        )}
                                        <div key={i} className="clientTitle">
                                            {track.composer}
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                    <Link to="/page/reviews" className="clientPara">
                        <RepeatablePara
                            id="clientPara"
                            para={contentBlocks}
                            page={page}
                        />
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

export default ClientLayout;
