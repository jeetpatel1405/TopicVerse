from sklearn.feature_extraction.text import TfidfVectorizer
import re

def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.lower()

def extract_topics(text):
    cleaned = clean_text(text)
    vectorizer = TfidfVectorizer(stop_words='english', max_features=50)
    X = vectorizer.fit_transform([cleaned])
    words = vectorizer.get_feature_names_out()
    scores = X.toarray().flatten()
    ranked = sorted(zip(words, scores), key=lambda x: x[1], reverse=True)
    return [{"word": w, "weight": round(float(s), 4)} for w, s in ranked[:30]]
