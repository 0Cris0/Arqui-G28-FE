import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { StockGeneral } from '../components/stock_general';

function StocksPage() {
  const [stocks, setStocks] = useState([]); // Almacenamos los stocks obtenidos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [filters, setFilters] = useState({
    quantity: '',
    price: '',
    date: ''
  }); // Filtros

  useEffect(() => {
    // Función para obtener los stocks con paginación
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/grouped`, {
          params: {
            page: currentPage,
            count: 12,
            quantity: filters.quantity,
            price: filters.price,
            date: filters.date
          }
        });

        const formattedStocks = response.data.data.map(stock => {
          // Formateamos la fecha de cada stock
          const formattedTimestamp = new Date(stock.timestamp).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).replace(",", "");

          return { ...stock, formattedTimestamp };
        });

        setStocks(formattedStocks);

        const dataTotalPages = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/grouped`)
        const totalPages = dataTotalPages.data.totalEntries
        setTotalPages(Math.ceil(totalPages / 12));
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks(); // Llamamos a la función para obtener los stocks

  }, [currentPage, filters]); // Se ejecuta cuando cambia la página o los filtros

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Cambiamos la página actual si es válida
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Dividimos los stocks en tres columnas
  const thirdIndex = Math.ceil(stocks.length / 3); // Dividimos los stocks en 3 partes
  const leftColumnStocks = stocks.slice(0, thirdIndex); // Stocks de la columna izquierda
  const centerColumnStocks = stocks.slice(thirdIndex, thirdIndex * 2); // Stocks de la columna central
  const rightColumnStocks = stocks.slice(thirdIndex * 2); // Stocks de la columna derecha

  return (
    <>
      <div className='titulo_page'>
        <h1>Mercado de Stocks</h1>
      </div>

      <div className='filtros'>
        <Form className="grupo_filtros">
          <div>
            <Form.Label>Stocks disponibles: </Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={filters.quantity}
              onChange={handleFilterChange}
              placeholder="Cantidad"
            />
          </div>
          <div>
            <Form.Label>Precio: </Form.Label>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="$"
            />
          </div>
          <div>
            <Form.Label>Fecha: </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Fecha"
            />
          </div>
          <Button
            type="button"
            variant="opcion"
            id="boton_filtrar"
            onClick={() => setCurrentPage(1)} // Resetear a la primera página
          >
            Filtrar
          </Button>
        </Form>
      </div>

      <div className="page-container">
        <div className="left-column">
          {leftColumnStocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <StockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="center-column">
          {centerColumnStocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <StockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="right-column">
          {rightColumnStocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <StockGeneral {...stock} />
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <div className='paginacion'>
        <Pagination className='paginacion'>
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
    </>
  );
}

export default StocksPage;
