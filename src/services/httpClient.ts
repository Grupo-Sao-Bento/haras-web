import axios from 'axios';

const REQUEST_TIMEOUT = 5000;

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

const getAuthToken = () => `Bearer ${localStorage.getItem('jwt')}`;

const authInterceptor = (config: any) => {
  config.headers['Authorization'] = getAuthToken();
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;
