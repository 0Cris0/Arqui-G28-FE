import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { putAuction } from '../../helpers/putAuction';

import '../../styles/pages/auctionsPage.css';
import '../../styles/buttons.css';
import { getAuctionById } from '../../helpers/getAuctions';

function AuctionsPage() {
  const { auctionId } = useParams(); // Auction ID
  const navigate = useNavigate();

  const [auction, setAuctionInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAuctionById(auctionId, token);
        setAuctionInfo(data);
      } catch (err) {
        console.error('Error fetching auction details:', err);
      }
    };
    fetchAuctionDetails();
  }, [auctionId]);

  const handleResponse = async (response) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
      await putAuction(token, auctionId, response);
      alert(`Subasta ${response ? 'aceptada' : 'rechazada'} correctamente`);
      navigate('/auctions');
    } catch (err) {
      console.error(`Error al responder:`, err);
      alert(`Error al ${response ? 'aceptar' : 'rechazar'} la subasta`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br /><br /><br /><br /><br />
      <div className="titulo-page">
        <h1>Detalles de la Subasta</h1>
      </div>

      <Container className="contenedor_stock_general">
        <Row className="mb-4">
          <Col>
            <p className="titulo_stock"><b>Stock:</b> {auction.symbol}</p>
            <p className="titulo_stock"><b>Cantidad:</b> {auction.quantity}</p>
            <p className="titulo_stock"><b>Grupo:</b> {auction.group_id}</p>
            <p className="titulo_stock"><b>Operación:</b> {auction.operation}</p>
            <p className="titulo_stock">
            <b>Fecha:</b>{' '}
            {auction.timestamp
                ? new Date(auction.timestamp).toLocaleString('es-CL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
                : 'N/A'}
            </p>


            {/* Conditionally render buttons */}
            {auction.group_id !== 28 && auction.operation === 'offer' && (
              <div className="mt-3">
                <Button
                  variant="success"
                  onClick={() => handleResponse(true)}
                  disabled={loading}
                  className="me-2"
                >
                  Aceptar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleResponse(false)}
                  disabled={loading}
                >
                  Rechazar
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AuctionsPage;
