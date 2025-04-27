/* import React, { useState } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';

export const Perfil = () => {
    const usuario = {
        id: 1,
        username: "roraima775",
        email: "abcd@gmail.com",
        wallet: 1000,
    };

    const [balance, setBalance] = useState(usuario.wallet);

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
                    
                    <form className='formulario_recarga'>
                        <label id='simbolo_dinero'>$</label>
                        <input type="number" placeholder="Monto a recargar" className='input_recarga_txt'/>
                        <Button variant='detalle' type='submit'>Recargar</Button>
                    </form>
                </div>
            </div>
        </div>
            
    );
}
export default Perfil; */