import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/buttons.css';

export const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='contenedor_centrado'>
      <div className='contenedor_wallet'>
        <Button 
          variant="opcion" 
          onClick={() => window.location.href = '/wallet'}
        >
          Mi billetera
        </Button>
        <br /><br />
        <Button 
          variant="opcion" 
          onClick={() => window.location.href = '/transactions'}
        >
          Mis transacciones
        </Button>
        <br /><br />
        <Button 
          variant="opcion" 
          onClick={() => window.location.href = '/predictions'}
        >
          Predicciones de dinero
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
