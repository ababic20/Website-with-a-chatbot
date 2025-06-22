from fastapi import APIRouter, HTTPException
from services.vectorstore import load_vectorstore, delete_file_from_vectorstore

router = APIRouter()

@router.get("/documents")
def list_documents():
    db = load_vectorstore()
    sources = set()
    for doc in db.docstore._dict.values():
        if "source" in doc.metadata:
            sources.add(doc.metadata["source"])
    return {"documents": list(sources)}

@router.delete("/delete-document")
def delete_document(filename: str):
    success = delete_file_from_vectorstore(filename)
    if not success:
        raise HTTPException(status_code=404, detail=f"No document found with source: {filename}")
    return {"status": "success", "message": f"Deleted document: {filename}"}
