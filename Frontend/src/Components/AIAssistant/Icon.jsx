import React, { useState } from 'react';
import ChatPopup from './Chat'
import './Assistant.css';

function Icon() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="assistant-icon" onClick={togglePopup}>
                <img src="\src\assets\ai-assistant.png" 
                alt="Assistant Icon" className="icon-image" 
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}/>
            </div>
            {isOpen && <ChatPopup togglePopup={togglePopup} />}
        </>
    );
}

export default Icon;
