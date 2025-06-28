import React, { useNavigate } from 'react-router-dom';
import '../styles/components/PredictionCardSummary.css';

const PredictionCardSummary = ({ prediction }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/prediction', { state: { prediction } });
  };

  return (
    <div className="prediction-card">
      <h2 className="prediction-title">{prediction.symbol}</h2>

      <div className="prediction-row">
        <span className="label">Cantidad:</span>
        <span className="value">{prediction.n_stocks}</span>
      </div>

      <div className="prediction-row">
        <span className="label">Precio actual:</span>
        <span className="value">${prediction.precio_actual}</span>
      </div>

      <div className="prediction-row">
        <span className="label">Predicción dinero:</span>
        <span className="value">${prediction.prediccion_dinero}</span>
      </div>

      <button className="prediction-button" onClick={handleClick}>Ver Predicción</button>
    </div>
  );
};

export default PredictionCardSummary;
