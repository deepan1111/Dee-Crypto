import React from 'react'
import '../Home/Home.css'
const Home = () => {
  return (
    <div className='home'>
      <div className="hro">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p className='h-content'>Welcome to the world's largest cryptocurrency marketplace. <br/>Sign up to explore more about cryptos.</p>
        <form >
          <input type="text" placeholder='Search...' />
          <button type='submit'>Search</button>
        </form>

        <div className="crypto-table">
          <div className="t-layout">
            <p>hello</p>
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24H Change</p>
            <p>Market Cap</p>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default Home