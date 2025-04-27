import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import StonksLogo from '../assets/imgs/logo.webp';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend para obtener el token
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/session/login`, {
        email: email,
        password: password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      console.log('Login exitoso', response.data);

    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className='contenedor_auth'>
      <div className='titulo_auth'>
        <img id='StonksLogo' src={StonksLogo}></img>
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
      </div>
      
    </div>
  );
};

export default LoginPage;
