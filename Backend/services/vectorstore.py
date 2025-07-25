import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEndpointEmbeddings  
from dotenv import load_dotenv

load_dotenv()

VECTORSTORE_DIR = "vectorstore"

def get_embeddings():
    api_key = os.getenv("HF_API_KEY")

    if not api_key:
        raise ValueError("HF_API_KEY is not set in the environment.")

    return HuggingFaceEndpointEmbeddings(
        model="sentence-transformers/all-MiniLM-L6-v2",
        huggingfacehub_api_token=api_key
    )

def load_vectorstore():
    if not os.path.exists(VECTORSTORE_DIR):
        raise FileNotFoundError("Vectorstore folder not found.")

    embeddings = get_embeddings()
    db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
    return db

def get_or_create_vectorstore(all_docs):
    embeddings = get_embeddings()

    if os.path.exists(VECTORSTORE_DIR):
        db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
        if all_docs:
            print(f"Adding {len(all_docs)} documents...")
            db.add_documents(all_docs)
            db.save_local(VECTORSTORE_DIR)
            print(f"Updated vectorstore. Total docs: {len(db.docstore._dict)}")
    elif all_docs:
        print(f"Creating vectorstore with {len(all_docs)} documents...")
        db = FAISS.from_documents(all_docs, embeddings)
        db.save_local(VECTORSTORE_DIR)
        print("Vectorstore created and saved.")
    else:
        raise ValueError("No documents to index and no vectorstore exists.")

    return db

def delete_file_from_vectorstore(filename):
    try:
        db = load_vectorstore()
    except FileNotFoundError:
        print("No vectorstore to delete from.")
        return False

    original_count = len(db.docstore._dict)
    remaining_docs = [
        doc for doc in db.docstore._dict.values()
        if doc.metadata.get("source") != filename
    ]

    if len(remaining_docs) == original_count:
        print(f"No document found with source: {filename}")
        return False

    print(f"Deleting document: {filename}")
    embeddings = get_embeddings()
    new_db = FAISS.from_documents(remaining_docs, embeddings)
    new_db.save_local(VECTORSTORE_DIR)
    print("Vectorstore updated after deletion.")
    return True
