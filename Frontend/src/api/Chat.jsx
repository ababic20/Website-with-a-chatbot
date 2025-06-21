export async function askAssistant(question, files = []) {
    const formData = new FormData();
    formData.append("question", question);

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
