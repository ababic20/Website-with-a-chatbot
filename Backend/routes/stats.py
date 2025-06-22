from fastapi import APIRouter
from services.vectorstore import load_vectorstore
from datetime import datetime

router = APIRouter()

@router.get("/stats")
def get_stats():
    db = load_vectorstore()
    docs = list(db.docstore._dict.values())

    docs_with_timestamps = [
        doc for doc in docs if "uploaded_at" in doc.metadata and "source" in doc.metadata
    ]

    if docs_with_timestamps:
        docs_sorted = sorted(docs_with_timestamps, key=lambda d: d.metadata["uploaded_at"])
        last_added = docs_sorted[-1].metadata["source"]
    else:
        last_added = "—"

    sources = {doc.metadata.get("source") for doc in docs if "source" in doc.metadata}

    return {
        "total_documents": len(sources),
        "total_chunks": len(docs),
        "last_added": last_added
    }
