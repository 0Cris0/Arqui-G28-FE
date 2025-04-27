import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import StonksLogo from '../assets/imgs/logo.webp';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Enviar los datos de registro al backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/session/register`, {
        username,
        email,
        password
      });

      setMessage('Cuenta creada exitosamente');
      console.log('Cuenta creada exitosamente')
      setError('');

      // Aquí puedes redirigir al usuario al login o hacer algo más
    } catch (error) {
      setMessage('');
      setError('Error al crear la cuenta');
      console.error('Error al registrar', error);
    }
  };

  return (
    <div className='contenedor_auth'>
      <div className='titulo_auth'>
        <img id='StonksLogo' src={StonksLogo}></img>
        <h2>Sign-up</h2>
        
        <p>Bienvenido, registrate para continuar.</p>
      </div>
      <div className='form_auth'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSignUp} className='formulario_auth'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            className='input_auth_txt'
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
            className='input_auth_txt'
            required
          />
          <Button type="submit" variant='form'>Registrarse</Button>
        </form>
     </div> 
    </div>
  );
};

export default SignUpPage;
