import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import StonksLogo from '../assets/imgs/logo.webp';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      // Enviar las credenciales al backend para obtener el token
      const responseLogin = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/session/login`, {
        email: email,
        password: password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', responseLogin.data.access_token);

      // Redirigir a la página de Stocks
      location.replace('/stocks')

    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/signup'); // Redirige a la página de registro
  };

  return (
    <div className='contenedor_auth'>
      <div className='titulo_auth'>
        <img id='StonksLogo' src={StonksLogo} alt="Logo" />
        <h2>Iniciar sesión</h2>
        
        <p>Bienvenido de nuevo. Inicia sesión para continuar.</p>
      </div>
      <div className='form_auth'>
        <form onSubmit={handleLogin} className='formulario_auth'>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className='input_auth_txt'
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            className='input_auth_txt'
            required 
          />
          <Button type="submit" variant='form'>Iniciar sesión</Button>
        </form>

        <div className="register-link" style={{ marginTop: '20px' }}>
          <p>
            ¿No tienes una cuenta? 
            <span 
              onClick={handleRegisterRedirect} 
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              <></> ¡Regístrate!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
