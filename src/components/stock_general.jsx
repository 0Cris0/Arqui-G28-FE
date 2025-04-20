import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

/* TODO: Ver si esto sirve, si termina quedando en este formato y cómo se ve, para poder modificarlo en CSS 
    TODO: Idea de hardcodear un stock cosa de ir probando todo esto*/

export const StockGeneral = (stock) =>{
    return (
      <div className='contenedor_stock_general' key={stock.id}>
        <br></br>
        <h3>{stock.symbol}</h3>
        <h3>{stock.price}</h3>
        <hr></hr>
        <p><b>Nombre:</b> {stock.longName}</p>
        <p><b>Cantidad disponible:</b> {stock.quantity}</p>
        <p><b>Actualización:</b> {stock.timestamp}</p>
        <div className='boton_stock_individual'>
          <Container>
            <Row>
              <Col>
                <Button href={`/stocks/${stock.symbol}`} variant='morado'>Ver stock</Button>
              </Col>
            </Row>
          </Container>
        </div>
    </div>
    )
} 

export default StockGeneral;