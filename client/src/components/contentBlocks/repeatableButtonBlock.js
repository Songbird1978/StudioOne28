import { useNavigate } from "react-router-dom";

export default function RepeatableButtonBlock({ buttons, page, pages = [] }) {
    const navigate = useNavigate();
    const currentPage = page;
    const onlyButtons = buttons.filter(
        (button) =>
            button.__component === "navigation.repeatable-button" ||
            button._component === "navigation.repeatable-button"
    );

    return (
        <div className="buttonBlock">
            {onlyButtons &&
                onlyButtons.map((n, i) => (
                    <button
                        className="contentBtn"
                        style={{
                            "--btnColor": "var(--pear)",
                            boxShadow: "var(--classyBox)",
                            fontSize: "0.6rem",
                        }}
                        key={i}
                        onClick={() => navigate(n.linkURL)}
                    >
                        {n.name.toUpperCase()}
                    </button>
                ))}

            {pages.length > 0
                ? pages
                      .filter(
                          (page) =>
                              !page?.showInNav &&
                              currentPage.subMenuCategory ===
                                  page.subMenuCategory
                      )
                      .map((subBtn, i) => {
                          return (
                              <button
                                  className="contentBtn"
                                  style={{
                                      "--btnColor": subBtn.bgcolor,
                                      boxShadow: "var(--classyBox)",
                                      fontSize: "0.6rem",
                                  }}
                                  key={i}
                                  onClick={() =>
                                      navigate(`/page/${subBtn.slug}`)
                                  }
                              >
                                  {subBtn.title.toUpperCase()}
                              </button>
                          );
                      })
                : null}
        </div>
    );
}
