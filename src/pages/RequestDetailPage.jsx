import React, { useLocation } from 'react-router-dom';
import '../styles/pages/DetailPage.css';
import { formatDate } from '../helpers/formatDate';

const normalizeStatus = (status = '') =>
  status.toLowerCase().replace(/\s+/g, '_');

const RequestDetailPage = () => {
  const location = useLocation();
  const { request } = location.state || {};

  return (
    <div className="request-container">
      <h1 className="title">Detalles de la Transacción</h1>
      <div className="request-card">
        
        <div className="request-row">
          <span className="label">Operación:</span>
          <span className="value">{request?.operation}</span>
        </div>

        <div className="request-row">
          <span className="label">Stock:</span>
          <span className="value">{request?.symbol}</span>
        </div>

        <div className="request-row">
          <span className="label">Cantidad:</span>
          <span className="value">{request?.quantity}</span>
        </div>

        <div className="request-row">
          <span className="label">Fecha y hora:</span>
          <span className="value">{formatDate(request?.timestamp)}</span>
        </div>

        <div className="request-row">
          <span className="label">Estatus:</span>
          <span className={`value status-${normalizeStatus(request?.status)}`}>
            {request?.status}
          </span>
        </div>

      </div>

      <button className="download-button" disabled>
        Descargar boleta de compra
      </button>
    </div>
  );
};

export default RequestDetailPage;
