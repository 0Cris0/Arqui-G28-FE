import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importamos useParams para obtener el 'symbol' de la URL
import { useNavigate } from 'react-router-dom';

import '../styles/pages/stockDetails.css'
import '../styles/buttons.css'

export const StockDetails = () => {
  const navigate = useNavigate();
  const { symbol } = useParams(); // Obtenemos el símbolo del stock de la URL
  const [stock, setStock] = useState(null); // Para almacenar los detalles del stock

  const [quantity, setQuantity] = useState(1); // Cantidad que el usuario quiere comprar
  const [purchaseHistory, setPurchaseHistory] = useState([]); // Histórico de compras
  const [showHistory, setShowHistory] = useState(false); // Estado para controlar la visibilidad del historial

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas (usaremos para los botones de paginación)

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/stocks/${symbol}?count=1`
        );
        if (response.data.data.length === 1) {
          const stockData = response.data.data[0];
          setStock(stockData);
        } else {
          console.log("No se encontró stock");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del stock", error);
      }
    };

    // Función para cargar el historial de compras con paginación
    const fetchPurchaseHistory = async () => {
      try {
        const historyResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/history/${symbol}?page=${currentPage}&count=10`
        );
        const historyData = historyResponse.data.results.map(purchase => {
          // Formateamos la fecha
          const formattedDate = new Date(purchase.timestamp).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).replace(",", "");

          // Asignamos el autor según el source
          const author = purchase.source === "request" ? "Desconocido" : "Externo";

          return {
            date: formattedDate,
            quantity: purchase.quantity,
            source: purchase.source,
            author: author,
          };
        });

        setPurchaseHistory(historyData); // Guardamos el historial de compras en el estado

        const dataTotalResults = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/history/${symbol}?count=10`
        );
        const totalResults = dataTotalResults.data.pages
        setTotalPages(totalResults);
      } catch (error) {
        console.error("Error al obtener el historial de compras", error);
      }
    };

    fetchStockDetails(); // Llamamos a la función cuando el componente se monta
    fetchPurchaseHistory(); // Llamamos a la función para obtener el historial de compras

  }, [symbol, currentPage]); // Solo se ejecuta cuando cambia el símbolo del stock o la página actual

const handlePurchase = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    location.replace('/login')
  } else {
    try {
      const responseBuy = await fetch(`${import.meta.env.VITE_BACKEND_URL}/requests`, {
        method: 'POST',
        headers: {
          //'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ symbol, quantity })
      });

      // Verificamos si la respuesta fue exitosa (status 200)
      if (responseBuy.ok) {
        const responseData = await responseBuy.json(); // backend te debe devolver { url, token }
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = responseData.url;

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = responseData.token;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
      } else {
        console.error('Error en la compra', responseBuy.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la compra', error);
    }
  }
};


  const toggleHistory = () => {
    setShowHistory(!showHistory); // Alternar la visibilidad del historial
  };

  // Lógica de paginación para evitar páginas negativas o mayores que el número total de páginas
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Cambiar a la nueva página si es válida
    }
  };

  // Si no se ha obtenido la información del stock aún, mostramos un cargando
  if (!stock) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <br /><br /><br /><br /><br />
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
              <p><b>Última actualización:</b> {new Date(stock.timestamp).toLocaleString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }).replace(",", "")}</p>
            </Row>
            <div className='formulario_compra'>
              <form className="form-group">
                <label>Cantidad: </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  max={stock.quantity} // No puede comprar más de lo disponible
                  className="form-control_cantidad"
                />
              </form>
              <Button onClick={handlePurchase} type="submit" variant='detalle' className='sel_cantidad'>Comprar</Button>
            </div>
            <div className='formulario_botones_superiores'>
              <Button onClick={() => navigate('/reserved/stocks')} variant='outline-secondary'>
                Volver
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='contenedor_stock'>
        <div className='historial_compra'>
          <Button onClick={toggleHistory} variant="detalle" style={{ marginTop: '20px' }}>
            {showHistory ? "Ocultar historial" : "Ver historial"}
          </Button>

          {showHistory && (
            <div>
              <h3>Historial de Compras</h3>
              <Table className='tabla_historial'>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Autor</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase, index) => (
                    <tr key={index}>
                      <td>{purchase.date}</td>
                      <td>{purchase.source}</td>
                      <td>{purchase.quantity}</td>
                      <td>{purchase.author}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación */}
              <div className='paginacion'>
                <Pagination>
                  <Col className='col_paginacion'>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                  </Col>
                  <Col className='col_paginacion'>
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                  </Col>
                  <Col className='col_paginacion'>
                    <Pagination.Item className='actual_paginacion'>{currentPage}</Pagination.Item>
                  </Col>
                  <Col className='col_paginacion'>
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                  </Col>
                  <Col className='col_paginacion'>
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                  </Col>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
      <br /><br />
    </>
  );
};

export default StockDetails;
