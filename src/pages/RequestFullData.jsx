import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pages/RequestFullData.css';

const RequestFullData = () => {
  const location = useLocation();
  const { id } = location.state || {};

  return (
    <div className="tabla_transacciones">
      <h2>Transacción ID:</h2>
      <p>{id}</p>
    </div>
  );
};

export default RequestFullData;
