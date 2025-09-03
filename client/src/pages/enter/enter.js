import React from "react";
import "./enter.css";
import { Link } from "react-router-dom";
import "../../index.css";
import Logo from "../../components/logo/logo.js";
//import Socials from '../../components/socials/socials.js';

function Enter({ loadReviews, loading, error, reviews }) {
    return (
        <div className="outerBox">
            <div className="innerBox">
                <div className="title">
                    <div className="webNameLink">
                        <Logo />
                    </div>
                </div>
                <div className="enterButton">
                    {loading && <p>Loading...</p>}

                    {error && (
                        <div>
                            <button
                                className="enterButton"
                                onClick={loadReviews}
                            >
                                RETRY
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <Link to="/home" className="enterButton">
                            <button
                                disabled={
                                    loading || !reviews || reviews.length === 0
                                }
                            >
                                ENTER
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Enter;
