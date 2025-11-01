# AI Topic Visualizer

An interactive 3D visualization of news article topics using **FastAPI** (backend) and **React Three Fiber** (frontend).

## 🚀 Features
- FastAPI endpoint `/analyze` for URL-based topic extraction
- TF-IDF keyword extraction using scikit-learn
- React Three Fiber 3D word sphere with rotation & glow
- Animated, interactive visualization

## 🧩 Tech Stack
**Backend:** Python, FastAPI, BeautifulSoup, scikit-learn  
**Frontend:** React, Vite, Three.js, React Three Fiber, Drei, Framer Motion  

## ⚙️ Run Locally
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
