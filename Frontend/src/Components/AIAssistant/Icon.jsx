import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from "../../contexts/LanguageContext";
import ChatPopup from './Chat';

function Icon() {
    const [isOpen, setIsOpen] = useState(() => sessionStorage.getItem("chatOpen") === "true");
    const [isVisible, setIsVisible] = useState(false);
    const { translations } = useContext(LanguageContext);
    const location = useLocation();

    useEffect(() => {
        const storedOpen = sessionStorage.getItem("chatOpen") === "true";
        setIsOpen(storedOpen);

        if (!storedOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [location.pathname]);

    const togglePopup = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        sessionStorage.setItem("chatOpen", newState);
        setIsVisible(!newState);
    };

    return (
        <>
            {isVisible && !isOpen && (
                <div className="assistant-icon" onClick={togglePopup}>
                    <img 
                        src="/src/assets/ai-assistant.png" 
                        alt="Assistant Icon" 
                        className="icon-image" 
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                    <div className="dots-container">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="speech-bubble">
                        {translations.assistant.iconMessage}
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="chat-popup-container slide-in-up">
                    <ChatPopup togglePopup={togglePopup} />
                </div>
            )}
        </>
    );
}

export default Icon;
