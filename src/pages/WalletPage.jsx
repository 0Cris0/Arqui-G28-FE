import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario si no está autenticado

export const WalletDetails = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los detalles del usuario
  const [balance, setBalance] = useState(0); // Estado para almacenar el saldo de la billetera
  const [amountToAdd, setAmountToAdd] = useState(0); // Estado para almacenar el monto a recargar
  const navigate = useNavigate(); // Para redirigir al usuario si no está autenticado

  // Usamos useEffect para obtener la información del usuario
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

    if (token) {
      // Si hay un token, hacemos la solicitud para obtener el perfil del usuario
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setUser(response.data); // Guardamos los detalles del usuario
        setBalance(response.data.wallet); // Establecemos el saldo de la billetera
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario', error);
        localStorage.removeItem('token'); // Si hay un error, eliminamos el token
        navigate('/login'); // Redirigimos al login si no está autenticado
      });
    } else {
      navigate('/login'); // Si no hay token, redirigimos al login
    }
  }, [navigate]); // Solo se ejecuta una vez cuando se monta el componente

  // Si no hay usuario, mostramos un mensaje de carga
  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleRecharge = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

    // Verificamos que el monto a recargar sea válido
    if (amountToAdd <= 0) {
      alert("El monto debe ser mayor a 0");
      return;
    }

    try {
      // Hacemos la solicitud PUT para actualizar el saldo
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/profile/wallet`,
        {
          addedAmount: amountToAdd // Monto a agregar al saldo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviamos el token en los headers
          }
        }
      );

      // Actualizamos el saldo del usuario en el frontend con la nueva cantidad
      setBalance(response.data.wallet); // Suponiendo que la respuesta contiene el nuevo saldo

      // Limpiamos el campo de monto a recargar
      setAmountToAdd(0);
      
      alert("Saldo recargado exitosamente");
      location.replace('/wallet')

    } catch (error) {
      console.error('Error al recargar el saldo', error);
      alert("Hubo un error al recargar el saldo. Intente nuevamente.");
    }
  };

  return (
    <div className='contenedor_centrado'>
      <div className='contenedor_wallet'>
        <div className='contenedor_titulo_wallet'>
          <h1 className='titulo_wallet'>Mi billetera</h1>
        </div>

        <div className='contenedor_info_wallet'>
          <h3><b>Saldo disponible:</b></h3>
          <h3 id='balance'>${balance}</h3>
        </div>

        <div className='contenedor_recarga'>
          <form className='formulario_recarga' onSubmit={handleRecharge}>
            <label id='simbolo_dinero'>$</label>
            <input
              type="number"
              placeholder="Monto a recargar"
              className='input_recarga_txt'
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(Number(e.target.value))}
              min="1"
            />
            <Button variant='detalle' type='submit'>Recargar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
