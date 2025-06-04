/* const dotenv = require('dotenv');
dotenv.config() */
const workersURL = "https://primordialdomain.me"; //import.meta.env.WORKERS_URL;

export async function getHeartbeat() {
    try {
        const response = await fetch(`${workersURL}/heartbeat`);

        if (!response.ok) {
            throw new Error(`Workers not working: ${response.statusText}`);
        }

        const data = await response.text();
        return data;

    } catch (error) {
        console.error('Failed to get heartbeat', error);
        throw error;
    }
}