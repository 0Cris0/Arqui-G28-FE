import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';


    // status enum("ACCEPTED","OK","NOT_VALID","REJECTED"),

export const TransaccionGeneral = (transaccion) =>{
    return (
      
        <tr>
            <td>{transaccion.id}</td>
            <td>{transaccion.timestamp}</td>
            <td>{transaccion.symbol}</td>
            <td>{transaccion.quantity}</td>
            {transaccion.status == "ACCEPTED"? <td id='status_accepted'>{transaccion.status}</td> :
             transaccion.status === "OK" ? <td id='status_ok'>{transaccion.status}</td> :
             transaccion.status === "NOT_VALID" ? <td id='status_not_valid'>{transaccion.status}</td> :
              <td id='status_rejected'>{transaccion.status}</td>}
            {/* <td>{transaccion.status}</td> */}
            <td>{transaccion.reason}</td>
        </tr>        
    
    )
} 

export default TransaccionGeneral;