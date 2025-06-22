import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import time

BASE_URL = "https://lodz.pl"
START_PAGE_URL = "https://lodz.pl/aktualnosci/strona/{}/"
HEADERS = {"User-Agent": "Mozilla/5.0"}
MAX_ARTICLES = 1000

def get_articles_from_page(page_num):
    """Get all articles from one aktualnosci page"""
    url = START_PAGE_URL.format(page_num)
    try:
        resp = requests.get(url, headers=HEADERS)
        resp.encoding = 'utf-8'  
        soup = BeautifulSoup(resp.text, "html.parser")
    except Exception as e:
        print(f"[!] Error on page {page_num}: {e}")
        return []

    article_blocks = soup.select("div.article-item")
    articles = []

    for block in article_blocks:
        title_tag = block.select_one("h3.article-item__title a")
        date_tag = block.select_one("meta[itemprop='datePublished']")
        image_tag = block.select_one("figure img")

        if title_tag:
            article_url = urljoin(BASE_URL, title_tag["href"])
            title = title_tag.get_text(strip=True)
            date = date_tag["content"] if date_tag else "Unknown"
            image_url = urljoin(BASE_URL, image_tag["src"]) if image_tag else ""

            articles.append({
                "title": title,
                "url": article_url,
                "date": date,
                "image_url": image_url
            })
    return articles

def get_article_content(article_url):
    """Extract full article text"""
    try:
        resp = requests.get(article_url, headers=HEADERS)
        resp.encoding = 'utf-8'  
        soup = BeautifulSoup(resp.text, "html.parser")

        possible_containers = [
            soup.select_one("div.ce-bodytext"),
            soup.select_one("article"),
            soup.select_one("main")
        ]
        for container in possible_containers:
            if container:
                paragraphs = [p.get_text(strip=True) for p in container.select("p") if p.get_text(strip=True)]
                if paragraphs:
                    return "\n".join(paragraphs)
    except Exception as e:
        print(f"[!] Error fetching content: {article_url} -> {e}")
    return "EMPTY"

def main():
    results = []
    page = 1

    while len(results) < MAX_ARTICLES:
        articles = get_articles_from_page(page)
        if not articles:
            break

        for article in articles:
            if len(results) >= MAX_ARTICLES:
                break
            article["content"] = get_article_content(article["url"])
            results.append(article)
            print(f"[+] Scraped: {len(results)} / {MAX_ARTICLES}")
            time.sleep(0.5)

        page += 1

    with open("lodz_articles.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\nDone. Saved {len(results)} articles to 'lodz_articles.json'.")

if __name__ == "__main__":
    main()
