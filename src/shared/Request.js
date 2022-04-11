// LIBRARY
import axios from 'axios';

// FUNCTION
import { getToken } from './token';

const instance = axios.create({
  baseURL: 'https://mockapi.io/projects/6252ffae7f7fa1b1ddec36b4',
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = '*/*';
  config.headers['authorization'] = `Bearer ${getToken()}`;
  return config;
});

export default instance;