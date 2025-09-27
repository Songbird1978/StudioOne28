import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";
import "./style.css";
import "./drawerMenu.css";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";

function DrawerOptions({ pages = [], handleDrawerClose }) {
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
            <ul className="drawerNav">
                {/* MAIN OPTIONS */}
                {pages.length > 0 ? (
                    pages
                        .filter((page) => page?.showInNav)
                        .sort((a, b) => a.order - b.order)
                        .map((page, array, index) => {
                            const slug = page?.slug ?? "missing slug";
                            const title =
                                page?.title?.toUpperCase() ?? "UNTITLED";

                            const subMenus = pages

                                .filter((sub) => sub?.subMenuCategory === slug)
                                .sort((a, b) => a.order - b.order);

                            return (
                                <React.Fragment key={slug}>
                                    <li
                                        className="drawerMenu-item drawerDropdown"
                                        key={slug}
                                        onMouseEnter={() => setMenuOpen(true)}
                                        onClick={() => setMenuOpen(true)}
                                        onMouseLeave={() => setMenuOpen(false)}
                                    >
                                        <div
                                            onClick={() => {
                                                handleDrawerClose();
                                                navigate(`/page/${slug}`);
                                            }}
                                            className="drawerNav drawerNavOption"
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
                                                className="drawerSubmenu"
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
                                                    .map(
                                                        (
                                                            subPage,
                                                            array,
                                                            index
                                                        ) => {
                                                            const subSlug =
                                                                subPage?.slug ??
                                                                "missing-sub-slug";
                                                            const subTitle =
                                                                subPage?.title?.toUpperCase() ??
                                                                "UNTITLED";

                                                            return (
                                                                <React.Fragment>
                                                                    {index !==
                                                                        array.length -
                                                                            1 && (
                                                                        <Divider />
                                                                    )}
                                                                    <motion.li
                                                                        id={
                                                                            subTitle
                                                                        }
                                                                        key={
                                                                            subSlug
                                                                        }
                                                                        variants={
                                                                            itemVariants
                                                                        }
                                                                        style={{
                                                                            "--hover-bg":
                                                                                subPage.bgcolor,
                                                                        }}
                                                                        className="drawerDropdown-submenu"
                                                                    >
                                                                        <Link
                                                                            to={`/page/${subSlug}`}
                                                                            onClick={() => {
                                                                                handleDrawerClose();
                                                                                navigate(
                                                                                    `/page/${slug}`
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                subTitle
                                                                            }
                                                                        </Link>
                                                                    </motion.li>
                                                                </React.Fragment>
                                                            );
                                                        }
                                                    )}
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

export default DrawerOptions;
