import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import StonksLogo from '../assets/imgs/logo.webp';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Enviar los datos de registro al backend
      const responseRegister = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/session/signup`, {
        username,
        email,
        password
      });

      setMessage('Cuenta creada exitosamente');
      setError('');

      // Debuguiar
      // console.log('Registro exitoso', responseRegister.data);  

      const responseLogin = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/session/login`, {
        email: email,
        password: password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', responseLogin.data.access_token);

      // Redirigir a la página de Stocks
      location.replace('/stocks')

    } catch (error) {
      setMessage('');
      setError('Error al crear la cuenta');
      console.error('Error al registrar', error);
    }
  };

  // Función para redirigir al login
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className='contenedor_auth'>
      <div className='titulo_auth'>
        <img id='StonksLogo' src={StonksLogo} alt="Logo" />
        <h2>Registrarse</h2>
        
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
        
        <div className="register-link" style={{ marginTop: '20px' }}>
          <p>
            ¿Ya tienes una cuenta? 
            <span 
              onClick={handleLoginRedirect} 
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              ¡Ingresa aquí!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
