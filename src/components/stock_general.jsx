import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/pages/stockGeneral.css';
import '../styles/buttons.css';

export const StockGeneral = (stock) => {
  // Formatear la fecha y hora como en tu ejemplo
  const formattedDate = new Date(stock.timestamp).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(",", "");

  // Dividir la fecha y hora para mostrarla como lo deseas
  const [fecha, horaCompleta] = formattedDate.split(' ');
  const horaMinutos = horaCompleta.slice(0, 5);
  const formattedTimestamp = `${fecha} (${horaMinutos})`;

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
            <p><b>Última actualización:</b> {formattedTimestamp}</p>
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
