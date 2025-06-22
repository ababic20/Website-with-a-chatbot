import os
import tempfile
from datetime import datetime
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

async def process_pdfs(pdfs: list[UploadFile]):
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
                doc.metadata["uploaded_at"] = datetime.utcnow().isoformat()

            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            split_docs = splitter.split_documents(docs)
            all_docs.extend(split_docs)

    return all_docs
