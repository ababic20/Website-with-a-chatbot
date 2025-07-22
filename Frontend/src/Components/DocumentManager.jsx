import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import './DocumentManager.css';
import { v4 as uuidv4 } from "uuid";

let sessionId = localStorage.getItem("chat_session_id");
if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("chat_session_id", sessionId);
}

function DocumentManager() {
    const { translations } = useContext(LanguageContext);

    const [documents, setDocuments] = useState([]);
    const [stats, setStats] = useState({
        total_documents: 0,
        total_chunks: 0,
        last_added: "—"
    });
    const [loading, setLoading] = useState(true);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(null);

    const fetchDocuments = async () => {
        try {
            const res = await fetch("http://localhost:8000/documents");
            const data = await res.json();
            setDocuments(data.documents);
        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:8000/stats");
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
        fetchStats();
    }, []);

    const deleteDocument = async (filename) => {
        const confirmDelete = window.confirm(`${translations.documentManager.delete} ${filename}?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8000/delete-document?filename=${encodeURIComponent(filename)}`, {
                method: "DELETE"
            });
            const data = await res.json();
            alert(data.message || "Document deleted.");
            fetchDocuments();
            fetchStats();
            setSelectedPreview(null);
        } catch (err) {
            console.error("Error deleting document:", err);
            alert("Error while deleting.");
        }
    };

    const handleUpload = async () => {
        if (uploadFiles.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("session_id", sessionId); 
        uploadFiles.forEach(file => formData.append("pdfs", file));

        try {
            const res = await fetch("http://localhost:8000/upload-documents", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            alert(data.message || translations.documentManager.uploadSuccess);
            setUploadFiles([]);
            fetchDocuments();
            fetchStats();
        } catch (err) {
            console.error("Error uploading:", err);
            alert("Error while uploading.");
        } finally {
            setUploading(false);
        }
    };

    const handlePreview = async (filename) => {
        if (!filename.endsWith(".json")) return;

        try {
            const res = await fetch(`http://localhost:8000/preview-document?filename=${encodeURIComponent(filename)}`);
            const data = await res.json();
            if (res.ok) {
                setSelectedPreview({ filename, content: data.preview });
            } else {
                alert(data.error || "Error loading preview.");
            }
        } catch (error) {
            console.error("Error fetching preview:", error);
            alert("Error loading preview.");
        }
    };

    return (
        <div className="document-manager-wrapper">
            <aside className="sidebar-left">
                <h4>{translations.documentManager.statistics}</h4>
                <ul>
                    <li>{translations.documentManager.total}: {stats.total_documents}</li>
                    <li>{translations.documentManager.chunks}: {stats.total_chunks}</li>
                    <li>
                        {translations.documentManager.lastAdded}:
                        <span className="last-document">{stats.last_added || "—"}</span>
                    </li>
                </ul>
            </aside>

            <main className="document-manager">
                <h2>{translations.documentManager.title}</h2>

                {loading ? (
                    <p>{translations.documentManager.loading}</p>
                ) : documents.length === 0 ? (
                    <p>{translations.documentManager.noDocuments}</p>
                ) : (
                    <ul className="document-list">
                        {documents.map((doc, index) => (
                            <li key={index} className="document-item">
                                <span
                                    className="document-name clickable"
                                    onClick={() => handlePreview(doc)}
                                >
                                    {doc}
                                </span>
                                <button onClick={() => deleteDocument(doc)} className="delete-button">
                                    {translations.documentManager.delete}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <hr />

                <h3>{translations.documentManager.addTitle}</h3>
                <div className="upload-form">
                    <input
                        type="file"
                        accept=".pdf,.json"
                        multiple
                        onChange={(e) => setUploadFiles(Array.from(e.target.files))}
                    />
                    <button
                        onClick={handleUpload}
                        disabled={uploading || uploadFiles.length === 0}
                    >
                        {uploading ? translations.documentManager.uploading : translations.documentManager.upload}
                    </button>
                </div>

                {uploadFiles.length > 0 && (
                    <ul className="uploaded-list">
                        {uploadFiles.map((file, i) => (
                            <li key={i}> {file.name}</li>
                        ))}
                    </ul>
                )}
            </main>

            <aside className="sidebar-right">
                <h4>{translations.documentManager.info}</h4>
                <p>{translations.documentManager.infoText}</p>

                {selectedPreview && (
                    <div className="preview-box">
                        <h5>Preview: {selectedPreview.filename}</h5>
                        <pre>{JSON.stringify(selectedPreview.content, null, 2)}</pre>
                    </div>
                )}
            </aside>
        </div>
    );
}

export default DocumentManager;
