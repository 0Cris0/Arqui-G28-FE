import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {Button} from 'react-bootstrap';

import {StockGeneral} from '../components/stock_general';

function StocksPage() {
    const ej_stocks = [
        { id: 1, symbol: 'AAPL', price: 145.09, longName: 'Apple Inc.', quantity: 100, timestamp: '2023-10-01' },
        { id: 2, symbol: 'GOOGL', price: 2735.55, longName: 'Alphabet Inc.', quantity: 50, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' },
        { id: 3, symbol: 'AMZN', price: 3344.94, longName: 'Amazon.com Inc.', quantity: 30, timestamp: '2023-10-01' }
    ];
    const [stocks, setStocks] = useState(ej_stocks);

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
        </>
        
    );
}

export default StocksPage;