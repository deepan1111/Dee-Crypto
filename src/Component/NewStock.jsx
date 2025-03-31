import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StockDetails.css';


const API_KEY = 'cvkn02pr01qtnb8tlqt0cvkn02pr01qtnb8tlqtg'; // Replace with your Finnhub API key

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
      setLoading(false);
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) {
    return <p>Loading stock details...</p>;
  }

  if (!stockData || !stockData.c) {
    return <p>Stock data not available.</p>;
  }

  return (
    <div className="stock-details">
      <h1>{symbol} Stock Details</h1>
      <p><strong>Current Price:</strong> ${stockData.c.toFixed(2)}</p>
      <p><strong>Open Price:</strong> ${stockData.o.toFixed(2)}</p>
      <p><strong>High Price:</strong> ${stockData.h.toFixed(2)}</p>
      <p><strong>Low Price:</strong> ${stockData.l.toFixed(2)}</p>
      <p><strong>Previous Close:</strong> ${stockData.pc.toFixed(2)}</p>
    </div>
  );
};

export default StockDetails;
