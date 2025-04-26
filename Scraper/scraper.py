import requests
from bs4 import BeautifulSoup
import json
import csv
import os
import hashlib
from urllib.parse import urlparse, urljoin
from translator import translate_text, translate_texts_parallel

def clean_filename(url):
    parsed = urlparse(url)
    name = parsed.netloc.replace(".", "_")
    hash_part = hashlib.md5(url.encode()).hexdigest()[:8]
    return f"{name}_{hash_part}"

def scrape_single_page(url, selected_elements, translate):
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        data = {}

        if "links" in selected_elements:
            links = [{"text": a.text.strip(), "href": a.get("href")} for a in soup.find_all("a", href=True)]
            if translate:
                for link in links:
                    link["text"] = translate_text(link["text"])
            data["links"] = links

        if "headers" in selected_elements:
            headers = []
            for tag in ["h1", "h2", "h3"]:
                headers += [{"tag": tag, "text": h.text.strip()} for h in soup.find_all(tag)]
            if translate:
                texts = [h["text"] for h in headers]
                translated_texts = translate_texts_parallel(texts)
                for i, header in enumerate(headers):
                    header["text"] = translated_texts[i]
            data["headers"] = headers

        if "images" in selected_elements:
            data["images"] = [{"src": img.get("src")} for img in soup.find_all("img")]

        if "paragraphs" in selected_elements:
            paragraphs = [p.get_text().strip() for p in soup.find_all("p") if p.get_text().strip()]
            if translate:
                paragraphs = translate_texts_parallel(paragraphs)
            data["paragraphs"] = [{"text": para} for para in paragraphs]

        return data
    except Exception as e:
        print(f"Error scraping page {url}: {e}")
        return None

def save_data(file_path, data, export_format):
    if export_format == "json":
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    elif export_format == "csv":
        with open(file_path, "w", newline='', encoding="utf-8") as f:
            writer = csv.writer(f)
            for key, items in data.items():
                writer.writerow([key.upper()])
                if isinstance(items, list):
                    if isinstance(items[0], dict):
                        writer.writerow(items[0].keys())
                        for item in items:
                            writer.writerow(item.values())
                    else:
                        for item in items:
                            writer.writerow([item])
                writer.writerow([])
