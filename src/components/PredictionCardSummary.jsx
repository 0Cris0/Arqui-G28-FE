import '../styles/components/PredictionCardSummary.css';

const PredictionCardSummary = ({ prediction }) => {
  return (
    <div className="prediction-card">
      <h2 className="prediction-title">Stock: {prediction.stock}</h2>

      <div className="prediction-row">
        <span className="label">Cantidad:</span>
        <span className="value">{prediction.cantidad}</span>
      </div>

      <div className="prediction-row">
        <span className="label">Precio actual:</span>
        <span className="value">${prediction.precioActual}</span>
      </div>

      <div className="prediction-row">
        <span className="label">Predicción dinero:</span>
        <span className="value">${prediction.prediccionDinero}</span>
      </div>
    </div>
  );
};

export default PredictionCardSummary;
