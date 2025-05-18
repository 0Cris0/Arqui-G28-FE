import { useState } from 'react'
import reactLogo from '../assets/imgs/img1.webp'
import Button from "react-bootstrap/Button";

import '../styles/buttons.css'

function AboutUsPage() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">
          <img src={reactLogo} className="img_v1" alt="React logo" />
        </a>
        
      </div>
      
      <h1>LegitStonks Team</h1>
      <lu>
        <li>Eduardo</li>  
        <li>Benjamín Peña</li>  
        <li>Nicolás</li>   
        <li>Manuel Garretón</li>   
        <li>Cristóbal Albornoz</li>     
        
      </lu>

      <Button href='/' variant='opcion'>Inicio</Button>
    </>
  );
}

export default AboutUsPage;