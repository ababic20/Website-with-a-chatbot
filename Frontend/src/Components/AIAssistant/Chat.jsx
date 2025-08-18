import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext";
import { askAssistant } from "../../api/Chat";
import ReactMarkdown from 'react-markdown';
import './ChatPopupLayout.css';
import './MessageStyles.css';
import './InputArea.css';
import './DarkMode.css';
import './Animations.css';
import './FloatingAssistantIcon.css';

function ChatPopup({ togglePopup }) {
    const { translations, language } = useContext(LanguageContext); 
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [isTyping, setIsTyping] = useState(false);

    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem("chatHistory");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                    return;
                }
            } catch (e) {}
        }

        if (translations.assistant?.startMessage) {
            const welcomeMsg = {
                sender: "Assistant",
                text: translations.assistant.startMessage,
                timestamp: new Date()
            };
            setMessages([welcomeMsg]);
        }
    }, [translations.assistant?.startMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        return () => clearTimeout(typingTimeoutRef.current); 
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            localStorage.setItem("darkMode", !prev);
            return !prev;
        });
    };

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = { sender: "User", text: inputValue, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(true);
        }, 700); 

        askAssistant(inputValue)
            .then(data => {
                const assistantReply = typeof data.answer === "string"
                    ? data.answer
                    : JSON.stringify(data.answer);
                setMessages(prev => [...prev, {
                    sender: "Assistant",
                    text: assistantReply,
                    timestamp: new Date()
                }]);
            })
            .catch(() => {
                setMessages(prev => [...prev, {
                    sender: "Assistant",
                    text: "Error processing request.",
                    timestamp: new Date()
                }]);
            })
            .finally(() => {
                clearTimeout(typingTimeoutRef.current);
                setIsTyping(false);
            });

        setInputValue("");
        resizeTextarea();
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
        resizeTextarea();
    };

    const clearHistory = () => {
        localStorage.removeItem("chatHistory");
        setMessages([{
            sender: "Assistant",
            text: translations.assistant.startMessage,
            timestamp: new Date()
        }]);
    };

    const handleSpeechInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hr' ? 'hr-HR' : 'en-US'; 
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;

        let finalTranscript = "";

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + " ";
                } else {
                    interimTranscript += transcript;
                }
            }
            setInputValue(finalTranscript + interimTranscript);
            resizeTextarea();   // 👈 sada će se textarea širiti i kod glasovnog unosa
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Speech recognition error: " + event.error);
        };

        recognition.onspeechend = () => recognition.stop();
        recognition.onend = () => console.log("Speech recognition ended.");

        recognition.start();
    };

    return (
      <div className={`chat-popup ${darkMode ? "dark" : ""}`}>
       <div className="chat-header">
        <h2 className="popup-title">{translations.assistant.title}</h2>
        
        <div className="chat-actions">
            <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌞' : '🌙'}
            </button>
            <button className="clear-history" onClick={clearHistory}>🗑️</button>
            <button className="close-button" onClick={togglePopup}>✖</button>
        </div>
        </div>

            <div className="chat-content">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-row ${msg.sender} fade-in`}>
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
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                <div className="timestamp">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
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

                    {isTyping && (
                        <div className="message-row Assistant fade-in typing-indicator">
                            <div className="assistant-icon-message">
                                <img
                                    src="/src/assets/ai-assistant.png"
                                    alt="Assistant"
                                    style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                                />
                            </div>
                            <div className="message Assistant">
                                <span className="typing-dots">
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </span>
                            </div>
                        </div>
                    )}

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
                    <button onClick={handleSpeechInput} title="Speak">🎤</button>
                    <button onClick={sendMessage}>
                        {translations.assistant.sendButton}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPopup;
