import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import time

BASE_URL = "https://lodz.travel"
visited_urls = set()

def get_soup(url):
    print(f"Fetching: {url}")
    try:
        res = requests.get(url, headers={
            "User-Agent": "Mozilla/5.0"
        })
        res.encoding = 'utf-8'
        return BeautifulSoup(res.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching page: {e}")
        return None

def parse_menu(ul_tag, level=1):
    data = []
    for li in ul_tag.find_all("li", recursive=False):
        a_tag = li.find("a", recursive=False)
        if not a_tag:
            continue
        title = a_tag.text.strip()
        href = urljoin(BASE_URL, a_tag["href"])
        print(f"{'  ' * (level-1)}🔗 ({level}) {title} -> {href}")
        node = {
            "title": title,
            "url": href,
            "content": "",
        }
        sub_ul = li.find("ul")
        if sub_ul:
            node["subcategories"] = parse_menu(sub_ul, level + 1)
        data.append(node)
    return data

def fill_content_recursively(data):
    for item in data:
        if item["url"] in visited_urls:
            continue
        visited_urls.add(item["url"])

        print(f"\nRetrieving content for: {item['title']}")
        soup = get_soup(item["url"])
        if not soup:
            continue

        content_div = soup.select_one("div.ce-bodytext")
        if content_div:
            item["content"] = content_div.get_text(separator="\n", strip=True)
            print(f"Content retrieved successfully ({len(item['content'])} characters)")

            sub_links = []
            for a in content_div.find_all("a", href=True):
                href = urljoin(BASE_URL, a["href"])
                if BASE_URL in href and href not in visited_urls:
                    title = a.get_text(strip=True)
                    if title:
                        sub_links.append({
                            "title": title,
                            "url": href,
                            "content": ""
                        })

            if sub_links:
                print(f"Found {len(sub_links)} internal subpages inside: {item['title']}")
                item["subcategories"] = sub_links
                fill_content_recursively(sub_links)

        if "subcategories" in item:
            fill_content_recursively(item["subcategories"])

def count_total_items(data):
    count = 0
    for item in data:
        count += 1
        if "subcategories" in item:
            count += count_total_items(item["subcategories"])
    return count

def main():
    start_url = "https://lodz.travel/turystyka/"
    soup = get_soup(start_url)
    aside_nav = soup.select_one("ul.aside-nav")
    if not aside_nav:
        print("Navigation not found! Check the URL or HTML structure.")
        return

    print("Parsing main navigation...")
    structured_data = parse_menu(aside_nav)

    print("\nFetching content from all pages...")
    fill_content_recursively(structured_data)

    with open("lodz_content.json", "w", encoding="utf-8") as f:
        json.dump(structured_data, f, indent=2, ensure_ascii=False)

    total = count_total_items(structured_data)
    print(f"\n📦 Total records extracted: {total}")
    print("✅ Done! Data saved to: lodz_content.json")

if __name__ == "__main__":
    main()
