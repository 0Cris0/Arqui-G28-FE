import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { AuctionGeneral } from '../components/auction_general';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/stockGeneral.css'
import '../styles/buttons.css'

function AuctionsPage() {
  const navigate = useNavigate();
  let counter = 0;
  //const [auctions, setAuctions] = useState([]); // Almacenamos los stocks obtenidos
  const [auctions, setAuctions] = useState(
    [
      {
        "id":1,
        "auction_id": "3a8f1d21-0a14-4725-94c0-ff4a9d3d8a67",
        "proposal_id": "f27eae2d-7b8a-4b75-b245-ea402327e7c1",
        "symbol": "AAPL",
        "timestamp": "2025-06-26T14:00:00Z",
        "quantity": 100,
        "group_id": 1,
        "operation": "SELL"
      },
      {
        "id":2,
        "auction_id": "8b26a6d5-71e5-46c4-87ed-70f1f30b0a61",
        "proposal_id": null,
        "symbol": "GOOGL",
        "timestamp": "2025-06-26T14:15:00Z",
        "quantity": 50,
        "group_id": 2,
        "operation": "BUY"
      },
      {
        "id":3,
        "auction_id": "1c93cfea-9920-4bb5-8ec2-8b73a4fa99a7",
        "proposal_id": "bfa170f3-5e02-4ab2-94a2-87b9c04d836b",
        "symbol": "MSFT",
        "timestamp": "2025-06-26T14:30:00Z",
        "quantity": 75,
        "group_id": 3,
        "operation": "SELL"
      },
      {
        "id":4,
        "auction_id": "dd28c63e-2ad9-404f-83d7-01b6b35bde2a",
        "proposal_id": null,
        "symbol": "TSLA",
        "timestamp": "2025-06-26T14:45:00Z",
        "quantity": 30,
        "group_id": 4,
        "operation": "BUY"
      },
      {
        "id":5,
        "auction_id": "78d4e5c7-83b2-40f6-a21b-7699a432dabc",
        "proposal_id": "e47b4b77-29f7-413c-8d45-0d536d6eac3a",
        "symbol": "AMZN",
        "timestamp": "2025-06-26T15:00:00Z",
        "quantity": 120,
        "group_id": 5,
        "operation": "SELL"
      },
      {
        "id":6,
        "auction_id": "67b6b3e6-cb8b-45e6-8c32-2f0837e1cf7f",
        "proposal_id": null,
        "symbol": "NFLX",
        "timestamp": "2025-06-26T15:15:00Z",
        "quantity": 60,
        "group_id": 6,
        "operation": "BUY"
      }
    ]


  ); // Almacenamos los stocks obtenidos


  const handleRedirect = () => {
    navigate('/reserved/stocks');
  };

  useEffect(() => {
    // Función para obtener los stocks con paginación
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auctions/offers`);

        setAuctions(response.data.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchAuctions(); // Llamamos a la función para obtener los stocks

  }, []); // Se ejecuta cuando cambia la página o los filtros




  // Dividimos los stocks en tres columnas de manera ordenada
  const leftColumnStocks = [];
  const centerColumnStocks = [];
  const rightColumnStocks = [];

  auctions.forEach((auction, index) => {
    // Distribuimos los stocks en las tres columnas
    if (index % 3 === 0) {
      leftColumnStocks.push(auction); // Índices 0, 3, 6, 9, ...
    } else if (index % 3 === 1) {
      centerColumnStocks.push(auction); // Índices 1, 4, 7, 10, ...
    } else {
      rightColumnStocks.push(auction); // Índices 2, 5, 8, 11, ...
    }
  });

  return (
    <>
      <div className='titulo-page'>
        <h1>Subastas LegitStonks</h1>
      </div>
      <h2>Ofertas recibidas de los otros grupos:</h2>
      <br></br>

      {/* Contenedor de stocks en tres columnas */}
      <div className="page-container-stocks">
        <div className="left-column-stocks">
          {/* Mostrar los stocks en la columna izquierda */}
          {leftColumnStocks.map((auction) => (
            counter++,
            <div key={counter} className="stock-item">
              <AuctionGeneral {...auction} />
            </div>
          ))}
        </div>

        <div className="center-column-stocks">
          {/* Mostrar los stocks en la columna central */}
          {centerColumnStocks.map((auction) => (
            counter++,
            <div key={counter} className="stock-item">
              <AuctionGeneral {...auction} />
            </div>
          ))}
        </div>

        <div className="right-column-stocks">
          {/* Mostrar los stocks en la columna derecha */}
          {rightColumnStocks.map((auction) => (
            counter++,
            <div key={counter} className="stock-item">
              <AuctionGeneral {...auction} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AuctionsPage;
