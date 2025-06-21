import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext";
import { askAssistant } from "../../api/Chat";
import './Assistant.css';

function ChatPopup({ togglePopup }) {
    const { translations } = useContext(LanguageContext);
    const [messages, setMessages] = useState([{ sender: "Assistant", text: "" }]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setMessages([{ sender: "Assistant", text: translations.assistant.startMessage }]);
    }, [translations.assistant.startMessage]);

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { sender: "User", text: inputValue }]);

        askAssistant(inputValue)
            .then(data => {
                setMessages(prev => [...prev, { sender: "Assistant", text: data.answer }]);
            })
            .catch(() => {
                setMessages(prev => [...prev, { sender: "Assistant", text: "Error processing request." }]);
            });

        setInputValue("");
    };

    return (
        <div className="chat-popup">
            <button className="close-button" onClick={togglePopup}>X</button>
            <h2 className="popup-title">{translations.assistant.title}</h2>

            <div className="chat-content">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-row ${msg.sender}`}>
                            {msg.sender === "Assistant" && (
                                <div className="assistant-icon-message">
                                    <img
                                        src="/src/assets/ai-assistant.png"
                                        alt="Assistant"
                                        style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                                    />
                                </div>
                            )}
                            <div className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                            {msg.sender === "User" && (
                                <div className="user-icon-message">
                                    <img
                                        src="/src/assets/user_icon.png"
                                        alt="User"
                                        style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={translations.assistant.inputPlaceholder}
                    />
                    <button onClick={sendMessage}>{translations.assistant.sendButton}</button>
                </div>
            </div>
        </div>
    );
}

export default ChatPopup;
