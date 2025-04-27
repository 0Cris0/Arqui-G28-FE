import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
