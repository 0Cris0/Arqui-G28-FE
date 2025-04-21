import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUs';
import StocksPage from './pages/StocksPage';
import MisTransaccionesPage from './pages/MisTransaccionesPage';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/nosotros" element={<AboutUsPage/>} />
                <Route path="/stocks" element={<StocksPage/>} />
                <Route path="/transacciones" element={<MisTransaccionesPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;