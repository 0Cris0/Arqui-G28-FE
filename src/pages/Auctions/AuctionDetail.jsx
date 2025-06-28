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
  const formattedDate = new Date(auction.timestamp).toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(",", "");
const [date, time] = formattedDate.split(' ');
    const timeFormatted = time.slice(0, 5);
    const formattedTimestamp = `${date} (${timeFormatted})`;

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

      <div className="contenedor_stock_general">
          <Container className="contenedor_titulo_stock">
            <Row>
              <Col>
                <h2 className="titulo_stock">{auction.symbol}</h2>
              </Col>
              <Col className="text-end">
                <h2 id="operation">{auction.operation}</h2>
              </Col>
            </Row>
          </Container>

          <Container className="contenedor_info_stock">
            <Row>
              <Col>
                <p><b>Cantidad:</b> {auction.quantity || 'Pendiente'}</p>
                <p><b>Grupo:</b> {auction.group_id}</p>
                <p><b>Fecha:</b> {formattedTimestamp}</p>
              </Col>
            </Row>
            {/* Conditionally render buttons */}
            {auction.group_id !== 28 && auction.operation === 'offer' && (
              <div className="botones_auction">
                <Button
                  id="bTrue"
                  variant="success"
                  onClick={() => handleResponse(true)}
                  disabled={loading}
                  className="me-2"
                >
                  Aceptar
                </Button>
                <Button
                  id="bFalse"
                  variant="danger"
                  onClick={() => handleResponse(false)}
                  disabled={loading}
                >
                  Rechazar
                </Button>
              </div>
            )}
          </Container>
        </div>

    </>
  );
}

export default AuctionsPage;
