import React, { useState } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';

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
    <>
    <div className='contenedor_stock'>
      <div key={stock.symbol} className="contenedor_detalles_stock">
        <div className="titulo_detalles_stock">
          <h2>{stock.symbol}</h2>
          <h2 id='precio_stock'>${stock.price}</h2>
        </div>
        <div className='info_detalles_stock'>
          <Row>
            <p><b>Empresa:</b> {stock.longName}</p>
            <p><b>Disponible:</b> {stock.quantity}</p>
            <p><b>Última actualización:</b> {stock.timestamp}</p>
          </Row>

          <div className='formulario_compra'>
                <div className="form-group">
                  <label>Cantidad: </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    max={stock.quantity} // No puede comprar más de lo disponible
                    className="form-control_cantidad"
                  />
                </div>
                <Button onClick={handlePurchase} type="submit" variant='detalle' className='sel_cantidad'>Comprar</Button>
          </div>
          {/* {purchaseStatus && <div>{purchaseStatus}</div>} {// Muestra el estado de la comprad} d*/}
          {/* Botón para mostrar u ocultar el historial */}
        </div>
      </div>

      </div>
      <div className='contenedor_stock'>
        <div className='historial_compra'>
            <Button onClick={toggleHistory} variant="detalle" style={{ marginTop: '20px' }}>
              {showHistory ? "Ocultar historial" : "Ver historial"}
            </Button>

            {/* Mostrar el historial solo si el estado showHistory es true */}
            {showHistory && (
              <div>
                <h3>Historial de Compras</h3>
                <Table className='tabla_historial'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cantidad</th>
                            <th>Status</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                    {purchaseHistory.map((purchase, index) => (
                      <tr>
                        <td>{purchase.date}</td>
                        <td>{purchase.quantity}</td>
                        <td>{purchase.status}</td>
                        <td>{stock.symbol}</td>
                      </tr>
                    ))} 
                    </tbody>
                </Table>
                
                  
                
              </div>
            )}
          </div>
      </div>
    </>
    
    
  );
};

export default StockDetails;
