import { Button, Container, Row, Col } from 'react-bootstrap';

export const StockGeneral = (stock) => {
  return (
    <div className='contenedor_stock_general' key={stock.symbol}> 
      <Container className='contenedor_titulo_stock'>
        <Row>
          <Col>
            <h2 className='titulo_stock'>{stock.symbol}</h2>
          </Col>
          <Col className='text-end'>
            <h2 className='titulo_stock' id='precio_stock'>${stock.price}</h2>
          </Col>
        </Row>
      </Container>
      
      <Container className='contenedor_info_stock'>
        <Row>
          <Col>
            <p><b>Empresa:</b> {stock.longName}</p>
            <p><b>Disponible:</b> {stock.quantity}</p>
            <p><b>Última actualización:</b> {(stock.timestamp)}</p>
          </Col>
          <Col className='text-end'>
            <div className='boton_stock_individual'>
              <Button href={`/stocks/${stock.symbol}`} variant='detalle'>Ver stock</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StockGeneral;
