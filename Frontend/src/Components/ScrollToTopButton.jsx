import React, { useEffect, useState } from "react";
import "./ScrollToTopButton.css";

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`scroll-to-top-btn ${visible ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
}

export default ScrollToTopButton;
