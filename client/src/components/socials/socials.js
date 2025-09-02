import React from "react";
import { FacebookLogoIcon } from "@phosphor-icons/react";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { InstagramLogoIcon } from "@phosphor-icons/react";
import { LinkedinLogoIcon } from "@phosphor-icons/react";
import { YoutubeLogoIcon } from "@phosphor-icons/react";
//import { SoundcloudLogoIcon } from "@phosphor-icons/react";

import "./socials.css";

function Socials() {
    return (
        <div className="navSocials">
            <div className="contactListItem">
                <a href="https://uk.linkedin.com/in/jon-callender-786779a1">
                    <LinkedinLogoIcon
                        className="icon"
                        size={20}
                        weight="bold"
                        hover="var(--pear)"
                    />
                </a>
            </div>

            <div className="contactListItem">
                <a href="https://en-gb.facebook.com/jon.callender.9">
                    <FacebookLogoIcon
                        className="icon"
                        size={20}
                        weight="bold"
                    />
                </a>
            </div>
            <div className="contactListItem">
                <a href="https://www.instagram.com/jon.callender?igsh=MTVpcXI3azI6MnBleA==">
                    <InstagramLogoIcon
                        className="icon"
                        size={20}
                        weight="bold"
                    />
                </a>
            </div>

            <div className="contactListItem">
                <a href="mailto:curluk@hotmail.com">
                    <EnvelopeSimpleIcon
                        className="icon"
                        size={20}
                        weight="bold"
                    />
                </a>
            </div>
            <div className="contactListItem">
                <a href="https://www.youtube.com/@jonnyC128">
                    <YoutubeLogoIcon className="icon" size={20} weight="bold" />
                </a>
            </div>
        </div>
    );
}

export default Socials;
