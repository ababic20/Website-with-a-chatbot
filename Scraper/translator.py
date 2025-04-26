from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor

def translate_text(text, from_lang="pl", to_lang="en"):
    try:
        return GoogleTranslator(source=from_lang, target=to_lang).translate(text)
    except Exception as e:
        print(f"Translation error: {e}")
        return text

def translate_texts_parallel(text_list, from_lang="pl", to_lang="en"):
    translated = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(translate_text, text, from_lang, to_lang) for text in text_list]
        for future in futures:
            translated.append(future.result())
    return translated
