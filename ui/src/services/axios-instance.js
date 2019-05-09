import axios from 'axios';

import AuthService from './auth-service';

class AxiosService {
axiosInstance = {};

constructor() {
  this.initInstance();
}

initInstance() {
  this.axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    timeout: 5000
  });

  this.axiosInstance.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();

      if(token) {
        config.headers.Authorization = `${token}`;
      }

      return config;

    }
  );
  return this.axiosInstance;
}

getInstance() {
  return this.axiosInstance || this.initInstance();
}
}


export default new AxiosService();
