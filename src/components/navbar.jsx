import { Nav, Navbar } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StonksLogo from '../assets/imgs/logo.webp';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../helpers/useCurrentUser';
import '../styles/navbar.css';

export const StocksNavbar = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admins`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setIsAdmin(response.data.isAdmin === true);
      } catch (error) {
        console.error("Error al verificar si es admin", error);
      }
    };

    fetchAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="contenedor_navbar">
      <div className="contenedor_izquierda">
        <Navbar.Brand href="/" className="nombre-logo">
          <img id='StonksLogo' src={StonksLogo} alt="Stonks Logo" />
        </Navbar.Brand>

        <Nav className="nav-left active nabvar.left">
          <a className="navbar-nav active linksnavbar" href="/">Inicio</a>
          <a className="navbar-nav active linksnavbar" href="/stocks">Stocks</a>
          <a className="navbar-nav active linksnavbar" href="/transactions">Mis transacciones</a>
          <a className="navbar-nav active linksnavbar" href="/wallet">Mi billetera</a>
          {isAdmin && (
            <a className="navbar-nav active linksnavbar" href="/auctions">Subastas</a>
          )}
        </Nav>
      </div>

      <div className="contenedor_derecha">
        <Nav className="nav-right active nabvar-right">
          {user ? (
            <>
              <a className="navbar-nav active linksnavbarName" href="/profile">{user.username}</a>
              <a className="navbar-nav active linksnavbar" onClick={handleLogout}>Cerrar sesión</a>
            </>
          ) : (
            <a className="navbar-nav active linksnavbar" href="/login">Iniciar sesión</a>
          )}
        </Nav>
      </div>
    </div>
  );
};

export default StocksNavbar;
