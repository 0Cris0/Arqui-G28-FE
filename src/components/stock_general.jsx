import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

/* TODO: Ver si esto sirve, si termina quedando en este formato y cómo se ve, para poder modificarlo en CSS 
    TODO: Idea de hardcodear un stock cosa de ir probando todo esto*/

export const StockGeneral = (stock) =>{
    return (
      <div className='contenedor_stock_general' key={stock.id}> 
        <Container className='contenedor_titulo_stock'>
          <h2 className='titulo_stock' >{stock.symbol}</h2>
          <h2 className='titulo_stock' id='precio_stock'>${stock.price}</h2>
                
                


            


        </Container>
        
        <Container className='contenedor_info_stock'>
          <Row>
            <hr></hr>
            <p><b>Empresa:</b> {stock.longName}</p>
            <p><b>Disponible:</b> {stock.quantity}</p>
            <p><b>Actualización:</b> {stock.timestamp}</p>
            <div className='boton_stock_individual'>
              <Button href={`/stocks/${stock.symbol}`} variant='detalle'>Ver stock</Button>
            </div>
          </Row>
        </Container>
        
    </div>
    )
} 

export default StockGeneral;