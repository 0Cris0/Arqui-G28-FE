import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const createAuction = async (
  token: string,
  stockId: string,
  quantity: number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${backendURL}/auctions/${stockId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error creating auction:', error);
    throw error;
  }
};
