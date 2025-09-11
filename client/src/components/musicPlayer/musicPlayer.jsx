import { useRef, useState, useEffect, useCallback, useContext } from "react";
import { ImageContext } from "../../utils/imageContext.js";
import "./listen.css";
//import "../../components/gallery/gallery.css";
import "../../components/musicPlayer/audioPlayer.css";
import { PlayIcon, SkipForwardIcon, SkipBackIcon } from "@phosphor-icons/react";

export default function AudioPlaylistPlayer({ tracks }) {
    //const API_URL = process.env.REACT_APP_API_URL;

    const audioRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    //console.log("page in music player", page);
    //console.log('current page from page.slug', currentPage);
    //console.log( 'tracks from music player', tracks );

    // Track window size changes
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    //get best image size
    const getBestImage = (image) => {
        if (windowWidth < 600 && image?.formats?.small)
            return image.formats.small.url;
        if (windowWidth < 1200 && image?.formats?.medium)
            return image.formats.medium.url;
        if (image?.formats?.large) return image.formats.large.url;

        return image.url;
    };

    const currentTrack = tracks[currentIndex];
    const image = currentTrack?.artwork;
    const audioSrc = currentTrack?.audioFile?.url;
    const imagePath = getBestImage(image);
    const imageUrl = imagePath ? `${imagePath}` : null;
    const imageAlt = currentTrack?.songTitle || "artwork";
    const audioUrl = audioSrc ? `${audioSrc}` : null;
    //console.log("audioUrl=", audioUrl);

    //SKIPPING TRACKS FORWARD
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true);
    }, [tracks]);

    //SKIPPING TRACKS BACK
    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    }, [tracks]);

    //TIME & COMPLETION
    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleNext);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleNext);
        };
    }, [currentIndex, handleNext]);

    //PLAYING OR NOT
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    //SCRUBBING THROUGH AUDIO
    const handleSeek = (e) => {
        const audio = audioRef.current;
        const time = (audio.duration * e.target.value) / 100;
        audio.currentTime = time;
        setProgress(e.target.value);
    };

    //IS IT PLAYING ?
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentIndex, isPlaying]);

    return (
        <div className="card">
            <div className="current-song">
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    preload="metadata"
                    onCanPlay={() => {
                        if (isPlaying) {
                            audioRef.current.play();
                        }
                    }}
                />
                <div className="trackInfo">
                    <div className="song-name">{currentTrack?.songTitle}</div>
                    <div className="song-author" id="song-author">
                        {currentTrack?.composer}
                    </div>
                </div>

                <img src={imageUrl} alt={imageAlt} className="img-wrap" />
            </div>
            <div className="time">
                <div className="current-time">{progress.currentTime}</div>
                <div className="end-time">{progress.duration}</div>
                <input
                    type="range"
                    value={progress}
                    onChange={handleSeek}
                    className="input h-[20px] rounded"
                    style={{
                        accentColor: "var(--eggplant)",
                        padding: "10%",
                        backgroundColor: "none",
                        width: "7rem",
                    }}
                    id="timeline"
                />
            </div>

            <div className="controls">
                <SkipBackIcon
                    size={32}
                    weight="bold"
                    type="button"
                    className="special prev-next"
                    onClick={handlePrev}
                />
                <PlayIcon
                    size={32}
                    weight="bold"
                    className="special play"
                    onClick={togglePlay}
                />
                <SkipForwardIcon
                    size={32}
                    weight="bold"
                    type="button"
                    className="special prev-next"
                    onClick={handleNext}
                />
            </div>

            <div className="play-list">
                {tracks.map((track, index) => {
                    return (
                        <div
                            key={track.id}
                            onClick={() => {
                                setCurrentIndex(index);
                                setIsPlaying(true);
                            }}
                            className={`track current-audio  ${
                                index === currentIndex ? "active" : ""
                            }`}
                        >
                            {track.songTitle}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
