import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext"; 
import './DocumentManager.css';

function DocumentManager() {
    const { translations } = useContext(LanguageContext);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

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

    useEffect(() => {
        fetchDocuments();
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
        } catch (err) {
            console.error("Error deleting document:", err);
            alert("Error while deleting.");
        }
    };

    const handleUpload = async () => {
        if (uploadFiles.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("question", "dummy");
        uploadFiles.forEach(file => formData.append("pdfs", file));

        try {
            const res = await fetch("http://localhost:8000/ask", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            alert(" " + translations.documentManager.uploadSuccess);
            setUploadFiles([]);
            fetchDocuments();
        } catch (err) {
            console.error("Error uploading:", err);
            alert("Error while uploading.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="document-manager-wrapper">
            <aside className="sidebar-left">
                <h4>{translations.documentManager.statistics}</h4>
                <ul>
                    <li>{translations.documentManager.total}: {documents.length}</li>
                    <li>
                        {translations.documentManager.lastAdded}:
                        <span className="last-document">{documents.slice(-1)[0] || "—"}</span>
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
                                <span className="document-name">{doc}</span>
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
                        accept="application/pdf"
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
            </aside>
        </div>
    );
}

export default DocumentManager;
