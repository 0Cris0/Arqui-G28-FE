import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/pages/stockGeneral.css';
import '../styles/buttons.css';

export const AuctionGeneral = (auction) => {
  auction = {
    "amogus": 1,
    "auction_id": "b9f1c3e5-6a4a-4423-b39f-49b6c90c4cf3",
    "proposal_id": "f264a2b1-e6de-4bd2-b2c0-3b3d75f9f8cd",
    "symbol": "AAPL",
    "timestamp": "2025-06-26T20:00:00Z",
    "quantity": 100,
    "group_id": 7,
    "operation": "SELL"
  }
  // Formatear la fecha y hora como en tu ejemplo
  const formattedDate = new Date(auction.timestamp).toLocaleString('en-GB', {
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
    <div className='contenedor_stock_general' key={auction.id}> 
      <Container className='contenedor_titulo_auction'>
        <Row>
            <h2 className='titulo_auction'>{auction.symbol}</h2>
            <h2 className='titulo_stock' id='precio_auction'>{auction.quantity} Stocks</h2>
        </Row>
      </Container>
      
      <Container className='contenedor_info_stock'>
        <Row>
          <Col>
            <p><b>Id: </b> {auction.id}</p>
            <p><b>Id del grupo: </b> {auction.group_id}</p>
            <p><b>Operación: </b> {auction.operation}</p>
            <p><b>Última actualización: </b> {formattedTimestamp}</p>
          </Col>
          <Col className='text-end'>
            <div className='boton_stock_individual'>
              <Button href={`/auctions/${auction.id}`} variant='detalle'>Ver oferta</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuctionGeneral;
