import React, { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/pages/stockGeneral.css';
import '../styles/buttons.css';

export const ReservedStockGeneral = (stock) => {
  // Formatear la fecha y hora
  const formattedDate = new Date(stock.timestamp).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(",", "");

  const [fecha, horaCompleta] = formattedDate.split(' ');
  const horaMinutos = horaCompleta.slice(0, 5);
  const formattedTimestamp = `${fecha} (${horaMinutos})`;

  // 💰 Calcular nuevo precio
  const hasDiscount = stock.discount !== 0;
  const discountedPrice = hasDiscount
    ? (stock.price * (1 - stock.discount)).toFixed(0)
    : stock.price;

  const discountPercent = hasDiscount
    ? `-${(stock.discount * 100).toFixed(0)}%`
    : null;

  return (
    <div className='contenedor_stock_general' key={stock.symbol}> 
      <Container className='contenedor_titulo_stock'>
        <Row>
          <Col>
            <h2 className='titulo_stock'>
              {stock.symbol}
              {hasDiscount && (
                <span style={{ color: 'gold', fontSize: '0.8em', marginLeft: '10px' }}>
                  {discountPercent}
                </span>
              )}
            </h2>
          </Col>
          <Col className='text-end'>
            <h2 className='titulo_stock' id='precio_stock'>
              {hasDiscount ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'red', fontSize: '0.9em', marginRight: '10px' }}>
                    ${stock.price}
                  </span>
                  <span style={{ color: 'yellowgreen', fontSize: '1.4em', fontWeight: 'bold' }}>
                    ${discountedPrice}
                  </span>
                </>
              ) : (
                <>${stock.price}</>
              )}
            </h2>
          </Col>
        </Row>
      </Container>
      
      <Container className='contenedor_info_stock'>
        <Row>
          <Col>
            <p><b>Empresa:</b> {stock.longName}</p>
            <p><b>Disponible:</b> {stock.quantity}</p>
            <p><b>Última actualización:</b> {formattedTimestamp}</p>
          </Col>
          <Col className='text-end'>
            <div className='boton_stock_individual'>
              <Button href={`/reserved/stocks/${stock.id}`} variant='detalle'>Ver stock</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReservedStockGeneral;
