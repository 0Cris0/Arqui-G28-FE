import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TransaccionGeneral } from '../components/transaccion'; // Asegúrate de tener este componente

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

        // Actualizamos el estado con las transacciones obtenidas
        //setTransacciones(response.data.results);
        setTransacciones(Array.isArray(response.data.results) ? response.data.results : []);
        console.log(response.data);
        // Actualizamos el total de páginas para la paginación
        setTotalPages(Math.ceil(response.data.totalEntries / 10)); // Total de páginas
      } catch (error) {
        console.error('Error al obtener las transacciones', error);
      }
    };
    console.log(transacciones);
    fetchTransacciones(); // Llamamos a la función para obtener las transacciones

  }, [currentPage, navigate]);

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
              <th>Id</th>
              <th>Fecha</th>
              <th>Stock</th>
              <th>Cantidad</th>
              <th>Status</th>
              <th>Razón</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeamos las transacciones obtenidas del backend */}
            {transacciones.map((transaccion) => (
              <TransaccionGeneral key={transaccion.id} {...transaccion} />
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
