import { fetchAudio } from "../../api/audioApi.js";
import { useEffect, useState } from "react";

import MusicPlayer from "../../components/musicPlayer/musicPlayer.jsx";
import "./pageContent.css";

function AudioDetailLayout({ page }) {
    const [audioFiles, setAudioFiles] = useState(null);
    const currentPage = page.slug;
    const tracks = audioFiles;
    useEffect(() => {
        //fetchAudio
        let mounted = true;
        fetchAudio().then((data) => {
            if (mounted) {
                setAudioFiles(data.data);
                //console.log("audio data from app", data.data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    //console.log("current audioFiles:", audioFiles);
    //console.log("tracks", tracks);

    if (!tracks) return <div>Loading...</div>;

    const filteredTracks = [
        ...new Map(
            tracks
                .filter((t) => {
                    const pageLower = currentPage.toLowerCase();
                    return (
                        t.categoryOne?.toLowerCase() === pageLower ||
                        t.categoryTwo?.toLowerCase() === pageLower ||
                        t.categoryThree?.toLowerCase() === pageLower
                    );
                })
                .map((track) => [track.id, track])
        ).values(),
    ];

    //console.log("filtered tracks:", filteredTracks);

    return (
        <div className="layoutContainer">
            <div className="pageBanner">
                <div
                    className="pageTitle"
                    style={{ "--titleColor": page.bgcolor }}
                >
                    {page.title}
                </div>
                <p className="audioOverviewPara" id="audioLayoutPara">
                    {page.description}
                </p>
            </div>
            <div className="audioOptions">
                <MusicPlayer tracks={filteredTracks} page={page} />
            </div>
        </div>
    );
}

export default AudioDetailLayout;
