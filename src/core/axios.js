import axios from 'axios';

const API_URL = process.env?.REACT_APP_API_BASE_URL;
//Remember to change REACT_APP_API_BASE_URL in .env variable
const Axios = axios.create({
  baseURL: API_URL,
});
Axios.interceptors.request.use(
  async (config) => {
    // const token = ''
    // if (token) config.headers['Authorization'] = 'Bearer ' + token + '';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;