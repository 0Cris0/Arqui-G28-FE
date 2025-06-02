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

export const WebPayApprove = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token
    if (!token) {
      navigate('/login'); // Redirigimos si no hay token
    }
  }, [navigate]);

  return <MessageBox> ¡Se realizó la compra con exito! </MessageBox>;
};

export default WebPayApprove;
