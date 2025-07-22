from fastapi import APIRouter, UploadFile, File, Form
from services.document_handler import process_documents
from services.vectorstore import get_or_create_vectorstore
from services.qa import get_conversation_chain  

router = APIRouter()

@router.post("/ask")
async def ask_document(
    question: str = Form(...),
    session_id: str = Form(...),
    pdfs: list[UploadFile] = File(None)
):
    all_docs = await process_documents(pdfs)

    db = get_or_create_vectorstore(all_docs)

    qa_chain = get_conversation_chain(db, session_id)

    response = qa_chain.invoke({"question": question})

    print("== CHAT MEMORY ==")
    for msg in qa_chain.memory.chat_memory.messages:
        role = msg.type  
        print(f"{role.upper()}: {msg.content}")

    answer = response["answer"] if isinstance(response, dict) else response

    return {
    "answer": answer,
    "message": "Document(s) successfully added and indexed." if all_docs else "Question processed without document upload."
}

