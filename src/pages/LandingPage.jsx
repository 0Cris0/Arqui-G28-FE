import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import reactLogo from '../assets/imgs/img1.webp';

import '../styles/pages/landing.css'
import '../styles/buttons.css'

import { getHeartbeat } from '../helpers/getHeartbeat';

function LandingPage() {
  const [status, setStatus] = useState("CARGANDO...");

  useEffect(() => {
    async function fetchHeartbeat() {
      const heartbeat = await getHeartbeat();
      setStatus(heartbeat ? "ACTIVO" : "INACTIVO");
    }

    fetchHeartbeat();
  }, []);

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <div className="page-container">
        <div className="left-column">
          <div>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="img_v1" alt="Logo" />
            </a>
          </div>
          <br />
          <Button href='/aboutus' variant='opcion'>Nuestro equipo</Button>
        </div>
        
        <div className="right-column">
          <h1>Bienvenido a</h1>
          <h1 id="mega_title" className='title1'>LegitStonks</h1>
          <h3>Tu herramienta preferida para el mercado de acciones</h3> 
          <br />
          <div className='contenedor_ingreso active contenedor_ingreso'>
            <h3>Regístrate o inicia sesión para acceder a todas las funcionalidades</h3> 
            <Button href='/login' variant='detalle'>Log-in</Button>
            <Button href='/signup' variant='detalle'>Sign-up</Button>
          </div>

          <h3>Workers está <span className={status === "ACTIVO" ? "activo-text" : ""}>{status}</span></h3>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
