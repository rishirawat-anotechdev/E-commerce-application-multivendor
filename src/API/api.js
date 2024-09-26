import axios from 'axios';

// Create a global Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',  // Replace with your actual API URL
});

export default api;
