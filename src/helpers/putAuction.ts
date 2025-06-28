import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const putAuction = async (
  token: string,
  auctionId: string,
  response: boolean
): Promise<any> => {
  try {
    const res = await axios.put(
      `${backendURL}/auctions/${auctionId}`,
      { response },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error('Error responding to auction offer:', error);
    throw error;
  }
};
