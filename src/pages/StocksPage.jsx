import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { StockGeneral } from '../components/stock_general';
import '../styles/stockGeneral.css'

function StocksPage() {
  let counter = 0;
  const [stocks, setStocks] = useState([]); // Almacenamos los stocks obtenidos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [filtersTemp, setFiltersTemp] = useState({
    quantity: '',
    price: '',
    date: ''
  }); // Filtros
  const [filters, setFilters] = useState({
    quantity: '',
    price: '',
    date: ''
  });
  useEffect(() => {
    // Función para obtener los stocks con paginación
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/`, {
          params: {
            page: currentPage,
            count: 12,
            quantity: filters.quantity,
            price: filters.price,
            date: filters.date
          }
        });

        setStocks(response.data.data);
        
        const dataTotalPages = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/`)
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

  const handleFilterTempChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    console.log(filters);
  };

  const applyFilters = async () => {
    setFilters(filtersTemp); // Aplicamos los filtros temporales
    console.log("Actualizando filtros...");
    console.log(filters);
    //setCurrentPage(1); // Reiniciamos a la primera página
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/grouped`, {
      params: {
        page: currentPage,
        count: 12,
        quantity: filters.quantity,
        price: filters.price,
        date: filters.date
      }
    })
    .then((response) => {
      setStocks(response.data.data);

      const dataTotalPages = axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/grouped`)
      const totalPages = dataTotalPages.data.totalEntries
      setTotalPages(Math.ceil(totalPages / 12));
    })
    .catch((error) => {
      console.error('Error fetching stocks:', error);
    });
  }


  // Dividimos los stocks en tres columnas de manera ordenada
  const leftColumnStocks = [];
  const centerColumnStocks = [];
  const rightColumnStocks = [];

  stocks.forEach((stock, index) => {
    // Distribuimos los stocks en las tres columnas
    if (index % 3 === 0) {
      leftColumnStocks.push(stock); // Índices 0, 3, 6, 9, ...
    } else if (index % 3 === 1) {
      centerColumnStocks.push(stock); // Índices 1, 4, 7, 10, ...
    } else {
      rightColumnStocks.push(stock); // Índices 2, 5, 8, 11, ...
    }
  });

  return (
    <>
      <div className='filtros'>
        <Form className="grupo_filtros">
          <div>
            <Form.Label>Stocks disponibles: </Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={filters.quantity}
              onChange={handleFilterTempChange}
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
              onChange={handleFilterTempChange}
              placeholder="#"
            />
          </div>
          <div>
            <Form.Label>Fecha: </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterTempChange}
              placeholder="Fecha"
            />
          </div>
          <Button
            type="button"
            variant="opcion"
            id="boton_filtrar"
            onClick={() => applyFilters()} // Resetear a la primera página
          >
            Filtrar
          </Button>
        </Form>
      </div>
      <div className='titulo-page'>
        <h1>Mercado de Stocks</h1>
      </div>

      {/* Contenedor de stocks en tres columnas */}
      <div className="page-container-stocks">
        <div className="left-column-stocks">
          {/* Mostrar los stocks en la columna izquierda */}
          {leftColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
              <StockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="center-column-stocks">
          {/* Mostrar los stocks en la columna central */}
          {centerColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
              <StockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="right-column-stocks">
          {/* Mostrar los stocks en la columna derecha */}
          {rightColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
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
