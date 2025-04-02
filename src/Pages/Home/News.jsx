import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";  // Import the CSS file for styling

const StockSentiment = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch random stock news articles
  const fetchNews = async () => {
    const apiKey = "60534c47b58641b8adbaf3189387baa2";  // Replace with your NewsAPI key
    // const url = "https://newsapi.org/v2/everything?q=stock&apiKey=60534c47b58641b8adbaf3189387baa2"; // No specific stock symbol
    // const response = await axios.get(url);
    // return response.data.articles; // Get 10 random articles
    const randomQueries = ["stocks", "investing", "market", "finance", "business"]; // Random words
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)]; // Pick one
    const url = `https://newsapi.org/v2/everything?q=${randomQuery}&sortBy=relevancy&apiKey=${apiKey}`; 
  
    const response = await axios.get(url);
    const articles = response.data.articles;
    
    return articles.sort(() => Math.random() - 0.5);
  };

  // Function to send articles to backend for sentiment analysis
  const fetchSentimentData = async (articles) => {
    try {
      const response = await axios.post("http://localhost:5000/sentiment", {
        articles: articles,
      });
      setStockData(response.data); // Set the sentiment and articles data
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const articles = await fetchNews(); // Fetch random stock news
      fetchSentimentData(articles); // Get sentiment analysis for the articles
    };

    loadData();
  }, []);

  // Function to determine color based on sentiment score
  const getColor = (sentiment) => {
    if (sentiment === undefined || sentiment === null) {
      return "gray";  // Default color for invalid sentiment
    }
    if (sentiment >= 70) return "green"; // Positive sentiment
    if (sentiment <= 40) return "red";   // Strong negative sentiment
    if (sentiment <= 55) return "orange"; // Neutral to slightly negative
    return "yellow";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="news-container">
      <h1>Stock Sentiment</h1>
      {stockData && stockData.articles && (
        <div className="news-list">
          <h3>Top 10 Random Stock News:</h3>
          <ul>
            {stockData.articles.slice(0, 10).map((article, index) => {
              const sentiment = stockData.sentiments[index];
              const color = getColor(sentiment); // Get color based on sentiment score
              return (
                <li key={index} className="news-item">
                  <div
                    className="sentiment-circle"
                    style={{
                      backgroundColor: color, // Green or red circle
                    }}
                  ></div>
                  <div className="news-details">
                    <span className="news-title">{article.title}</span>
                    <span className="news-source">Source: {article.source.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSentiment; 