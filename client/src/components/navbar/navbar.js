import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { XCircleIcon } from "@phosphor-icons/react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./style.css";
import "../../App.css";
import "../../index.css";
import NavOptions from "../navbar/navOptions.js";
import Socials from "../socials/socials.js";
import background from "../../images/redCordCarpet.png";

const drawerWidth = window.innerWidth;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: `-${drawerWidth}`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2%",
}));

function Navbar({ pages = [] }) {
    //const location = useLocation();
    const navigate = useNavigate();

    //console.log("Current path:", location.pathname);
    //console.log("prop passed from app", pages)

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: "#59353Eff",
                marginTop: "0",
                height: "0vh",
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                style={{
                    className: "navBar",
                    backgroundColor: "transparent !important",
                    height: "15vh",
                    boxShadow: "none",
                    background: "none",
                }}
            >
                <Toolbar
                    className="header"
                    sx={{ backgroundColor: "transparent !important" }}
                >
                    {/*console.log("navbar data being passed:", pages)*/}
                    <NavOptions pages={pages} className="topNavOptions" />
                    <div className="logoDiv">
                        <div
                            className="logoNav"
                            onClick={() => {
                                handleDrawerClose();
                                navigate("/home");
                            }}
                            style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                fontFamily: "BigShouldersBold",
                                fontSize: "1.6rem",
                                textWrap: "nowrap",
                                textAlign: "center",
                            }}
                        >
                            STUDIO ONE28
                        </div>
                    </div>
                    <Socials
                        className="navSocials"
                        style={{ display: "flex", justifyContent: "center" }}
                    />
                    <IconButton
                        color="transparent"
                        hover="none"
                        className="burger"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        size="large"
                        position="right"
                        sx={{ ml: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon className="burger" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        backgroundColor: "#59353E",
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "none",
                        backgroundBlendMode: "darken",
                        boxSizing: "border-box",
                        color: "#DAB49Dff",
                        hover: "var(--pear)",
                    },
                }}
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} className="icon">
                        {theme.direction === "rtl" ? (
                            <XCircleIcon
                                className="icon"
                                size={35}
                                weight="bold"
                                sx={{
                                    marginTop: "5%",
                                    "&:hover": {
                                        fill: "#dae24c",
                                    },
                                }}
                            />
                        ) : (
                            <XCircleIcon
                                className="icon"
                                size={35}
                                weight="bold"
                                style={{
                                    "&:hover": {
                                        fill: "#dae24c",
                                        marginTop: "5%",
                                    },
                                }}
                            />
                        )}
                    </IconButton>
                </DrawerHeader>
                <div
                    onClick={() => {
                        handleDrawerClose(); // Call the function
                        navigate("/home");
                    }}
                    id="drawerLogo"
                    className="logoDrawer"
                    style={{
                        "&:hover": {
                            color: "#dae24c",
                        },
                    }}
                >
                    STUDIO ONE28
                </div>

                {/* this is where the menus start */}
                <List
                    className="nav"
                    sx={{
                        backgroundColor: "transparent",
                        opacity: "80%",
                        textAlign: "right",
                    }}
                >
                    {pages.length > 0 ? (
                        pages
                            .filter((page) => page?.showInNav)
                            .sort((a, b) => a.order - b.order)
                            .map((page, index, array) => {
                                //console.log("filtered pages", page)
                                const slug = page?.slug ?? "missing slug";
                                //console.log("page slug", slug)
                                const title = page?.title
                                    ? page.title.toUpperCase()
                                    : "UNTITLED";
                                //console.log("page title", title)
                                return (
                                    <React.Fragment key={slug}>
                                        <ListItem
                                            className="listItem"
                                            key={slug}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                "&:hover": {
                                                    color: "#dae24c",
                                                },
                                                fontFamily: "FuturaBook",
                                                fontSize: "1.5rem",
                                            }}
                                        >
                                            <div
                                                key={slug}
                                                className="navDrawerTitle"
                                                onClick={() => {
                                                    handleDrawerClose(); // Call the function
                                                    navigate(`/page/${slug}`); // Perform the redirect
                                                    //console.log("Link clicked to page:", { slug });
                                                }}
                                                style={{
                                                    textDecoration: "none",
                                                    cursor: "pointer",
                                                    color: "#DAB49Dff",
                                                    "&:hover": {
                                                        color: "#dae24c",
                                                    },
                                                }}
                                            >
                                                {title}
                                            </div>
                                        </ListItem>
                                        {index !== array.length - 1 && (
                                            <Divider />
                                        )}
                                    </React.Fragment>
                                );
                            })
                    ) : (
                        <p style={{ color: "white" }}>Loading menu...</p>
                    )}
                </List>
                {/* above is where the menus end */}
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}

export default Navbar;
