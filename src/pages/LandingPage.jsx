import { useState } from 'react'
import reactLogo from '../assets/imgs/img1.webp'
import viteLogo from '/vite.svg'

function LandingPage() {
  const [count, setCount] = useState(0)
  return (
    <>
          <div>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">
              <img src={reactLogo} className="img_v1" alt="React logo" />
            </a>
            
          </div>
          
          <h1>Bienvenido a LegitStonks</h1>
          <h3>Tu herramienta preferida para el mercado de acciones</h3> 
          <p>-- Testeando Landing</p>
          <a href="/us" target="_blank">Nuestro equipo</a>
    {/*       <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div> */}
        </>
  );
}

export default LandingPage;