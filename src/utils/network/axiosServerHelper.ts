import axios, { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

const axiosServerHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServerHelper.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (accessToken?.value) config.headers.Authorization = `Bearer ${accessToken.value}`;

  return config;
});

axiosServerHelper.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);
    const { response, config } = error;

    if (response?.status === 401) {
      await axios.post('/api/auth/refresh-token', {});
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;

      if (!accessToken) return Promise.reject(error);
      if (!config) return Promise.reject(error);

      config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosServerHelper(config);
    }
    return Promise.reject(error);
  },
);

export default axiosServerHelper;
