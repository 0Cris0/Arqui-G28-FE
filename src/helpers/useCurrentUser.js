import { useEffect, useState } from 'react';
import axios from 'axios';

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingUser(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      //console.log("Datos user de Profile")
      //console.log(response.data)
      setUser(response.data);
    })
    .catch(err => {
      console.error('Error al obtener los datos del usuario', err);
      localStorage.removeItem('token');
      setError(err);
    })
    .finally(() => {
      setLoadingUser(false);
    });
  }, []);

  return { user, loadingUser, error };
}
