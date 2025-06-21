import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
import tempfile
from dotenv import load_dotenv

load_dotenv()

VECTORSTORE_DIR = "vectorstore"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask_pdf(
    question: str = Form(...),
    pdfs: list[UploadFile] = File(None) 
):
    temp_dir = tempfile.TemporaryDirectory()
    all_docs = []

    if pdfs:
        for pdf in pdfs:
            temp_path = os.path.join(temp_dir.name, pdf.filename)
            with open(temp_path, "wb") as f:
                f.write(await pdf.read())

            loader = PyPDFLoader(temp_path)
            docs = loader.load()

            for doc in docs:
                doc.metadata["source"] = pdf.filename

            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            split_docs = splitter.split_documents(docs)
            all_docs.extend(split_docs)

    embeddings = OpenAIEmbeddings()

    if os.path.exists(VECTORSTORE_DIR):
        db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
        if all_docs:
            db.add_documents(all_docs)
            db.save_local(VECTORSTORE_DIR)
    elif all_docs:
        db = FAISS.from_documents(all_docs, embeddings)
        db.save_local(VECTORSTORE_DIR)
    else:
        return {"answer": "No data available. Upload at least one PDF."}

    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-3.5-turbo-16k")
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

    response = qa_chain.run(question)

    return {"answer": response, "message": "PDF document successfully added and indexed."}

@app.get("/documents")
def list_documents():
    embeddings = OpenAIEmbeddings()

    if not os.path.exists(VECTORSTORE_DIR):
        return {"documents": []}

    db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)

    sources = set()
    for doc in db.docstore._dict.values():
        if "source" in doc.metadata:
            sources.add(doc.metadata["source"])

    return {"documents": list(sources)}

from fastapi import HTTPException

@app.delete("/delete-document")
def delete_document(filename: str):
    embeddings = OpenAIEmbeddings()

    if not os.path.exists(VECTORSTORE_DIR):
        raise HTTPException(status_code=404, detail="Vectorstore not found.")

    db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)

    remaining_docs = [
        doc for doc in db.docstore._dict.values()
        if doc.metadata.get("source") != filename
    ]

    if len(remaining_docs) == len(db.docstore._dict):
        raise HTTPException(status_code=404, detail=f"No document found with source: {filename}")

    new_db = FAISS.from_documents(remaining_docs, embeddings)
    new_db.save_local(VECTORSTORE_DIR)

    return {"status": "success", "message": f"Deleted document: {filename}"}

@app.get("/stats")
def get_stats():
    embeddings = OpenAIEmbeddings()
    if not os.path.exists(VECTORSTORE_DIR):
        return {
            "total_documents": 0,
            "total_chunks": 0,
            "last_added": "—"
        }

    db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
    docs = list(db.docstore._dict.values())

    sources = [doc.metadata.get("source", "Nepoznato") for doc in docs]
    last_added = sources[-1] if sources else "—"

    return {
        "total_documents": len(set(sources)),
        "total_chunks": len(docs),
        "last_added": last_added
    }