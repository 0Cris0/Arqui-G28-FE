import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { ReservedStockGeneral } from '../components/reserved_stock_general';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../helpers/useCurrentUser';

import '../styles/pages/stockGeneral.css'
import '../styles/buttons.css'

function ReservedStocksPage() {
  const navigate = useNavigate();
  let counter = 0;
  const { user } = useCurrentUser();
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

  const handleRedirect = () => {
    navigate('/stocks');
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const endpoint = user?.isAdmin
          ? `${import.meta.env.VITE_BACKEND_URL}/reserved/stocks/all`
          : `${import.meta.env.VITE_BACKEND_URL}/reserved/stocks`;

        const response = await axios.get(endpoint, {
          params: {
            page: currentPage,
            count: 12,
            quantity: filters.quantity,
            price: filters.price,
            date: filters.date
          }
        });

        setStocks(response.data.data);

        const totalEntries = response.data.totalEntries;
        setTotalPages(Math.ceil(totalEntries / 12));
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, [currentPage, filters, user]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
    setFilters(filtersTemp);
  };

  const leftColumnStocks = [];
  const centerColumnStocks = [];
  const rightColumnStocks = [];

  stocks.forEach((stock, index) => {
    if (index % 3 === 0) {
      leftColumnStocks.push(stock);
    } else if (index % 3 === 1) {
      centerColumnStocks.push(stock);
    } else {
      rightColumnStocks.push(stock);
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
            onClick={() => applyFilters()}
          >
            Filtrar
          </Button>
        </Form>
      </div>
      <div className='titulo-page d-flex justify-content-between align-items-center'>
        <h1>Mercado Reservado</h1>
        <Button variant="primary" id="mercado-privado-btn" onClick={handleRedirect}>
          Mercado de Stocks
        </Button>
      </div>

      <div className="page-container-stocks">
        <div className="left-column-stocks">
          {leftColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
              <ReservedStockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="center-column-stocks">
          {centerColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
              <ReservedStockGeneral {...stock} />
            </div>
          ))}
        </div>

        <div className="right-column-stocks">
          {rightColumnStocks.map((stock) => (
            counter++,
            <div key={counter} className="stock-item">
              <ReservedStockGeneral {...stock} />
            </div>
          ))}
        </div>
      </div>

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

export default ReservedStocksPage;
