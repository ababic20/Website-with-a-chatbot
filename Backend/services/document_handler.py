import os
import tempfile
import json
from datetime import datetime
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

async def process_documents(files: list[UploadFile]):
    if not files:
        return []

    temp_dir = tempfile.TemporaryDirectory()
    all_docs = []

    for file in files:
        temp_path = os.path.join(temp_dir.name, file.filename)
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        if file.filename.lower().endswith(".pdf"):
            loader = PyPDFLoader(temp_path)
            docs = loader.load()

        elif file.filename.lower().endswith(".json"):
            try:
                with open(temp_path, "r", encoding="utf-8") as f:
                    json_data = json.load(f)

                text = json.dumps(json_data, indent=2, ensure_ascii=False)
                docs = [Document(page_content=text, metadata={"source": file.filename})]
            except Exception as e:
                print(f"Greška prilikom parsiranja JSON-a: {file.filename} — {e}")
                continue

        else:
            print(f"Preskačem nepodržani format: {file.filename}")
            continue 

        for doc in docs:
            doc.metadata["source"] = file.filename
            doc.metadata["uploaded_at"] = datetime.utcnow().isoformat()

        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        split_docs = splitter.split_documents(docs)
        all_docs.extend(split_docs)

    return all_docs
