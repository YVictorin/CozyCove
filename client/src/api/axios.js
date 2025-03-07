import axios from 'axios';

// Add your localhost server URL to a .env file in the client folder.
// Also please name it VITE_BASE_URL, e.g., VITE_BASE_URL=http://localhost:3000
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

//will fetch again based on the interceptor if the accessToken is expired in the inital request
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

// Example usage: Fetching user account details
// const response = await axios.get('/api/account');