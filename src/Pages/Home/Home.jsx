
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import News from "../Home/News"
const API_KEY = 'cvkn02pr01qtnb8tlqt0cvkn02pr01qtnb8tlqtg'; // Replace with your Finnhub API key
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'FB', 'NFLX', 'INTC', 'IBM'];

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const stockData = await Promise.all(
          STOCK_SYMBOLS.map(async (symbol) => {
            const response = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const stock = response.data;
            return stock && stock.c
              ? {
                  symbol: symbol,
                  price: stock.c.toFixed(2),
                  changePercent: stock.dp ? `${stock.dp.toFixed(2)}%` : 'N/A',
                }
              : null;
          })
        );
        setStocks(stockData.filter(stock => stock !== null));
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
      setLoading(false);
    };

    fetchStockData();
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol && stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = searchTerm
    ? [...filteredStocks].sort((a, b) =>
        a.symbol.toLowerCase().startsWith(searchTerm.toLowerCase())
          ? -1
          : b.symbol.toLowerCase().startsWith(searchTerm.toLowerCase())
          ? 1
          : 0
      )
    : filteredStocks;

  return (
    <div className='home'>
      <h1>Stock Market Tracker</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder='Search stocks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Loading stock data...</p>
      ) : (
        <div className="stock-table">
          <div className="table-header">
            <p>#</p>
            <p>Stock</p>
            <p>Price</p>
            <p>24H Change</p>
          </div>
          {sortedStocks.length > 0 ? (
            sortedStocks.map((stock, index) => (
              <div key={index} className="table-row">
                <p>{index + 1}</p>
                <p>
                  <Link to={`/stock/${stock.symbol}`} className="stock-link">{stock.symbol}</Link>
                </p>
                <p>${stock.price}</p>
                <p className={parseFloat(stock.changePercent) >= 0 ? 'positive' : 'negative'}>{stock.changePercent}</p>
              </div>
            ))
          ) : (
            <p className="no-data">No data available. Try again later.</p>
          )}
        </div>
      )}
      <News/>
      
    </div>
  );
};

export default Home;