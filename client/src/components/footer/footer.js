import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { HeartIcon } from "@phosphor-icons/react";

function Footer() {
    return (
        <footer className="footerContainer">
            <div className="columnFour">
                <div className="footerPara">
                    {" "}
                    © 2025 Jonny Callender Studio One28.
                </div>
                <div className="footerPara">
                    {" "}
                    Made with{" "}
                    <HeartIcon
                        size={15}
                        color={"var(--pear)"}
                        weight="fill"
                    />{" "}
                    By{" "}
                    <Link
                        className="songbirdLink"
                        to="https://thesongbird.co.uk"
                    >
                        The Songbird
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
