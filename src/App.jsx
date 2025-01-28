import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home/Home"
import NavBar from "./Component/Navbar"
import {Routes,Route} from "react-router-dom"
import Coin from "./Pages/Coins/coins"
function App() {
 

  return (
    <div className='app'>

      <NavBar/>
      <Routes>
        <Route path= '/' element = {<Home/>}/>
        <Route path='/coins/:coinId' element={<Coin/>}/>
      </Routes>
    </div>
  )
}

export default App
