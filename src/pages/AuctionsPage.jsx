import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getOffers, getSelfAuctions, getClosedAuctions } from '../helpers/getAuctions';

import '../styles/pages/stockGeneral.css';
import '../styles/buttons.css';

function AuctionsPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [auctions, setAuctions] = useState([]);
    const [activeTab, setActiveTab] = useState('offers');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = [];
                if (activeTab === 'offers') {
                    data = await getOffers(token);
                } else if (activeTab === 'self') {
                    data = await getSelfAuctions(token);
                } else if (activeTab === 'closed') {
                    data = await getClosedAuctions(token);
                }
                setAuctions(data);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            }
        };

        fetchData();
    }, [token, activeTab]);

    return (
        <>
            <div className='titulo-page d-flex justify-content-between align-items-center'>
                <h1>
                    {activeTab === 'offers' && 'Auction Offers'}
                    {activeTab === 'self' && 'Our Auctions'}
                    {activeTab === 'closed' && 'Closed Auctions'}
                    &nbsp;({auctions.length})
                </h1>
            </div>

            <div className="mb-3">
                <button
                    className={`btn btn-primary me-2 ${activeTab === 'offers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('offers')}
                >
                    Auction Offers
                </button>
                <button
                    className={`btn btn-primary me-2 ${activeTab === 'self' ? 'active' : ''}`}
                    onClick={() => setActiveTab('self')}
                >
                    Our Auctions
                </button>
                <button
                    className={`btn btn-primary ${activeTab === 'closed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('closed')}
                >
                    Closed Auctions
                </button>
            </div>

            <ul>
                {auctions.map((auction, index) => (
                    <li key={index}>{JSON.stringify(auction)}</li>
                ))}
            </ul>
        </>
    );
}

export default AuctionsPage;
