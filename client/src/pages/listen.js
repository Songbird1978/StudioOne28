import React from "react";
import "./listen.scss";
import { useState, useEffect } from "react";
//import MusicPlayer from '../../components/musicPlayer/musicPlayer.jsx';

import { fetchAudio } from "../../api/audioApi.js";
import "../../App.css";
import PageContainer from "../../components/pageContainer/pageContainer.js";

function Listen() {
    const [audio, setAudio] = useState([]);

    useEffect(() => {
        async function loadAudio() {
            try {
                const audioData = await fetchAudio();
                setAudio(audioData.data);

                console.log("audioData", audioData);
            } catch (error) {
                console.error("error fetching data:", error);
            }
        }

        loadAudio();
    }, []);

    return (
        <PageContainer id="listen">
            <h1 className="pageTitle">LISTEN</h1>
            {/*<MusicPlayer />*/}
            <div
                className="listenContent"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "scroll",
                }}
            >
                {audio.map((track, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                            width: "100%",
                            overflow: "scroll",
                        }}
                    >
                        {track.composer}
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}

export default Listen;
