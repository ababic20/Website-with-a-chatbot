import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from scraper import scrape_single_page, save_data, clean_filename
from urllib.parse import urlparse, urljoin
import os
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape():
    url = url_entry.get()
    selected_elements = []
    if var_links.get(): selected_elements.append("links")
    if var_headers.get(): selected_elements.append("headers")
    if var_images.get(): selected_elements.append("images")
    if var_paragraphs.get(): selected_elements.append("paragraphs")

    if not url or not selected_elements:
        messagebox.showwarning("Warning", "Please enter a URL and select at least one element to scrape.")
        return

    export_format = export_format_var.get()
    export_folder = filedialog.askdirectory(title="Select folder to save data")

    if not export_folder:
        return

    export_folder = os.path.join(export_folder, "scraped_data")
    os.makedirs(export_folder, exist_ok=True)

    visited = set()
    urls_to_scrape = set([url])

    try:
        main_response = requests.get(url, timeout=10)
        main_soup = BeautifulSoup(main_response.text, "html.parser")

        for a in main_soup.find_all("a", href=True):
            href = a.get("href")
            full_url = urljoin(url, href)
            if urlparse(full_url).netloc == urlparse(url).netloc:
                urls_to_scrape.add(full_url)

        total = len(urls_to_scrape)
        progress_bar["maximum"] = total
        count = 0

        combined_data = {}

        for u in urls_to_scrape:
            if u in visited:
                continue
            visited.add(u)

            data = scrape_single_page(u, selected_elements, var_translate.get())
            if data is None:
                continue

            combined_data[u] = {
                "meta": {
                    "scraped_at": datetime.utcnow().isoformat() + "Z",
                    "status": "success",
                    "url": u
                },
                **data
            }

            count += 1
            progress_bar["value"] = count
            root.update_idletasks()

        # Spremi sve u jedan fajl
        final_filename = clean_filename(url) + "_combined." + export_format
        final_path = os.path.join(export_folder, final_filename)
        save_data(final_path, combined_data, export_format)

        messagebox.showinfo("Success", f"Scraping completed.\nSaved to: {final_path}")

    except Exception as e:
        messagebox.showerror("Error", f"An error occurred:\n{e}")

# --- GUI ---
root = tk.Tk()
root.title("Web Scraper")
root.geometry("700x450")

tk.Label(root, text="Enter website URL:").grid(row=0, column=0, sticky="w")
url_entry = tk.Entry(root, width=60)
url_entry.grid(row=0, column=1, padx=5, pady=5)

var_links = tk.BooleanVar()
var_headers = tk.BooleanVar()
var_images = tk.BooleanVar()
var_paragraphs = tk.BooleanVar()
var_translate = tk.BooleanVar()

tk.Label(root, text="Elements to scrape:").grid(row=1, column=0, sticky="nw")
tk.Checkbutton(root, text="Links", variable=var_links).grid(row=1, column=1, sticky="w")
tk.Checkbutton(root, text="Headers (h1-h3)", variable=var_headers).grid(row=2, column=1, sticky="w")
tk.Checkbutton(root, text="Images", variable=var_images).grid(row=3, column=1, sticky="w")
tk.Checkbutton(root, text="Paragraphs (text)", variable=var_paragraphs).grid(row=4, column=1, sticky="w")
tk.Checkbutton(root, text="Translate to English", variable=var_translate).grid(row=5, column=1, sticky="w")

tk.Label(root, text="Export format:").grid(row=6, column=0, sticky="w")
export_format_var = tk.StringVar(value="json")
ttk.Combobox(root, textvariable=export_format_var, values=["json", "csv"], width=10).grid(row=6, column=1, sticky="w")

tk.Button(root, text="Start scraping", command=scrape).grid(row=7, column=1, pady=10, sticky="w")

progress_bar = ttk.Progressbar(root, orient="horizontal", length=500, mode="determinate")
progress_bar.grid(row=8, column=0, columnspan=2, pady=10)

root.mainloop()