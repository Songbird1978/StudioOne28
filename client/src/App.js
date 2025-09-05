import { React, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Enter from "./pages/enter/enter.js";
import Pathmorphing from "./components/pathMorphing/pathMorphing.js";

import Navbar from "./components/navbar/navbar.js";
import Footer from "./components/footer/footer.js";

import Home from "./pages/home/home.js";
import PageContent from "./components/pageContent/pageContent.js";

import { fetchPages } from "./api/pagesApi.js";
import { fetchReviews } from "./api/reviewsApi.js";

import "./App.css";
import "./index.css";

function App() {
    const [pages, setPages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const hideLayout = location.pathname === "/";

    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 200);
    }, [location.pathname]);

    useEffect(() => {
        //fetch pages & reviews
        let mounted = true;
        fetchPages().then((data) => {
            if (mounted) {
                setPages(data);
                //console.log("pages data from app", data);
            }
        });
        fetchReviews().then((data) => {
            if (mounted) {
                setReviews(data.data);
                //console.log("Reviews raw data from app", data.data);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    async function loadReviews() {
        setLoading(true);
        setError(null);
        const startTime = Date.now();
        try {
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, 1000 - elapsed);
            setTimeout(() => setLoading(false), delay);
        } catch (err) {
            setError(err.message || "something went wrong loading reviews");
            //console.log("error loading reviews data from app", error);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="App">
                {!hideLayout && <Navbar pages={pages} />}
                {!hideLayout && <Pathmorphing />}
                <main className="mainArea">
                    {/* Scrollable main content */}
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route
                                path="/"
                                element={
                                    <Enter
                                        loadReviews={loadReviews}
                                        loading={loading}
                                        error={error}
                                        reviews={reviews}
                                    />
                                }
                            />
                            <Route
                                path="/home"
                                element={
                                    <Home reviews={reviews} loading={loading} />
                                }
                            />
                            <Route
                                path="/page/:slug"
                                element={
                                    <PageContent
                                        pages={pages}
                                        reviews={reviews}
                                    />
                                }
                            />
                        </Routes>
                    </AnimatePresence>
                </main>
                {!hideLayout && <Footer />}
            </div>
        </>
    );
}

export default App;
