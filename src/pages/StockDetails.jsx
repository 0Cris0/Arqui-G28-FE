import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const StockDetails = () => { // Stock de ejemplo hardcodeado
  const stock = {
    symbol: "AAPL",
    price: 150.75,
    longName: "Apple Inc.",
    quantity: 100,
    timestamp: new Date().toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(",", ""),
  };

  const [quantity, setQuantity] = useState(1); // Cantidad que el usuario quiere comprar
  const [purchaseStatus, setPurchaseStatus] = useState(null); // Estado para mostrar el resultado de la compra
  const [purchaseHistory, setPurchaseHistory] = useState([  // Hardcodeamos el historial de compras
    {
      date: "2025-04-20 (15:30:00)",
      quantity: 10,
      status: "Compra exitosa",
    },
    {
      date: "2025-04-21 (10:15:45)",
      quantity: 5,
      status: "Compra exitosa",
    },
  ]); // Array para el historial de compras
  const [showHistory, setShowHistory] = useState(false); // Estado para controlar la visibilidad del historial

  const handlePurchase = () => {
    if (quantity <= stock.quantity) {
      setPurchaseStatus('Compra exitosa');
      // Simulamos que la compra fue exitosa agregando al historial
      const newPurchase = {
        date: new Date().toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).replace(",", ""),
        quantity,
        status: 'Compra exitosa',
      };
      setPurchaseHistory([newPurchase, ...purchaseHistory]); // Agregar la nueva compra al inicio del historial
      // Esto habria que sacarlo, pq luego el historial es una consulta de las compras que s ehan hecho hacia ese stock.
    }
    else {
      setPurchaseStatus('Error: No hay suficiente stock disponible');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory); // Alternar la visibilidad del historial
  };

  return (
    <div key={stock.symbol}>
      <Container>
        <h2>{stock.symbol}</h2>
        <h3>${stock.price}</h3>

        <Row>
          <p><b>Empresa:</b> {stock.longName}</p>
          <p><b>Disponible:</b> {stock.quantity}</p>
          <p><b>Última actualización:</b> {stock.timestamp}</p>
        </Row>

        <Row>
          <Col>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={stock.quantity} // No puede comprar más de lo disponible
                className="form-control"
              />
            </div>
          </Col>
          <br/>
          <Col>
            <Button onClick={handlePurchase} variant="success">Comprar</Button>
          </Col>
        </Row>

        {purchaseStatus && <div>{purchaseStatus}</div>} {/* Muestra el estado de la compra */}

        {/* Botón para mostrar u ocultar el historial */}
        <Button onClick={toggleHistory} variant="info" style={{ marginTop: '20px' }}>
          {showHistory ? "Ocultar historial" : "Ver historial"}
        </Button>

        {/* Mostrar el historial solo si el estado showHistory es true */}
        {showHistory && (
          <div style={{ marginTop: '20px' }}>
            <h3>Historial de Compras</h3>
            <ul>
              {purchaseHistory.map((purchase, index) => (
                <li key={index}>
                  <b>Fecha:</b> {purchase.date} <b>Cantidad:</b> {purchase.quantity} <b>Status:</b> {purchase.status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

export default StockDetails;
