import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/stockGeneral.css'
import '../styles/buttons.css'

function AuctionsPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className='titulo-page d-flex justify-content-between align-items-center'>
                <h1>Subastas</h1>
            </div>
        </>
    );
}

export default AuctionsPage;