import { useState } from 'react'
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
