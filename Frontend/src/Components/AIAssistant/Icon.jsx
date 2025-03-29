import React, { useState, useEffect } from 'react';
import ChatPopup from './Chat';
import './Assistant.css';

function Icon() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true); 
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const togglePopup = () => {
        if (isOpen) {
            setIsVisible(true); 
        } else {
            setIsVisible(false); 
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isVisible && (
                <div className="assistant-icon" onClick={togglePopup}>
                    <img 
                        src="\src\assets\ai-assistant.png" 
                        alt="Assistant Icon" 
                        className="icon-image" 
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                    {!isOpen && (
                        <>
                            <div className="dots-container">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                            <div className="speech-bubble">
                            Hey! Need help? If you do, click here and talk to me.
                            </div>
                        </>
                    )}
                </div>
            )}
            {isOpen && <ChatPopup togglePopup={togglePopup} />}
        </>
    );
}

export default Icon;