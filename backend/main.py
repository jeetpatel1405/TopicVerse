from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.crawler import fetch_article_text
from models.topic_model import extract_topics

app = FastAPI()

origins = [
    "http://localhost:5173",   # Vite dev server
    "http://127.0.0.1:5173"    # sometimes vite uses this
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLRequest(BaseModel):
    url: str

@app.post("/analyze")
def analyze_article(request: URLRequest):
    try:
        text = fetch_article_text(request.url)
        topics = extract_topics(text)
        return {"topics": topics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
