import axios from 'axios';

export default function api(token) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APIURL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers = {
        'x-token': token,
      };
      return config;
    },
    (error) => {
      return error;
    }
  );

  return api;
}
