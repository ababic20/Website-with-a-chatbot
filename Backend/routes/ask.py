from fastapi import APIRouter, Form
from services.vectorstore import load_vectorstore
from services.qa import get_conversation_chain

router = APIRouter()

@router.post("/ask")
async def ask_document(
    question: str = Form(...),
    session_id: str = Form(...)
):
    try:
        db = load_vectorstore()
    except FileNotFoundError:
        return {"answer": "No documents are loaded yet. Please upload documents first."}

    qa_chain = get_conversation_chain(db, session_id)
    response = qa_chain.invoke({"question": question})

    print("== CHAT MEMORY ==")
    for msg in qa_chain.memory.chat_memory.messages:
        role = msg.type
        print(f"{role.upper()}: {msg.content}")

    answer = response["answer"] if isinstance(response, dict) else response

    return {
        "answer": answer
    }
