import { useState, useEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/stockDetails.css';
import '../styles/buttons.css';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

export const ReservedStockDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [available, setAvailable] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const reservedResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reserved/stocks/${id}`
        );

        if (reservedResponse.data && Object.keys(reservedResponse.data).length !== 0) {
          const reservedStock = reservedResponse.data;
          const symbol = reservedStock.symbol;

          const generalResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/stocks/${symbol}`
          );

          const generalStock = generalResponse.data.data[0];

          setStock({
            ...reservedStock,
            longName: generalStock.longName || "(Sin nombre)"
          });

          setAvailable(reservedStock.available);
          setDiscount((reservedStock.discount * 100).toFixed(1));
        } else {
          console.log("No se encontró stock reservado.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del stock", error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Error al verificar si es admin", error);
      }
    };

    fetchStockDetails();
    checkAdminStatus();
  }, [id]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      location.replace('/login');
    } else {
      try {
        const responseBuy = await fetch(`${import.meta.env.VITE_BACKEND_URL}/requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ symbol: stock.symbol, quantity })
        });

        if (responseBuy.ok) {
          const html = await responseBuy.text();
          document.open();
          document.write(html);
          document.close();
        } else {
          console.error('Error en la compra', responseBuy.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la compra', error);
      }
    }
  };

  const handleSave = async () => {
    const clampedDiscount = Math.min(10, Math.max(0, parseFloat(discount)));
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/reserved/stocks/${id}`,
        {
          available: available,
          discount: clampedDiscount / 100
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Cambios guardados con éxito');
      setStock(prev => ({ ...prev, available: available, discount: clampedDiscount / 100 }));
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar los cambios', error);
    }
  };

  if (!stock) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <br /><br /><br /><br /><br />
      <div className='contenedor_stock'>
        <div key={stock.symbol} className="contenedor_detalles_stock">
          <div className="titulo_detalles_stock">
            <h2>
              {isAdmin && (
                available ? (
                  <Eye style={{ marginRight: '15px', color: 'greenyellow' }} />
                ) : (
                  <EyeSlash style={{ marginRight: '15px', color: 'gray' }} />
                )
              )}
              {stock.symbol}
              {stock.discount > 0 && (
                <span style={{ color: 'gold', fontSize: '0.8em', marginLeft: '20px' }}>
                  -{(stock.discount * 100).toFixed(1)}%
                </span>
              )}
            </h2>
          </div>
          <h2 id='precio_stock'>
            {stock.discount > 0 ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'red', fontSize: '0.9em', marginRight: '20px', marginLeft: '10px' }}>
                  ${stock.price}
                </span>
                <span style={{ color: 'yellowgreen', fontSize: '1.4em', fontWeight: 'bold' }}>
                  ${(stock.price * (1 - stock.discount)).toFixed(0)}
                </span>
              </>
            ) : (
              <>${stock.price}</>
            )}
          </h2>

          <div className='info_detalles_stock'>
            <Row>
              <p><b>Empresa:</b> {stock.longName}</p>
              <p><b>Disponible:</b> {stock.quantity}</p>
              <p><b>Última actualización:</b> {new Date(stock.timestamp).toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              }).replace(",", "")}</p>
            </Row>

            {!isAdmin ? (
              <div className='formulario_compra'>
                <form className="form-group">
                  <label>Cantidad: </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    max={stock.quantity}
                    className="form-control_cantidad"
                  />
                </form>
                <Button onClick={handlePurchase} type="submit" variant='detalle' className='sel_cantidad'>
                  Comprar
                </Button>
              </div>
            ) : (
              editMode && (
                <div className='formulario_admin' style={{ marginTop: '20px' }}>
                  <Form.Check
                    type="switch"
                    id="available-switch"
                    label="Disponible"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                  />
                  <Form.Group controlId="discountInput">
                    <Form.Label>Descuento (%)</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={handleSave} variant='detalle' style={{ marginTop: '10px' }}>
                    Guardar cambios
                  </Button>
                </div>
              )
            )}
            <div className='formulario_botones_superiores'>
              <Button onClick={() => navigate('/reserved/stocks')} variant='outline-secondary'>
                Volver
              </Button>
              {isAdmin && (
                <Button onClick={() => setEditMode(!editMode)} variant='detalle'>
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
};

export default ReservedStockDetailsPage;
