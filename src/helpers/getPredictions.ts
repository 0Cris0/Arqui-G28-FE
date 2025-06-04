
/**
 * Fetches predictions for a specific user by ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} Array of prediction objects.
 * @throws Will throw an error if the request fails.
 */

/* const dotenv = require('dotenv');
dotenv.config() */
const backendURL = import.meta.env.VITE_BACKEND_URL;


export async function getPredictions(userId) {
  try {
    const response = await fetch(`${backendURL}/prediction/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching predictions: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user predictions:', error);
    throw error;
  }
}
