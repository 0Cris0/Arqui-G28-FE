import { useLocation } from 'react-router-dom';
import '../styles/pages/RequestFullData.css';

import { formatDate } from '../helpers/formatDate';

const RequestFullData = () => {
  const location = useLocation();
  const { request } = location.state || {};

  return (
    <div className="request-container">
      <h1 className="title">Detalles de la Solicitud</h1>
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
      </div>
    </div>
  );
};

export default RequestFullData;
