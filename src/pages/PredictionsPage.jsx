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
    <div className="request-container">
      <h1 className="title">Predicciones</h1>
        <PredictionCardSummary prediction={mockPrediction} />
    </div>
  );
};

export default PredictionsPage;
