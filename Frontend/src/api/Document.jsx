export async function fetchDocuments() {
    const res = await fetch("http://localhost:8000/documents");
    if (!res.ok) throw new Error("Failed to fetch documents");
    return await res.json();
}

export async function fetchStats() {
    const res = await fetch("http://localhost:8000/stats");
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
}

export async function deleteDocument(filename) {
    const res = await fetch(`http://localhost:8000/delete-document?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete document");
    return await res.json();
}

export async function uploadDocuments(files, sessionId) {
    const formData = new FormData();
    formData.append("session_id", sessionId);
    files.forEach(file => formData.append("pdfs", file));

    const res = await fetch("http://localhost:8000/upload-documents", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload documents");
    return await res.json();
}

export async function previewDocument(filename) {
    const res = await fetch(`http://localhost:8000/preview-document?filename=${encodeURIComponent(filename)}`);
    if (!res.ok) throw new Error("Failed to preview document");
    return await res.json();
}
