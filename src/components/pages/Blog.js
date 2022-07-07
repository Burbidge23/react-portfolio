import React from "react";
import { Link } from "react-router-dom";

export default function() {
    return (
        <div>
            <h2>Blog</h2>

            <div>
                <Link to="/about-me">Read More About Myself</Link>
            </div>
        </div>
    );
}