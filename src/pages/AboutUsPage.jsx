import reactLogo from '../assets/imgs/img1.webp'
import Button from "react-bootstrap/Button";
import React from "react";

import '../styles/buttons.css'

function AboutUsPage() {
  return (
    <>
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="img_v1" alt="React logo" />
        </a>
        
      </div>
      
      <h1>LegitStonks Team</h1>
      <lu>
        <li>Eduardo Soto</li>  
        <li>Benjamín Peña</li>  
        <li>Nicolás Maturana</li>   
        <li>Manuel Garretón</li>   
        <li>Cristóbal Albornoz</li>     
        
      </lu>

      <Button href='/' variant='opcion'>Inicio</Button>
    </>
  );
}

export default AboutUsPage;