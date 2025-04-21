import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {Button, Row, Col, Table} from 'react-bootstrap';

import {TransaccionGeneral} from '../components/transaccion';

// status enum("ACCEPTED","OK","NOT_VALID","REJECTED"),
function MisTransaccionesPage() {
    const ej_transacciones = [
        { id: 1, timestamp: '2023-10-01', symbol: 'AAPL', quantity: 10, status: 'ACCEPTED', reason: 'buy' },
        { id: 2, timestamp: '2023-10-02', symbol: 'GOOGL', quantity: 5, status: 'OK', reason: 'sell' },
        { id: 3, timestamp: '2023-10-03', symbol: 'AMZN', quantity: 2, status: 'NOT_VALID', reason: 'buy' },
        { id: 4, timestamp: '2023-10-04', symbol: 'MSFT', quantity: 8, status: 'REJECTED', reason: 'sell' },
        { id: 5, timestamp: '2023-10-05', symbol: 'TSLA', quantity: 12, status: 'ACCEPTED', reason: 'buy' },
        { id: 6, timestamp: '2023-10-06', symbol: 'FB', quantity: 15, status: 'OK', reason: 'sell' },
        { id: 7, timestamp: '2023-10-07', symbol: 'NFLX', quantity: 20, status: 'NOT_VALID', reason: 'buy' }
    ];
    const [transacciones, setTransacciones] = useState(ej_transacciones);
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
                <h1>Mis transacciones</h1>
            </div>

            <div className='contenedor_transacciones'> 
                <Table className='tabla_transacciones'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Stock</th>
                            <th>Cantidad</th>
                            <th>Status</th>
                            <th>Razón</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {Object.values(ej_transacciones).map(transaccion => (
                            <TransaccionGeneral key={transaccion.id} {...transaccion} />
                        ))}
                            
                        
                    </tbody>
                </Table>
                
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

export default MisTransaccionesPage;