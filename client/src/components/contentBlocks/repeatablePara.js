//import { useNavigate } from "react-router-dom";
import "../../index.css";
import "../contentBlocks/contentBlock.css";

export default function RepeatablePara({ para, page }) {
    //console.log("repeatable para from infolayout", para);

    const onlyPara = Array.isArray(para)
        ? para.filter(
              (p) =>
                  p.__component === "elements.repeatable-para" ||
                  p._component === "elements.repeatable-para"
          )
        : [];

    if (!onlyPara.length) {
        //console.warn("No para block found in", para);
        return null; // return early
    }

    const { paragraph = [] } = onlyPara[0];

    if (!paragraph.length) return null;

    return (
        <div className="biggerParaBlock">
            <div className="paraBlock">
                {paragraph.map((p, i) => (
                    <div className="paraPara" key={i}>
                        {p.paragraph}
                    </div>
                ))}
            </div>
        </div>
    );
}
