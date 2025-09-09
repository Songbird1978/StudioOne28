import { useNavigate } from "react-router-dom";
import "../contentBlocks/contentBlock.css";
import { useParams } from "react-router-dom";
import { cloudinaryUrl } from "../../utils/cloudinary.js";

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
                    //const API_URL = process.env.REACT_APP_API_URL;
                    const image = card.image;
                    const imageAlt = image?.alternativeText || "image";
                    const rawUrl =
                        image?.formats?.thumbnail?.url || image?.url || null;
                    //const imageUrl = image?.url ? `${image.url}` : null;
                    const imageUrl = rawUrl ? cloudinaryUrl(rawUrl, 600) : null;

                    console.log("this card image", imageUrl);
                    console.log("this card is:", card);

                    return (
                        <div
                            className="galleryCard" //also using this from gallery (cards to display preview and link to page / audio players)
                            key={i}
                            style={{ "--bgcolor": page.bgcolor }} //this the current page background color
                            onClick={() => {
                                navigate(`/page/${card.slug}`);
                                //console.log(
                                // "navigate to /page/",
                                //card.slug,
                                //"was clicked"
                                //);
                            }}
                        >
                            <div className="cardTitle">{card.title}</div>
                            {imageUrl ? (
                                <img
                                    className="cardImage"
                                    src={imageUrl}
                                    alt={imageAlt}
                                    loading="lazy"
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
