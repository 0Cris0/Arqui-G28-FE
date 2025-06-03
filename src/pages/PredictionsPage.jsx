import '../styles/pages/PredictionsPage.css';

import PredictionCardSummary from '../components/PredictionCardSummary';

const PredictionsPage = () => {

  const mockPrediction = {
    symbol: 'AAPL',
    n_stocks: 10,
    precio_antiguo: 140.5,
    precio_actual: 150.0,
    prediccion_precio: 162.3,
    prediccion_dinero: 1623.0,
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
