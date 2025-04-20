import { useState } from 'react'
import reactLogo from './assets/imgs/img1.webp'
import viteLogo from '/vite.svg'
import './App.css'
import {StocksNavbar} from './components/navbar'

import Router from './router';

function App() {
  

  return (
    <>
    
    <StocksNavbar/> 
      <Router/>
    </>
  )
}

export default App
