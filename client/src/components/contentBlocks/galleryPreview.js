import { useNavigate } from "react-router-dom";
import "../contentBlocks/contentBlock.css";

export default function GalleryPreview({ cards = [], page }) {
    const navigate = useNavigate();

    //console.log("cards", cards);

    if (!cards?.length) return null;

    return (
        <div className="cardsBlock">
            {cards.map((card, i) => {
                //const slug = page?.slug ?? "missing slug";
                //const API_URL = process.env.REACT_APP_API_URL;
                const image = card.image;
                const imageUrl = image?.url ? `${image.url}` : null;
                const imageAlt = image?.alternativeText || "image";
                //console.log("this card image", card.image.url)
                return (
                    <div
                        className="galleryCard"
                        key={i}
                        style={{ "--bgcolor": page.bgcolor }}
                        onClick={() => {
                            navigate(`/page/${card.galleryUrl}`);
                            console.log(
                                "navigate to /page/",
                                card.galleryUrl,
                                "was clicked"
                            );
                        }}
                    >
                        <div className="cardTitle">{card.title}</div>
                        {imageUrl ? (
                            <img
                                className="cardImage"
                                src={imageUrl}
                                alt={imageAlt}
                            />
                        ) : (
                            <div className="cardImage"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
