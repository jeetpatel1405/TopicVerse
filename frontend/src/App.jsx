import React, { useState } from "react";
import { motion } from "framer-motion";
import { analyzeArticle } from "./api";
import WordCloud3D from "./components/WordCloud3D";
import Loader from "./components/Loader";
import "./index.css";

function App() {
  const [url, setUrl] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

// Prebuilt sample article URLs
const sampleLinks = [
  {
    title: "⚔️ BBC – Defence of Donbas Town",
    url: "https://www.bbc.com/news/articles/crklljyx6mzo",
  },
  {
    title: "🤖 TechCrunch – OpenAI Launches Two ‘Open’ AI Reasoning Models",
    url: "https://techcrunch.com/2025/08/05/openai-launches-two-open-ai-reasoning-models/",
  },
  {
    title: "🗳️ NPR – Live U.S. Presidential Election Results",
    url: "https://apps.npr.org/2024-election-results/",
  },
  {
    title: "🇨🇦 BBC – Canada's Carney Apology to Trump Highlights",
    url: "https://www.bbc.com/news/articles/cy4007deg2qo",
  },
];



  // API call handler
  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setTopics([]);

    try {
      const data = await analyzeArticle(url);
      setTopics(data.topics || []);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Please check the URL or backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <motion.div
        className="main-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: "#00E5FF" }}>💬</span> TopicVerse{" "}
          <span style={{ fontSize: "1rem", color: "#5ce1e6" }}>
            — Explore the Universe of Ideas
          </span>
        </motion.h1>

        {/* URL Input */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a news article URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* Prebuilt URLs */}
        <div className="sample-links">
          <p style={{ color: "#aaa" }}>Or try one of these:</p>
          <div className="sample-buttons">
            {sampleLinks.map((item, i) => (
              <button
                key={i}
                className="sample-btn"
                onClick={() => {
                  setUrl(item.url);
                  handleAnalyze();
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Error / Loading / Output */}
        {error && <p className="error">{error}</p>}
        {loading && <Loader />}

        <div className="canvas-container">
          {!loading && topics.length > 0 && <WordCloud3D topics={topics} />}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
