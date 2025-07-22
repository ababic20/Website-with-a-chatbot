from fastapi import APIRouter, UploadFile, File, Form
from services.document_handler import process_documents
from services.vectorstore import get_or_create_vectorstore

router = APIRouter()

@router.post("/upload-documents")
async def upload_documents(
    session_id: str = Form(...),
    pdfs: list[UploadFile] = File(...)
):
    all_docs = await process_documents(pdfs)

    if not all_docs:
        return {"message": "No valid documents processed."}

    get_or_create_vectorstore(all_docs)
    return {"message": f"Successfully uploaded and indexed {len(all_docs)} chunks."}
