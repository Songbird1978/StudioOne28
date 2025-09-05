import { Link } from "react-router-dom";

export default function RelatedContentBlock({ content }) {
    if (!content?.length) return null;
    //console.log("related content from infolayout", content);

    const onlyContent = content.filter(
        (c) =>
            c.__component === "navigation.related-content" ||
            c._component === "navigation.related-content"
    );

    //console.log("only related content", onlyContent);

    const pages = onlyContent[0]?.pages || [];

    return (
        <div className="relatedContentBlock">
            <h3 className="RCTitle">{onlyContent[0]?.name}</h3>
            <ul className="relatedList">
                {pages.map((related, i) => {
                    //console.log("related content pages", pages);
                    return (
                        <li key={i} className="contentItem">
                            <Link to={`/page/${related.slug}`}>
                                {related.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
