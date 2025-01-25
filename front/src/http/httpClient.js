import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default httpClient;