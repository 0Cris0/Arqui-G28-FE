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
import RequestDetailPage from './pages/RequestDetailPage';
import PredictionsPage from './pages/PredictionsPage';
import PredictionDetailPage from './pages/PredictionDetailPage';
import WebPayApprovePage from './pages/WebPayApprove';
import WebPayFailPage from './pages/WebPayFail';
import ReservedStocksPage from './pages/ReservedStocksPage';
import ReservedStocksDetailsPage from './pages/ReservedStocksDetailsPage';

import AuctionsPage from './pages/AuctionsPage';

function App() {
  return (
    <Router>
      <StocksNavbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/reserved/stocks" element={<ReservedStocksPage />} />
        <Route path="/reserved/stocks/:id" element={<ReservedStocksDetailsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/stocks/:symbol" element={<StockDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/wallet" element={<WalletDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/transaction" element={<RequestDetailPage />} />
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/prediction" element={<PredictionDetailPage />} />
        <Route path="/webpay/approve" element={<WebPayApprovePage />} />
        <Route path="/webpay/fail" element={<WebPayFailPage />} />
        <Route path="/auctions" element={<AuctionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
