import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

import { getOffers, getSelfAuctions, getClosedAuctions } from '../helpers/getAuctions';

import '../styles/pages/auctionsPage.css';
import '../styles/buttons.css';

function AuctionsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [auctions, setAuctions] = useState([]);
  const [activeTab, setActiveTab] = useState('offers');
  let counter = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (activeTab === 'offers') {
          data = await getOffers(token);
        } else if (activeTab === 'self') {
          data = await getSelfAuctions(token);
        } else if (activeTab === 'closed') {
          data = await getClosedAuctions(token);
        }
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchData();
  }, [token, activeTab]);

  const leftColumn = [];
  const centerColumn = [];
  const rightColumn = [];

  auctions.forEach((auction, index) => {
    if (index % 3 === 0) leftColumn.push(auction);
    else if (index % 3 === 1) centerColumn.push(auction);
    else rightColumn.push(auction);
  });

  // Styler like StockGeneral
  const renderAuctionCard = (auction) => {
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

    return (
    <>
    <div className='filtros'>

    </div>
      <div key={counter++} className="stock-item">
        <div className="contenedor_stock_general">
          <Container className="contenedor_titulo_stock">
            <Row>
              <Col>
                <h2 className="titulo_stock">{auction.symbol}</h2>
              </Col>
              <Col className="text-end">
                <h2 className="titulo_stock" id="precio_stock">${auction.price}</h2>
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
              <Col className="text-end">
                <div className="boton_stock_individual">
                  <Button href={`/auctions/${auction.id}`} variant="detalle">Ver subasta</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      </>
    );
  };

  return (
    <>
      <div className="titulo-page d-flex justify-content-between align-items-center">
        <h1>
          {activeTab === 'offers' && 'Auction Offers'}
          {activeTab === 'self' && 'Our Auctions'}
          {activeTab === 'closed' && 'Closed Auctions'}
          &nbsp;({auctions.length})
        </h1>
      </div>

      <div className="mb-3">
        <Button
          className={`me-2 ${activeTab === 'offers' ? 'active btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('offers')}
        >
          Auction Offers
        </Button>
        <Button
          className={`me-2 ${activeTab === 'self' ? 'active btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('self')}
        >
          Our Auctions
        </Button>
        <Button
          className={`${activeTab === 'closed' ? 'active btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('closed')}
        >
          Closed Auctions
        </Button>
      </div>

      <div className="page-container-stocks">
        <div className="left-column-stocks">
          {leftColumn.map(renderAuctionCard)}
        </div>
        <div className="center-column-stocks">
          {centerColumn.map(renderAuctionCard)}
        </div>
        <div className="right-column-stocks">
          {rightColumn.map(renderAuctionCard)}
        </div>
      </div>
    </>
  );
}

export default AuctionsPage;
