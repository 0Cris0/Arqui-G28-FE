/* const transaccion_ref = {
    "group_id": "28",
    "operation": "BUY",
    "quantity": 1,
    "request_id": "630c8018-d8e7-47f2-9add-eabdc808c39a",
    "stock_origin": "0",
    "symbol": "TNXP",
    "timestamp": "2025-04-28T21:24:59.410Z",
}; */

import React, { useNavigate } from 'react-router-dom';

import { formatDate } from '../helpers/formatDate';

export const TransaccionGeneral = ( transaccion ) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/transaction`, { state: { request: transaccion } });
  };

  return (
    <tr onClick={handleClick} style={{ cursor: 'pointer' }}>
      <td>{formatDate(transaccion?.timestamp)}</td>
      <td>{transaccion.symbol}</td>
      <td>{transaccion.quantity}</td>
      <td>{transaccion.operation}</td>
      {transaccion.status === "ACCEPTED" ? (
        <td id="status_accepted">{transaccion.status}</td>
      ) : transaccion.status === "OK" ? (
        <td id="status_ok">{transaccion.status}</td>
      ) : transaccion.status === "PENDING" ? (
        <td id="status_not_valid">{transaccion.status}</td>
      ) : transaccion.status === "error" ? (
        <td id="status_rejected">{transaccion.status}</td>
      ) : (
        <td id="status_rejected">{transaccion.status}</td>
      )}
    </tr>
  );
};

export default TransaccionGeneral;