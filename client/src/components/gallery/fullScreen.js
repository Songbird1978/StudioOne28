//import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@phosphor-icons/react";

export default function FullScreen({ imageAlt, image, isOpen, setModalOpen }) {
    // const navigate = useNavigate();
    if (!isOpen || !image) return null;

    //console.log("image clicked is:", image);
    //console.log("image is open?:", isOpen);
    //console.log("state of modal open or closed is:", setModalOpen);
    //console.log("imageAlt is:", imageAlt);

    return (
        <div
            className="fullscreenModal"
            style={{
                display: "flex",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "5000",
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <XCircleIcon
                className="icon"
                size={40}
                weight="bold"
                style={{
                    "&:hover": {
                        fill: "#dae24c",
                    },
                    position: "absolute",
                    top: "5rem",
                    right: "5rem",
                    width: "auto",
                    cursor: "pointer",
                    zIndex: "6000",
                    pointerEvents: "auto",
                }}
                onClick={() => {
                    setModalOpen(false);
                }}
            />
            <div
                className="imageContainer"
                style={{
                    display: "flex",
                    maxWidth: "85vw",
                    maxHeight: "85vh",
                    marginTop: "15vh",
                    border: "var(--desert-sand) solid 2px",
                    borderRadius: "25px",
                    pointerEvents: "none",
                }}
            >
                <img
                    key={image.id}
                    src={image}
                    alt={imageAlt}
                    className="modalImage"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                        borderRadius: "25px",
                    }}
                />
            </div>
        </div>
    );
}
