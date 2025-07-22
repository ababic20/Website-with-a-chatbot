import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext";
import { askAssistant } from "../../api/Chat";
import './Assistant.css';

function ChatPopup({ togglePopup }) {
    const { translations } = useContext(LanguageContext);
    const [messages, setMessages] = useState([{ sender: "Assistant", text: "" }]);
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([{ sender: "Assistant", text: translations.assistant.startMessage }]);
    }, [translations.assistant.startMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = { sender: "User", text: inputValue };
        setMessages(prev => [...prev, userMessage]);

        askAssistant(inputValue)
            .then(data => {
                const assistantReply = typeof data.answer === "string"
                    ? data.answer
                    : JSON.stringify(data.answer);

                setMessages(prev => [...prev, { sender: "Assistant", text: assistantReply }]);
            })
            .catch(() => {
                setMessages(prev => [...prev, { sender: "Assistant", text: "Error processing request." }]);
            });

        setInputValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
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
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-area">
                    <textarea
                        ref={textareaRef}
                        className="chat-textarea"
                        value={inputValue}
                        onChange={handleInput}
                        placeholder={translations.assistant.inputPlaceholder}
                        rows={1}
                    />
                    <button onClick={sendMessage}>
                        {translations.assistant.sendButton}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPopup;
