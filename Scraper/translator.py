import json
from deep_translator import GoogleTranslator

INPUT_FILE = "lodz_articles_pl.json"
OUTPUT_FILE = "lodz_articles_en.json"

def translate_text(text, src="pl", target="en"):
    try:
        return GoogleTranslator(source=src, target=target).translate(text)
    except Exception as e:
        return f"[Translation Error] {text}"

def translate_node(node, counter, total):
    if "title" in node:
        node["title"] = translate_text(node["title"])
    if "content" in node and node["content"]:
        node["content"] = translate_text(node["content"])

    counter[0] += 1
    print(f"[{counter[0]}/{total}] translated")

    if "subcategories" in node:
        for sub in node["subcategories"]:
            translate_node(sub, counter, total)

def count_nodes(data):
    count = 0
    for item in data:
        count += 1
        if "subcategories" in item:
            count += count_nodes(item["subcategories"])
    return count

def main():
    print("Loading JSON...")
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    total = count_nodes(data)
    print(f"Translating {total} entries...")

    counter = [0]  # mutable counter
    for entry in data:
        translate_node(entry, counter, total)

    print("Saving translated JSON...")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Done! Translated file saved as: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
