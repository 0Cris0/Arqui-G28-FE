import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../helpers/useCurrentUser';

import '../styles/pages/auction.css';

export const AuctionsPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/admins`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/stocks');
        }
      })
      .catch(error => {
        console.error('Error al verificar admin:', error);
        navigate('/stocks');
      });
    }
  }, [navigate]);

  if (isAdmin === null) return <div>Cargando...</div>;

  return (
    <div className="subastas-container">
      <div className="cuadro-central"></div>
    </div>
  );
};

export default AuctionsPage;
