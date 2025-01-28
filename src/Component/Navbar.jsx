import React from 'react'
import "../Component/Navbar.css"
const Navbar = () => {
  return (
    <div className='hero'>
        <div className="logo">
            Dee'crypto
        </div>
        
        <div className="atag">
         <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
         </ul>
        
        </div>

        <div className="sliders">
            <select>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
            <button className='s1'>SignUp</button>
        </div>
    </div>
  )
}

export default Navbar