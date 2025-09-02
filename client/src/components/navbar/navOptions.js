import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";
import "./style.css";
import { motion } from "framer-motion";

function NavOptions({ pages = [] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                when: "afterChildren",
            },
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.11,
                duration: 0.4,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: -10,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <nav>
            <ul className="menu columnOneNav">
                {/* MAIN OPTIONS */}
                {pages.length > 0 ? (
                    pages
                        .filter((page) => page?.showInNav)
                        .sort((a, b) => a.order - b.order)
                        .map((page) => {
                            const slug = page?.slug ?? "missing slug";
                            const title =
                                page?.title?.toUpperCase() ?? "UNTITLED";

                            const subMenus = pages

                                .filter((sub) => sub?.subMenuCategory === slug)
                                .sort((a, b) => a.order - b.order);

                            return (
                                <React.Fragment key={slug}>
                                    <li
                                        className="menu-item dropdown"
                                        key={slug}
                                        onMouseEnter={() => setMenuOpen(true)}
                                        onMouseLeave={() => setMenuOpen(false)}
                                    >
                                        <div
                                            onClick={() => {
                                                navigate(`/page/${slug}`);
                                            }}
                                            className="columnOneNav navOption"
                                            style={{
                                                "--hover-bg": page.bgcolor,
                                                cursor: "pointer",
                                            }}
                                            key={slug}
                                            id={slug}
                                        >
                                            {title}
                                        </div>

                                        {/* SUBMENU OPTIONS */}
                                        {subMenus.length > 0 && (
                                            <motion.ul
                                                className="submenu"
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate={
                                                    menuOpen
                                                        ? "visible"
                                                        : "hidden"
                                                }
                                            >
                                                {subMenus
                                                    .filter(
                                                        (subPage) =>
                                                            subPage?.subMenuCategory ===
                                                                slug &&
                                                            subPage.slug !==
                                                                slug
                                                    )
                                                    .map((subPage) => {
                                                        const subSlug =
                                                            subPage?.slug ??
                                                            "missing-sub-slug";
                                                        const subTitle =
                                                            subPage?.title?.toUpperCase() ??
                                                            "UNTITLED";

                                                        return (
                                                            <motion.li
                                                                id={subTitle}
                                                                key={subSlug}
                                                                variants={
                                                                    itemVariants
                                                                }
                                                                style={{
                                                                    width: "10vw",
                                                                    "--hover-bg":
                                                                        subPage.bgcolor,
                                                                }}
                                                                className="listItem dropdown-submenu"
                                                            >
                                                                <Link
                                                                    to={`/page/${subSlug}`}
                                                                >
                                                                    {subTitle}
                                                                </Link>
                                                            </motion.li>
                                                        );
                                                    })}
                                            </motion.ul>
                                        )}
                                    </li>
                                </React.Fragment>
                            );
                        })
                ) : (
                    <p style={{ color: "white" }}>Loading menu...</p>
                )}
            </ul>
        </nav>
    );
}

export default NavOptions;
