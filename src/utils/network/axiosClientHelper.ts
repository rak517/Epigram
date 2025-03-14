import axios from 'axios';

const axiosClientHelper = axios.create({
  baseURL: '/api',
});

export default axiosClientHelper;
