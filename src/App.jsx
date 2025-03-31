import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home/Home"
import NavBar from "./Component/Navbar"
import {Routes,Route} from "react-router-dom"
import StockDetails from './Component/NewStock'

function App() {
 

  return (
    <div className='app'>

      <NavBar/>
      <Routes>
        <Route path= '/' element = {<Home/>}/>
        <Route path='/stock/:symbol' element={<StockDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
