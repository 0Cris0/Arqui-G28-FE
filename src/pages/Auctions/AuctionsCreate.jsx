import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { createAuction } from '../../helpers/postAuction';

import '../../styles/pages/auctionsPage.css';
import '../../styles/buttons.css';

function AuctionsCreatePage() {
  const { id } = useParams(); // ReservedStock ID
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState('');
  const [stockInfo, setStockInfo] = useState({ symbol: '', available: 0 });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReservedStock = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admins/reservedstocks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { symbol, quantity } = response.data;
        setStockInfo({ symbol, available: quantity });
      } catch (err) {
        console.error('Error fetching reserved stock:', err);
        setError('No se pudo obtener la información del stock.');
      }
    };

    fetchReservedStock();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1 || qty > stockInfo.available) {
      setError('Cantidad inválida.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const result = await createAuction(token, id, qty);
      if (result && result.id) {
        setSuccess(true);
        setError(null);
        setTimeout(() => navigate(`/auctions/${result.id}`), 1500);
      }
    } catch (err) {
      console.error(err);
      setError('Error al crear la subasta.');
      setSuccess(false);
    }
  };

  return (
    <>
      <br /><br /><br /><br /><br />
      <div className="titulo-page">
        <h1>Crear Subasta</h1>
      </div>

      <Container className="contenedor_stock_general">
        <Row className="mb-4">
          <Col>
            <p className="titulo_stock">
              <b>Stock:</b> {stockInfo.symbol}
            </p>
            <p className="titulo_stock">
              <b>Disponible:</b> {stockInfo.available}
            </p>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="auctionQuantity">
            <Form.Label column sm={2} className="titulo_stock">
              Cantidad:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                min={1}
                max={stockInfo.available}
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
          </Form.Group>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'greenyellow' }}>Subasta creada con éxito!</p>}

          <div className="text-end">
            <Button type="submit" variant="primary">
              Crear
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AuctionsCreatePage;
