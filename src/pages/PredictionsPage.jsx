import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/PredictionsPage.css';
import PredictionCardSummary from '../components/PredictionCardSummary';
import { getPredictions } from '../helpers/getPredictions';
import { useCurrentUser } from '../helpers/useCurrentUser';

const PredictionsPage = () => {
  //const user = await useCurrentUser();
  const { user, loadingUser, error } = useCurrentUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    getPredictions(userId)
      .then(data => setPredictions(data))
      .catch(err => console.error('Error loading predictions:', err));
  }, [user, userId, navigate]);

  return (
    <div className="predictions-page">
      <div className="predictions-title-wrapper">
        <h1 className="predictions-title">Predicciones</h1>
      </div>
      <div className="prediction-cards-container">
        {predictions.length > 0 ? (
          predictions.map((prediction, index) => (
            <PredictionCardSummary key={index} prediction={prediction} />
          ))
        ) : (
          <p className="no-predictions-text">No hay predicciones aún</p>
        )}
      </div>
    </div>
  );
};

export default PredictionsPage;
