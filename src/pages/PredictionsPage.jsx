import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../helpers/useCurrentUser';
import '../styles/pages/DetailPage.css';

const PredictionDetailPage = () => {
    const location = useLocation();
    const { prediction } = location.state || {};
    const { user, loadingUser } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingUser) return; // ⏳ Esperar a que termine de cargar
        if (!user) {
            navigate('/login');
        }
    }, [user, loadingUser, navigate]);

    if (!prediction) {
        return <div>No hay predicción disponible.</div>;
    }
  return (
        <div className="request-container">
            <h1 className="title">Predicción de {prediction.symbol}</h1>
            <div className="request-card">
                <div className="request-row">
                    <span className="label">Cantidad:</span>
                    <span className="value">{prediction.n_stocks}</span>
                </div>

                <div className="request-row price-block">
                    <span className="label price-label">Precio del Stock</span>
                    <div className="vertical-divider" />
                    <div className="value stacked-values improved-prices">
                        <div className="price-row">
                            <span className="sub-label">Antiguo:</span>
                            <span className="value">${prediction.precio_antiguo}</span>
                        </div>
                        <div className="price-row">
                            <span className="sub-label">Actual:</span>
                            <span className="value">${prediction.precio_actual}</span>
                        </div>
                        <div className="price-row">
                            <span className="sub-label">Predicción futura:</span>
                            <span className="value">${prediction.prediccion_precio}</span>
                        </div>
                    </div>
                </div>

                <div className="request-row">
                    <span className="label">Predicción del valor total futuro:</span>
                    <span className="value">${prediction.prediccion_dinero}</span>
                </div>
            </div>

            <span className="note">Las predicciones se calculan para dentro de un mes</span>
        </div>
    );
};

export default PredictionDetailPage;
