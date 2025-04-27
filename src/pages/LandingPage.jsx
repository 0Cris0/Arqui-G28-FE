import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import reactLogo from '../assets/imgs/img1.webp';


function LandingPage() {
  return (
    <div>
      <div>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="img_v1" alt="Logo" />
        </a>
      </div>
      
      <h1>Bienvenido a</h1>
      <h1 id="mega_title">LegitStonks</h1>
      <h3>Tu herramienta preferida para el mercado de acciones</h3> 
      <br />
      
      <div className='contenedor_ingreso'>
        <h3>Regístrate o inicia sesión para acceder a todas las funcionalidades</h3> 
        <Button href='/login' variant='detalle'>Log-in</Button>
        <Button href='/register' variant='detalle'>Sign-up</Button>
      </div>


      
      <Button href='/nosotros' variant='opcion'>Nuestro equipo</Button>
    </div>
  );
}

export default LandingPage;
