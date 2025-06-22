from fastapi import APIRouter, UploadFile, File, Form
from services.pdf_handler import process_pdfs
from services.vectorstore import get_or_create_vectorstore
from services.qa import get_qa_chain

router = APIRouter()

@router.post("/ask")
async def ask_pdf(
    question: str = Form(...),
    pdfs: list[UploadFile] = File(None)
):
    all_docs = await process_pdfs(pdfs)
    db = get_or_create_vectorstore(all_docs)
    qa_chain = get_qa_chain(db)
    response = qa_chain.run(question)

    return {"answer": response, "message": "PDF document successfully added and indexed."}
