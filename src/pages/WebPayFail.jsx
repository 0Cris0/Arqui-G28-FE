import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  return (
      <MessageBox>
        <p>Oh oh, falló la compra ._.</p>
        <p className="mensaje-secundario">
          Ver <Link to="/transactions" style={{ textDecoration: 'none', color: 'blue' }}>mis transacciones</Link>
        </p>
      </MessageBox>
    );
};

export default WebPayFail;
