import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      const { status, data } = err.response;
      console.error(status, data);
    } else if (err.request) {
      console.error('Network issue or server did not respond');
    } else {
      console.error('Others', err.message);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
