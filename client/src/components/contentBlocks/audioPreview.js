import { useNavigate } from "react-router-dom";
import "../contentBlocks/contentBlock.css";
import { useParams } from "react-router-dom";

export default function AudioPreview({ page, pages }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    //re-using cards (audioFiles) passed from AudioOverviewLayout (fetch all)
    if (!pages?.length) return null;

    return (
        <div className="cardsBlock">
            {pages
                .filter((card) => card?.subMenuCategory === slug)
                .filter((card) => card?.showInNav !== true)
                .map((card, i) => {
                    const API_URL = process.env.REACT_APP_API_URL;
                    const image = card.image;
                    const imageUrl = image?.url
                        ? `${API_URL}${image.url}`
                        : null;
                    const imageAlt = image?.alternativeText || "image";
                    console.log("this card image", imageUrl);
                    console.log("this card is:", card);

                    return (
                        <div
                            className="galleryCard" //also using this from gallery (cards to display preview and link to page / audio players)
                            key={i}
                            style={{ "--bgcolor": page.bgcolor }} //this the current page background color
                            onClick={() => {
                                navigate(`/page/${card.slug}`);
                                console.log(
                                    "navigate to /page/",
                                    card.slug,
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
                                <div className="cardImage">Loading...</div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
}
