import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUsPage';
import StocksPage from './pages/StocksPage';
import MisTransaccionesPage from './pages/MisTransaccionesPage';
import StockDetails from './pages/StockDetailsPage'; 
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WalletDetails from './pages/WalletPage';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/nosotros" element={<AboutUsPage/>} />
                <Route path="/stocks" element={<StocksPage/>} />
                <Route path="/transacciones" element={<MisTransaccionesPage/>} />
                <Route path="/stocks/:symbol" element={<StockDetails/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<SignUpPage/>} />
                <Route path="/billetera" element={<WalletDetails/>} />'
            </Routes>
        </BrowserRouter>
    )
}

export default Router;