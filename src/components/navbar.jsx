import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import StonksLogo from '../assets/imgs/logo.webp';

export const StocksNavbar = () => {
    return (
        <div className='contenedor_navbar'>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container>
                    <Navbar.Brand href="/" className="nombre-logo">
                        <img id='StonksLogo' src={StonksLogo}></img>
                    </Navbar.Brand>
                    </Container>
                    
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/stocks">Stocks</Nav.Link>
                            <Nav.Link href="/transacciones">Mis transacciones</Nav.Link>
                            <Nav.Link href="/billetera">Mi billetera</Nav.Link>
                            <Nav.Link href="/perfil">Perfil</Nav.Link>
                            {/* <NavDropdown title="Otras Vistas" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/nosotros">Sobre LegitStonks</NavDropdown.Item>
                                <NavDropdown.Item href="/docs">Documentación</NavDropdown.Item>    
                            </NavDropdown> */}
                        </Nav>

                </Container>
            </Navbar>
        </div>
    );
}

export default StocksNavbar;
