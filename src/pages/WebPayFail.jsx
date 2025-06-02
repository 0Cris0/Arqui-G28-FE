import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/webpay.css'
import '../styles/buttons.css';

// Componente MessageBox con la clase que diste
const MessageBox = ({ children }) => {
  return (
    <div className="contenedor_message">
      {children}
    </div>
  );
};

export const WebPayFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token
    if (!token) {
      navigate('/login'); // Redirigimos si no hay token
    }
  }, [navigate]);

  return <MessageBox> Oh oh, falló la compra ._.</MessageBox>;
};

export default WebPayFail;
