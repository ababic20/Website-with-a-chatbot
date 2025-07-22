from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
import os
import json

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCUMENTS_DIR = os.path.abspath(os.path.join(BASE_DIR, "../Scraper/data"))

@router.get("/preview-document")
async def preview_document(filename: str = Query(...)):
    try:
        filepath = os.path.join(DOCUMENTS_DIR, filename)
        if not os.path.isfile(filepath):
            return JSONResponse(status_code=404, content={"error": "File not found."})

        if not filename.endswith(".json"):
            return JSONResponse(status_code=400, content={"error": "Only JSON preview is supported."})

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        preview = data
        if isinstance(data, list):
            preview = data[:10]
        elif isinstance(data, dict):
            preview = {k: data[k] for k in list(data)[:10]}

        return {"preview": preview}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
