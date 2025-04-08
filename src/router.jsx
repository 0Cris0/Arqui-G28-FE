import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import LandingPage from './pages/LandingPage';

import AboutUsPage from './pages/AboutUs';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/us" element={<AboutUsPage/>} />
                {/* <Route path="/about" element={<h1>About</h1>} />
                <Route path="/contact" element={<h1>Contact</h1>} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;