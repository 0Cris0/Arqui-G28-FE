import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StocksNavbar from './components/navbar'; 

import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUsPage';
import StocksPage from './pages/StocksPage';
import TransactionsPage from './pages/TransactionsPage';
import StockDetails from './pages/StockDetailsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WalletDetails from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import WebPayApprove from './pages/WebPayApprove';
import WebPayFail from './pages/WebPayFail';

function App() {
  return (
    <Router>
      <StocksNavbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/stocks/:symbol" element={<StockDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/wallet" element={<WalletDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/webpay/approve" element={<WebPayApprove />} />
        <Route path="/webpay/fail" element={<WebPayFail />} />
      </Routes>
    </Router>
  );
}

export default App;
