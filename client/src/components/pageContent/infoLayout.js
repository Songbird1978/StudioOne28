import "./pageContent.css";
import RepeatableButtonBlock from "../contentBlocks/repeatableButtonBlock.js";
import RelatedContentBlock from "../contentBlocks/relatedContentBlock.js";
import TableBlock from "../contentBlocks/tableBlock.js";
import RepeatablePara from "../contentBlocks/repeatablePara.js";
import Socials from "../socials/socials.js";

//import { useNavigate } from 'react-router-dom';

function InfoLayout({ page, imageUrl, imageAlt, pages }) {
    //const Navigate = useNavigate();
    const { contentBlocks = [] } = page;
    //console.log("content Blocks from" + page + "are" + contentBlocks);
    //console.log("this imageURL", imageUrl);

    //console.log("repeatable buttons", contentBlocks);

    return (
        <div
            className="layoutContainer"
            style={{ "--imageUrl": `url(${imageUrl})` }}
            alt={imageAlt}
        >
            <div className="pageBanner">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={{
                        width: "100%",
                        maxHeight: "50vh",
                        objectFit: "cover",
                        objectPosition: "center",
                        position: "relative",
                        filter: "opacity(1)",
                        backgroundColor: "rgb(243, 233, 220, 80%)",
                        borderRadius: "0",
                        border: "solid #f3e9dcff 20px",
                        justifySelf: "center",
                    }}
                />
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
                    <RepeatablePara para={contentBlocks} page={page} />
                    <RepeatableButtonBlock
                        buttons={contentBlocks}
                        page={page}
                        pages={pages}
                    />
                    <RelatedContentBlock content={contentBlocks} page={page} />
                    <div className="pageSocialsContainer">
                        <Socials size={40} id="pageSocials" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoLayout;
