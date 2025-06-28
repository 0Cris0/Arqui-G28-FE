import { useState, useEffect } from 'react';
import { Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importamos useParams para obtener el 'symbol' de la URL
import { useNavigate } from 'react-router-dom';

import '../styles/pages/stockDetails.css'
import '../styles/buttons.css'

export const SpecificAuctionsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el símbolo del stock de la URL
  const [status, setStatus] = useState(false);
  const token = localStorage.getItem('token');
  if (!token) return;

  //const [auctions, setActual_auction] = useState([]); // Almacenamos los stocks obtenidos
  const [actual_auction, setActual_auction] = useState(
    [
      {
        "id":1,
        "auction_id": "d8a7c2f4-2b0c-4e97-9e71-61b47adcfb01",
        "proposal_id": "15c78392-9cfc-4b46-8a4c-b13db2e735f2",
        "symbol": "AAPL",
        "timestamp": "2025-06-26T14:30:00Z",
        "quantity": 150,
        "group_id": 1,
        "operation": "BUY"
      }
    ]

  ); // Almacenamos los stocks obtenidos

    const handleRedirect = () => {
    navigate('/auctions');
  };

  /* useEffect(() => {
    const fetchSpecificAuction = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auctions/${id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
        const auctionsData = response.data.data;
        setActual_auction(auctionsData);
      } catch (error) {
        console.error("Error al obtener los detalles del stock", error);
      }
    };
    fetchSpecificAuction(); // Llamamos a la función cuando el componente se monta

  }, []); // Solo se ejecuta cuando cambia el símbolo del stock o la página actual
 */
const handleAccept = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    location.replace('/login')
  } else {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/auctions/${id}`);
      handleRedirect()
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  }
}


  // Si no se ha obtenido la información del stock aún, mostramos un cargando
  if (!actual_auction) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <br /><br /><br /><br /><br />
      <div className='contenedor_stock'>
        <div key={actual_auction.symbol} className="contenedor_detalles_stock">
          <div className="titulo_detalles_stock">
            <h2>{actual_auction.symbol}</h2>
            <h2 id='precio_stock'>{actual_auction.quantity} Stocks</h2>
          </div>
          <div className='info_detalles_stock'>
            <Row>
              <p><b>Grupo:</b> {actual_auction.group_id}</p>
              <p><b>Operacion:</b> {actual_auction.operation}</p>
              <p><b>Id de subasta:</b> {actual_auction.auction_id}</p>
              <p><b>Id de propuesta:</b> {actual_auction.proposal_id}</p>
              <p><b>Última actualización:</b> {new Date(actual_auction.timestamp).toLocaleString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }).replace(",", "")}</p>
            </Row>
            {/* <div className='formulario_compra'>
              <form className="form-group">
                <label>Aceptas la oferta: </label>
                <input
                  type="boolean"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control_cantidad"
                />
              </form>
              <Button onClick={handleAccept} type="submit" variant='detalle' className='sel_cantidad'>Comprar</Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificAuctionsPage;
