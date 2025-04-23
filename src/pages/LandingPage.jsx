import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'; // Importamos el hook de Auth0
import reactLogo from '../assets/imgs/img1.webp';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

function LandingPage() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0(); // Usamos el hook de Auth0
  const [count, setCount] = useState(0);

  // Si aún estamos cargando la autenticación, no mostramos nada
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      
      {/* Si el usuario no está autenticado, mostramos los botones de Login y Register */}
      {!isAuthenticated ? (
        <div className='contenedor_ingreso'>
          <h3>Regístrate o inicia sesión para acceder a todas las funcionalidades</h3> 
          {/* <Button href='/login' variant='opcion'>Login</Button>
          <Button href='/register' variant='opcion'>Registrarse</Button> */}
          <LoginButton/>
        </div>
      ) : (
        // Si el usuario está autenticado, mostramos el nombre de usuario y el botón de Logout
        <div>
          <h3>Bienvenido, {user.name}!</h3>
          <LogoutButton />
        </div>
      )}
      
      <Button href='/nosotros' variant='opcion'>Nuestro equipo</Button>
    </div>
  );
}

export default LandingPage;
