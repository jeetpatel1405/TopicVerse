import requests
from bs4 import BeautifulSoup

def fetch_article_text(url: str) -> str:
    """Fetch article content and extract paragraphs"""
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch: {url}")
    soup = BeautifulSoup(response.text, "html.parser")
    paragraphs = soup.find_all("p")
    text = " ".join(p.get_text() for p in paragraphs)
    return text
