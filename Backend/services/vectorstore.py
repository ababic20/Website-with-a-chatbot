import os
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

VECTORSTORE_DIR = "vectorstore"

def load_vectorstore():
    embeddings = OpenAIEmbeddings()
    if not os.path.exists(VECTORSTORE_DIR):
        raise FileNotFoundError("Vectorstore not found.")
    return FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)

def get_or_create_vectorstore(all_docs):
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
        raise ValueError("No documents provided and vectorstore doesn't exist.")

    return db

def delete_file_from_vectorstore(filename):
    try:
        db = load_vectorstore()
    except FileNotFoundError:
        return False

    remaining_docs = [
        doc for doc in db.docstore._dict.values()
        if doc.metadata.get("source") != filename
    ]

    if len(remaining_docs) == len(db.docstore._dict):
        return False

    embeddings = OpenAIEmbeddings()
    new_db = FAISS.from_documents(remaining_docs, embeddings)
    new_db.save_local(VECTORSTORE_DIR)
    return True
