import React, { useState } from 'react';
import './Assistant.css';

function ChatPopup({ togglePopup }) {
    const [messages, setMessages] = useState([{ sender: "Assistant", text: "Hello! How can I help you today? 😊" }]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: "User", text: inputValue }]);
            setInputValue("");
        }
    };

    return (
        <>
            <div className="assistant-icon" onClick={togglePopup}>
            </div>
            <div className="chat-popup">
                <button className="close-button" onClick={togglePopup}>X</button>
                <h2 style={{ textAlign: "center" }}>AI Assistant</h2>
                <div className="chat-content">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-row ${msg.sender}`}>
                                {msg.sender === "Assistant" && (
                                    <div className="assistant-icon-message">
                                        <img
                                            src="\src\assets\ai-assistant.png" 
                                            alt="Assistant"
                                            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                                        />
                                    </div>
                                )}
                                <div className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                 
                    <div className="input-area">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Write a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatPopup;
