import { useState, useEffect } from 'react';
import { Button, Col, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TransaccionGeneral } from '../components/transaccion'; // Asegúrate de tener este componente

import '../styles/pages/transactions.css'

export const TransactionsPage = () => {
  const [transacciones, setTransacciones] = useState([]); // Almacena las transacciones
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token de localStorage
    if (!token) {
      navigate('/login'); // Si no hay token, redirigimos al login
      return;
    }

    const fetchTransacciones = async () => {
      try {
        // Hacemos la solicitud para obtener las transacciones
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/requests`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviamos el token en los headers
          }
        });
        console.log("Transacciones data: ", response.data.data);

        // Formateamos la fecha para cada transacción
        const formattedTransactions = response.data.data.map((transaccion) => {
          // Formato de la fecha (YYYY-MM-DD)
          const date = new Date(transaccion.timestamp);
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} (${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')})`;

          // Agregar la fecha formateada a cada transacción
          return {
            ...transaccion,
            formattedDate, // Asignamos la fecha formateada
          };
        });

        setTransacciones(formattedTransactions); // Guardamos las transacciones con las fechas formateadas
      } catch (error) {
        console.error('Error al obtener las transacciones', error);
      }
    };

    fetchTransacciones(); // Llamamos a la función para obtener las transacciones
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Cambiar a la nueva página si es válida
    }
  };

  return (
    <>
      <div className='titulo_page'>
        <h1>Mis transacciones</h1>
      </div>

      <div className='contenedor_transacciones'> 
        <Table className='tabla_transacciones'>
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Stock</th>
              <th>Cantidad</th>
              <th>Operación</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((transaccion) => (
              <TransaccionGeneral key={transaccion.timestamp} {...transaccion} formattedDate={transaccion.formattedDate} />
            ))}
          </tbody>
        </Table>
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
};

export default TransactionsPage;
