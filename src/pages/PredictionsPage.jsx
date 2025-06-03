import '../styles/pages/PredictionsPage.css';

import PredictionCardSummary from '../components/PredictionCardSummary';

const PredictionsPage = () => {

  const mockPrediction = {
    stock: 'AAPL',
    cantidad: 10,
    precioAntiguo: 140.5,
    precioActual: 150.0,
    precioFuturo: 162.3,
    prediccionDinero: 1623.0,
  };

  return (
    <div className="predictions-page">
        <div className="predictions-title-wrapper">
            <h1 className="predictions-title">Predicciones</h1>
        </div>
        <div className="prediction-cards-container">
            <PredictionCardSummary prediction={mockPrediction} />
            <PredictionCardSummary prediction={mockPrediction} />
            <PredictionCardSummary prediction={mockPrediction} />
        </div>
    </div>
  );
};

export default PredictionsPage;
