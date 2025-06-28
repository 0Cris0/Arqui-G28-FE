const backendURL = import.meta.env.VITE_BACKEND_URL;

const headers = (token: string | null): HeadersInit => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
});

async function fetchWithAuth(endpoint: string, token: string | null) {
    const response = await fetch(`${backendURL}${endpoint}`, {
        method: 'GET',
        headers: headers(token),
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export async function getOffers(token: string | null) {
    return fetchWithAuth('/auctions/offers', token);
}
export async function getSelfAuctions(token: string | null) {
    return fetchWithAuth('/auctions/self', token);
}

export async function getClosedAuctions(token: string | null) {
    return fetchWithAuth('/auctions/closed', token);
}

export async function getAuctionById(id: string, token: string | null) {
    return fetchWithAuth(`/auctions/${id}`, token);
}
