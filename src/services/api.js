import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // update for production
  withCredentials: true, // allow cookies to be sent
});

export default instance;
