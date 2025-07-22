import os
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

VECTORSTORE_DIR = "vectorstore"

def load_vectorstore():
    embeddings = OpenAIEmbeddings()
    if not os.path.exists(VECTORSTORE_DIR):
        raise FileNotFoundError("Vectorstore not found.")

    db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
    print(f"Vectorstore loaded. Number of docs: {len(db.docstore._dict)}")
    return db

def get_or_create_vectorstore(all_docs):
    embeddings = OpenAIEmbeddings()

    if os.path.exists(VECTORSTORE_DIR):
        db = FAISS.load_local(VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True)
        print(f"Existing vectorstore loaded. Current docs: {len(db.docstore._dict)}")

        if all_docs:
            print(f"Adding {len(all_docs)} new documents to vectorstore...")
            db.add_documents(all_docs)
            db.save_local(VECTORSTORE_DIR)
            print(f"Vectorstore updated. New total: {len(db.docstore._dict)}")
    elif all_docs:
        print(f"🆕 Creating new vectorstore with {len(all_docs)} documents...")
        db = FAISS.from_documents(all_docs, embeddings)
        db.save_local(VECTORSTORE_DIR)
        print("Vectorstore created and saved.")
    else:
        raise ValueError("No documents provided and vectorstore doesn't exist.")

    return db

def delete_file_from_vectorstore(filename):
    try:
        db = load_vectorstore()
    except FileNotFoundError:
        return False

    original_count = len(db.docstore._dict)
    remaining_docs = [
        doc for doc in db.docstore._dict.values()
        if doc.metadata.get("source") != filename
    ]

    if len(remaining_docs) == original_count:
        return False 

    embeddings = OpenAIEmbeddings()
    new_db = FAISS.from_documents(remaining_docs, embeddings)
    new_db.save_local(VECTORSTORE_DIR)
    print(f"Deleted '{filename}'. Remaining docs: {len(remaining_docs)}")
    return True
