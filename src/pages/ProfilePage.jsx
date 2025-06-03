import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Importamos el componente Button de React-Bootstrap

import '../styles/buttons.css'

export const ProfilePage = () => {
  return (
    <div className='contenedor_centrado'>
      <div className='contenedor_wallet'>
        <Button 
          variant="opcion" 
          onClick={() => window.location.href = '/wallet'} // Redirige a la página de billetera
        >
          Mi billetera
        </Button>
        <br /><br /> {/* Espaciado entre los botones */}
        <Button 
          variant="opcion" 
          onClick={() => window.location.href = '/transactions'} // Redirige a la página de transacciones
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
