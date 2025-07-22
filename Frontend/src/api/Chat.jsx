import { v4 as uuidv4 } from "uuid";

let sessionId = localStorage.getItem("chat_session_id");
if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("chat_session_id", sessionId);
}

export async function askAssistant(question, files = []) {
    const formData = new FormData();
    formData.append("question", question);
    formData.append("session_id", sessionId);

    if (files && files.length > 0) {
        files.forEach(file => formData.append("pdfs", file));
    }

    const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}
