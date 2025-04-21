import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {Button, Row, Col, Form, InputGroup} from 'react-bootstrap';

import {StockGeneral} from '../components/stock_general';

function StocksPage() {
    const ej_stocks = [
        { id: 1, symbol: 'AAPL', price: 145.09, longName: 'Apple Inc.', quantity: 100, timestamp: '2023-10-01' },
        { id: 2, symbol: 'GOOGL', price: 2735.55, longName: 'Alphabet Inc.', quantity: 50, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 4, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 5, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 6, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 7, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' }
    ];
    const [stocks, setStocks] = useState(ej_stocks);
    const [currentPage, setCurrentPage] = useState(1);


/*     useEffect(() => {
        const ObtenerStocks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/stocks');
                // Parsear y mapear los stocks si es necesario
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []); */

    return (
        <>
            <div className='titulo_page'>
                <h1>Mercado de Stocks</h1>
            </div>

            <div className='filtros'>
                <Form className="grupo_filtros">
                    <div> 
                        <Form.Label>Stocks disponibles: </Form.Label>
                        <Form.Control type="number" placeholder="Cantidad" />
                    </div> 
                    <div> 
                        <Form.Label>Precio: </Form.Label>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" placeholder="$" />
                        
                    </div>
                    <div>
                        <Form.Label>Fecha: </Form.Label>
                        <Form.Control type="date" placeholder="Fecha" />
                    </div>
                    
                    
                    <Button type="submit" variant="opcion" id="boton_filtrar">Filtrar</Button>
                </Form>

            </div>

            <div className='contenedor_stocks'> 
                <div className='stocks'>
                    {Object.values(ej_stocks).map(stock => (
                        <StockGeneral key={stock.id} {...stock} />
                    ))}
                    {/* {stocks.map(stock => (
                        <StockGeneral key={stock.id} {...stock} />
                    ))} */}
                </div>
            </div>
            <div className='paginacion'>
                <Pagination className='paginacion'>
                    <Col className='col_paginacion'>
                        <Pagination.First onClick={() => setCurrentPage(1)} />
                    </Col>
                    <Col className='col_paginacion'>
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
                    </Col>
                    <Col className='col_paginacion'>
                        <Pagination.Item className='actual_paginacion'>{currentPage}</Pagination.Item>
                    </Col>
                    <Col className='col_paginacion'>
                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
                    </Col>
                    <Col className='col_paginacion'>
                        <Pagination.Last onClick={() => setCurrentPage(Math.ceil(stocks.length / 10))} />
                    </Col>
                </Pagination>
            </div>
        </>
        
    );
}

export default StocksPage;