// frontend/src/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api', // Your backend URL
});

export default instance;
